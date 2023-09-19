from apps.user.serializers import UserSerializer
from django.contrib.auth import login
from django.forms.models import model_to_dict
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from knox.views import LoginView as KnoxLoginView
from rest_framework import permissions, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from utils.crypt import decrypt_message
from utils.merge import merge_dicts


class UserLoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        try:
            decrypted_password = decrypt_message(request.data.get("password", ""))
            serializer = AuthTokenSerializer(
                data=request.data | {"password": decrypted_password}
            )
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = serializer.validated_data["user"]
        login(request, user)

        return super(UserLoginView, self).post(request, format=None)


class UserCrudView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]

        return super().get_permissions()

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def post(self, request, format=None):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()

            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(csrf_protect, name="dispatch")
    def patch(self, request, format=None):
        original_user_data = UserSerializer().to_representation(instance=request.user)
        modified_user_data = merge_dicts(original_user_data, request.data)

        serializer = UserSerializer(request.user, data=modified_user_data, partial=True)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(csrf_protect, name="dispatch")
    def put(self, request, format=None):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(csrf_protect, name="dispatch")
    def delete(self, request, format=None):
        request.user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
