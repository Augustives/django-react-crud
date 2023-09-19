def merge_dicts(d1, d2):
    """Recursively merge dictionaries."""
    for key, value in d2.items():
        if key in d1 and isinstance(d1[key], dict) and isinstance(value, dict):
            d1[key] = merge_dicts(d1[key], value)
        else:
            d1[key] = value
    return d1
