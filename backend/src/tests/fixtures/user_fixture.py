import pytest
from apps.user.models import User
from utils.crypt import encrypt_message


@pytest.fixture
def brazilian_user_password():
    # Replicate front-end encryption pattern
    yield encrypt_message("123456789asd@")


@pytest.fixture
def brazilian_user_data(brazilian_customer, brazilian_user_password) -> dict:
    yield {
        "email": "foo@email.com",
        "password": brazilian_user_password,
        "customer": brazilian_customer,
    }


@pytest.fixture
def brazilian_user(brazilian_user_data) -> User:
    yield User.objects.create(**brazilian_user_data)
