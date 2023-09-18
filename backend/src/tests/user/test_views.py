import pytest
from apps.user.models import User
from apps.user.serializers import UserSerializer
from rest_framework.test import APIClient


@pytest.fixture
def client() -> APIClient:
    yield APIClient()


@pytest.fixture
def authenticated_client(brazilian_user) -> APIClient:
    authenticated_client = APIClient()
    authenticated_client.force_authenticate(user=brazilian_user)
    yield authenticated_client


@pytest.mark.django_db()
class TestUserCrudView:
    def test_can_get_user(self, authenticated_client, brazilian_user):
        response = authenticated_client.get("/user/", format="json")

        assert response.status_code == 200
        assert response.json() == UserSerializer().to_representation(
            instance=brazilian_user
        )

    def test_can_create_user(
        self,
        client,
        brazilian_user_password,
        brazilian_customer_data,
        brazilian_address_data,
    ):
        response = client.post(
            "/user/",
            {
                "email": "foo@gmail.com",
                "password": brazilian_user_password,
                "customer": brazilian_customer_data
                | {"address": brazilian_address_data},
            },
            format="json",
        )

        assert response.status_code == 201
        assert User.objects.count() == 1

    def test_can_patch_user(self, authenticated_client):
        response = authenticated_client.patch(
            "/user/",
            {
                "email": "foo_bar@email.com",
                "customer": {
                    "name": "Foo Bar Foo Bar",
                    "address": {"state": "GO"},
                },
            },
            format="json",
        )

        assert response.status_code == 200

        user = User.objects.first()

        assert user.email == "foo_bar@email.com"
        assert user.customer.name == "Foo Bar Foo Bar"
        assert user.customer.address.state == "GO"

    def test_can_put_user(self, authenticated_client, brazilian_user_password):
        response = authenticated_client.put(
            "/user/",
            {
                "email": "teste@gmail.com",
                "password": brazilian_user_password,
                "customer": {
                    "name": "Foo Bar Gamma",
                    "identifier": "22459203098",
                    "identifier_type": "CPF",
                    "address": {
                        "country": "BR",
                        "state": "AM",
                        "city": "Amazonas",
                        "street": "Rua YYY",
                        "postal_code": "88080524",
                        "additional_info": "Casa 202",
                    },
                },
            },
            format="json",
        )

        assert response.status_code == 200

    def test_can_delete_user(self, authenticated_client):
        response = authenticated_client.delete("/user/")

        assert User.objects.count() == 0
