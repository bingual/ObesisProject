from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


# 회원가입 시리얼라이저
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    # 함수 실행시 가장먼저 호출되는 함수
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # password의 필수조건 설정
        self.fields["password"].allow_blank = False
        self.fields["password"].required = True

    # 생성요청시 실행되는 함수
    def create(self, validated_data):
        # user 데이터를 DB에 반영
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['username', 'password']
