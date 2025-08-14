from django.shortcuts import render,redirect
from .forms import CreateJob
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from Employerprofile.models import EmployerProfile

# Create your views here.
def index(request):
    return render(request,'index.html')

@login_required
def createjob(request):
    pending_activation = request.session.get('pending_activation', False)
    employer = EmployerProfile.objects.get(user=request.user)
    form=CreateJob()
    if request.method == "POST":
       
        form=CreateJob(request.POST)
        if form.is_valid():
            if not request.user.is_active:
                
                messages.error(request, "Please verify your email before creating a job.")
                
                return redirect('createjobpage')
            else:
                

                job=form.save(commit=False)
                job.employer=employer
                job.save()
                return redirect("employerpage")
        else:
            pass
                
    
    context = {
        'pending_activation': pending_activation,
        'form':form
        }
    return render(request,'job/createjob.html',context)