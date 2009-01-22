from django import template

register = template.Library()

def show_media(media):
    return media.get_template().render(template.Context({'media':media}))
    
register.simple_tag(show_media)