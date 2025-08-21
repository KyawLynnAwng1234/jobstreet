from django.urls import path
from .views import (
    register_jobseeker_api,
    email_verify_jobseeker_api,
    sigin_jobseeker_api,
    sigout_jobseeker_api,
    current_user,
    
    )


urlpatterns = [
    path('register-jobseeker/<str:role>/', register_jobseeker_api, name='api-register-jobseeker'),
    path('email-verify-jobseeker/', email_verify_jobseeker_api, name='api-email-verify-jobseeker'),
    path('signin-jobseeker/<str:role>/',sigin_jobseeker_api,name='api-sigin-jobseeker'),
    path("logout-jobseeker/", sigout_jobseeker_api, name="logout-jobseeker"),
    path('current-user/',current_user,name="current-user"),
   
]
