from django.contrib.auth.models import AbstractUser
from django.db import models
from django.shortcuts import resolve_url


class User(AbstractUser):
    avatar = models.ImageField(upload_to="accounts/avatar/%Y/%m/%d")

    class Meta:
        ordering = ['-id']

    # 지정된 이미지 혹은 임의의 이미지를 가져오는 함수
    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url('pydenticon_image', self.username)
