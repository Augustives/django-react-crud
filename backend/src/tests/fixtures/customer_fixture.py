import pytest
from apps.customer.models import Customer


@pytest.fixture()
def brazilian_customer_data(brazilian_address) -> dict:
    yield {
        "name": "Foo Bar",
        "identifier": "35764001000197",
        "identifier_type": "CNPJ",
        "address": brazilian_address,
    }


@pytest.fixture()
def brazilian_customer(brazilian_customer_data) -> Customer:
    yield Customer.objects.create(**brazilian_customer_data)
