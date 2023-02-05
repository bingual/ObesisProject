import re

from django.contrib.auth import get_user_model
from rest_framework import serializers

from notice.models import Post, Comment

User = get_user_model()


# 유저정보
class AuthorSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    # 스킴, 호스트 자동화
    def avatar_url_field(self, author):
        if re.match(r"https?://", author.avatar_url):
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme  # "http" or "https"
            host = self.context["request"].get_host()  # 호스트를 가져옴
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = User
        fields = ['username', 'avatar_url']


# 게시글
class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'photo', 'title', 'contents', 'created_at', 'updated_at']


# 댓글
class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'messages', 'created_at']
