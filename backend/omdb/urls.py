from rest_framework.routers import DefaultRouter
from django.urls import path
from omdb import views

router = DefaultRouter()
router.register('visitors', views.VisitorViewSet, basename='visitors')

urlpatterns = router.urls