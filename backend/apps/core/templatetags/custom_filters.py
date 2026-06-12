from django import template

register = template.Library()

@register.filter
def get_item(dictionary, key):
    """Get an item from a dictionary using a key"""
    try:
        # If it's a dictionary, get the value for the key
        return dictionary.get(key, [])
    except AttributeError:
        # If it's not a dictionary, return empty list
        return []