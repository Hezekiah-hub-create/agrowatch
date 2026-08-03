from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import UserViewSet, LoginView, RegisterView
from farms.views import FarmViewSet
from market.views import MarketListingViewSet
from scans.views import ScanViewSet, DetectionViewSet
from expert.views import DiseaseConditionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'farms', FarmViewSet)
router.register(r'market/listings', MarketListingViewSet, basename='marketlisting')
router.register(r'scans', ScanViewSet)
router.register(r'detections', DetectionViewSet)
router.register(r'expert/conditions', DiseaseConditionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', LoginView.as_view(), name='api_login'),
    path('api/auth/register/', RegisterView.as_view(), name='api_register'),
    path('api/', include(router.urls)),
]
