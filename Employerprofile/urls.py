from django.urls import path
from .import views

urlpatterns = [
    #accounts
    path('employer/',views.employer,name="employerpage"),
    path('preregister/',views.preregisterEmployer,name="preregisteremployerpage"),
    path('employer/register/<str:role>/',views.registerEmployer,name="registeremployerpage"),
    path('employer/emailverify/<uidb64>/<token>/',views.emailverifyEmployer,name="emailverifyemployerpage"),
    path('employer/sigin/<str:role>/',views.siginEmployer,name="siginemployerpage"),
    path('employer/sigout/',views.sigoutEmployer,name="sigoutemployerpage"),
    
    #jobs
    ]
