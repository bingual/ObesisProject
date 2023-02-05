from django.contrib.auth import get_user_model
from django.shortcuts import render

# 회원가입
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.serializer import SignupSerializer

User = get_user_model()


# 회원가입
class SignupView(CreateAPIView):
    model = User
    serializer_class = SignupSerializer


# 토큰 커스텀
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    # 유효성 검사
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        # response에 추가하고 싶은 key값들 추가
        data['username'] = self.user.username
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['success'] = True

        return data


# 토큰 View
class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer
