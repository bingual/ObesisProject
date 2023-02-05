from django.urls import path
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh, token_verify

from accounts import views

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'),

    path('token/', views.MyTokenObtainPairView.as_view()),
    path('token/refresh', token_refresh),
    path('token/verify', token_verify),
]
