from apps.user.views import UserCrudView, UserLoginView
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="logoutall"),
    path("", UserCrudView.as_view(), name="user-crud"),
]
