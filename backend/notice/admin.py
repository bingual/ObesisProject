from django.contrib import admin

from notice.models import Post, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'title', 'contents', 'created_at', 'updated_at']
    list_display_links = ['title']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'post', 'messages', 'created_at', 'updated_at']
    list_display_links = ['messages']
