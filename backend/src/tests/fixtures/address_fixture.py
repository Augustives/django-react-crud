import pytest
from apps.address.models import Address


@pytest.fixture()
def brazilian_address_data() -> dict:
    yield {
        "country": "BR",
        "state": "SC",
        "city": "Florianópolis",
        "street": "Rua XYZ",
        "postal_code": "885412369",
        "additional_info": "APartamento 101",
    }


@pytest.fixture()
def brazilian_address(brazilian_address_data) -> Address:
    yield Address.objects.create(**brazilian_address_data)
