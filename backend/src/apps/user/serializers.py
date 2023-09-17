from base64 import b64decode

from apps.customer.models import Customer
from apps.customer.serializers import CustomerSerializer
from apps.user.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from utils.crypt import decrypt_message


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    customer = CustomerSerializer()

    class Meta:
        model = User
        fields = ("id", "email", "password", "customer")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        customer_data = validated_data.pop("customer")

        decoded_password = b64decode(validated_data["password"])
        decrypted_password = decrypt_message(decoded_password).decode()

        customer_serializer = CustomerSerializer(data=customer_data)
        if customer_serializer.is_valid(raise_exception=True):
            customer: Customer = customer_serializer.save()

        user = User.objects.create(email=validated_data["email"], customer=customer)
        user.set_password(decrypted_password)
        user.save()

        return user
