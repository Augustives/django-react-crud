from apps.address.models import Address
from apps.address.serializers import AddressSerializer
from apps.customer.constants import IdentifierType
from apps.customer.models import Customer
from rest_framework import serializers
from validate_docbr import CNPJ, CPF


class CustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Customer
        fields = "__all__"

    def _validate_cnpj(self, value: str) -> str:
        if not CNPJ().validate(value):
            raise serializers.ValidationError({"identifier": "Invalid CPF"})
        return value

    def _validate_cpf(self, value: str) -> str:
        if not CPF().validate(value):
            raise serializers.ValidationError({"identifier": "Invalid CNPJ"})
        return value

    def _validate_identifier(self, identifier: str, identifier_type: str):
        match identifier_type:
            case IdentifierType.CPF:
                return self._validate_cpf(identifier)
            case IdentifierType.CNPJ:
                return self._validate_cnpj(identifier)

        raise serializers.ValidationError(
            {"identifier_type": "Invalid 'identifier_type'"}
        )

    def validate(self, attrs):
        self._validate_identifier(attrs.get("identifier"), attrs.get("identifier_type"))

        return attrs

    def create(self, validated_data):
        address_data = validated_data.pop("address")

        address_serializer = AddressSerializer(data=address_data)
        if address_serializer.is_valid(raise_exception=True):
            address = address_serializer.save()

        return Customer.objects.create(address=address, **validated_data)

    def update(self, instance, validated_data):
        address_data = validated_data.pop("address", None)

        instance.name = validated_data.get("name", instance.name)
        instance.identifier = validated_data.get("identifier", instance.identifier)
        instance.identifier_type = validated_data.get(
            "identifier_type", instance.identifier_type
        )

        instance.save()

        if address_data:
            address_serializer = AddressSerializer(instance.address, data=address_data)
            if address_serializer.is_valid(raise_exception=True):
                address_serializer.save()

        return instance
