from django.urls import path
from .import views

urlpatterns = [
  
    path('createjob/',views.createjob,name="createjobpage"),
]
