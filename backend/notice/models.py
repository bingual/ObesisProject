from django.conf import settings
from django.db import models


# 생성, 업데이트 필드를 재사용하기위한 함수
class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# 게시글
class Post(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                               related_name='my_post_set')
    photo = models.ImageField(blank=True, upload_to='instagram/photo/%Y/%m/%d')
    title = models.CharField(max_length=30)
    contents = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']


# 댓글
class Comment(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    messages = models.TextField()

    class Meta:
        ordering = ['-id']
