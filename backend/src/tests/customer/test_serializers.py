import pytest
from apps.customer.serializers import CustomerSerializer


class TestCustomerSerializer:
    @pytest.mark.parametrize(
        "identifier,expected_validation",
        [
            ("82199845036", True),
            ("12549231015", True),
            ("128972580204", False),
            ("6505245308", False),
        ],
    )
    def test_cpf_validation(
        self, identifier, expected_validation, brazilian_address_data
    ):
        serializer = CustomerSerializer(
            data={
                "name": "Foo Bar",
                "identifier": identifier,
                "identifier_type": "CPF",
                "address": brazilian_address_data,
            }
        )
        assert serializer.is_valid() == expected_validation

    @pytest.mark.parametrize(
        "identifier,expected_validation",
        [
            ("50218310000155", True),
            ("38598644000104", True),
            ("2359123300010", False),
        ],
    )
    def test_cnpj_validation(
        self, identifier, expected_validation, brazilian_address_data
    ):
        serializer = CustomerSerializer(
            data={
                "name": "Foo Bar",
                "identifier": identifier,
                "identifier_type": "CNPJ",
                "address": brazilian_address_data,
            }
        )
        assert serializer.is_valid() == expected_validation
