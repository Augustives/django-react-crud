from django.db import models

from utils.validators import validate_safe_characters


class ApiCharField(models.CharField):
    DEFAULTS = {"max_length": 256, "validators": [validate_safe_characters]}
    description = "A CharField with the necessary string validations"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **{**self.DEFAULTS, **kwargs})
