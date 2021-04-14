from decimal import Decimal

def validate_int_helper(value, default_value):
    if value == None or value == "":
        return default_value
    return int(value)


def validate_decimal_helper(value, default_value):
    if value == None or value == "":
        return default_value
    return Decimal(value)


def validate_date_helper(value, default_value):
    if value == None or value == "":
        return default_value
    return value