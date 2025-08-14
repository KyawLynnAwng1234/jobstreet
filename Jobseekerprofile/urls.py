from django.urls import path
from .import views

urlpatterns = [
    path('jobseeker',views.jobseeker,name="jobseekerpage"),
    path('jobseeker/register/<str:role>/',views.registerJobseeker,name="jobseekerRegisterpage"),
    path('jobseeker/sigin/<str:role>/',views.siginJobseeker,name="jobseekersiginpage"),
    path('jobseeker/sigout',views.sigoutJobseeker,name="jobseekersigoutpage"),
    path('emailverify/',views.emailverifyJobseeker,name="emailverifypage"),
]