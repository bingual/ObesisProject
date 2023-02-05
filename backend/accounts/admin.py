from django.contrib import admin
from django.utils.safestring import mark_safe

from accounts.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):


    class UserAdmin(admin.ModelAdmin):
        list_display = ['id', 'username', 'avatar_tag', ]
        list_display_links = ['username']

        def avatar_tag(self, user):
            return mark_safe(f'<img src={user.avatar.url} style="width: 100px;">')
