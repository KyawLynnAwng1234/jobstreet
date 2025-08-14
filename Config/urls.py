
from django.contrib import admin
from django.urls import path,include
from Jobs import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name="indexpage" ),
    path('jobseeker-accounts/', include('Jobseekerprofile.urls')),
    path('employer-accounts/',include('Employerprofile.urls')),
    path('social-auth/', include('allauth.urls')), 
    
    #api
    path('api/',include('Api.urls')),
   
]