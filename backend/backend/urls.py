from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django_pydenticon.views import image as pydenticon_image

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path("admin/", admin.site.urls),
    path("accounts/", include('accounts.urls')),
    path("", include('notice.urls')),
    path('identicon/image/<path:data>.png', pydenticon_image, name='pydenticon_image'),

]
if settings.DEBUG:
    # pillow 설정
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # debug_toolbar 설정
    urlpatterns += [
        path('__debug__/', include('debug_toolbar.urls')),
    ]
