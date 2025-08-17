
from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
   
    path('jobseeker-accounts/', include('Jobseekerprofile.urls')),
    path('employer-accounts/',include('Employerprofile.urls')),
    path('social-auth/', include('allauth.urls')), 
    
    #api
    path('api/',include('Api.urls')),
    path('',include('UI.urls')),
    
   
]