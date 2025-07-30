from django.contrib import admin
from django.urls import path, include
from admission.views import home
from django.contrib.auth import views as auth_views
from admission import views
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = 'admission' 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='admission/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register_view, name='register'),
    path('admission/', include('admission.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include('admission.urls')),
]
