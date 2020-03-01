from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/backups/', include('dbbackup_ui.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('financeiro/', include('financeiro.urls')),
]
