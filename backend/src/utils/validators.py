import re

from django.core.exceptions import ValidationError


def validate_safe_characters(value):
    pattern = re.compile(r"^[a-zA-Z0-9_\-\s]+$")
    if not pattern.match(value):
        raise ValidationError(
            f"{value}s contains potentially risky characters",
        )
