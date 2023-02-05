from django.shortcuts import render
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.viewsets import ModelViewSet

from notice.models import Post, Comment
from notice.serializer import PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# 게시글
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # 인증되지않은 사용자는 읽기 권한만 주는 퍼미션

    # 필터 설정
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'contents']
    ordering_fields = ['id']
    ordering = ['-id']

    # serializer에서 사용할 context 생성
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    # serializer의 값을 추가시키기 위해 사용
    def perform_create(self, serializer):
        author = self.request.user
        serializer.save(author=author)
        return super().perform_create(serializer)


# 댓글
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # 인증되지않은 사용자는 읽기 권한만 주는 퍼미션

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs['post_pk'])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)
