from django.db import IntegrityError
from django.shortcuts import render,redirect
from .forms import jobseekerRegisterForm,jobseekerSiginForm
from django.contrib import messages 
from .utils import send_verification_code
from django.utils.crypto import get_random_string
from Accounts.models import User
from django.contrib.auth import login,logout
from django.contrib.auth.decorators import login_required
# Create your views here.

def jobseeker(request):
    if request.user.is_authenticated and request.user.is_staff:
        logout(request)
        return redirect('/admin/login/')
    return render(request,'jobseeker.html')

def registerJobseeker(request,role):
    if request.method == "POST":
        form=jobseekerRegisterForm(request.POST)
        if form.is_valid():
            email=form.cleaned_data['email']
            code=send_verification_code(email)
            request.session['verification_code']=code
            request.session['email']=email
            username = email.split('@')[0]
            random_password=get_random_string(length=6)
            
            if not username:
                messages.error(request, "Please enter your email")
                return render(request, 'account/register.html', {'form': form})
            
            try:
                user=User.objects.create_user(
                username=username,
                password=random_password,
                email=email,
                role=role,
                is_active=False
                )
                request.session['user_id']=user.id
                return redirect('emailverifypage')
            except IntegrityError as e:
                if "Duplicate entry" in str(e):
                    messages.error(request, "Email or username already exists.")
                else:
                    messages.error(request, "An unexpected error occurred.")
                    
    else:
        form=jobseekerRegisterForm()
    return render(request,'account/register.html',{'form':form})


def siginJobseeker(request, role):
    if request.method == "POST":
        form = jobseekerSiginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            if not email:
                messages.error(request, "Please enter your email.")
                return render(request, 'account/login.html', {'form': form})
            username = email.split('@')[0]
            # ✅ Check if user already exists
            try:
                user = User.objects.get(email=email)
                if not user.is_active:
                    messages.error(request, "Your account is not active. Please register first.")
                    return render(request, 'account/login.html', {'form': form})

                # ✅ Generate verification code and send
                code = send_verification_code(email)
                request.session['verification_code'] = code
                request.session['email'] = email
                request.session['user_id'] = user.id

                messages.info(request, f"Verification code sent to your email: {email}")
                return redirect('emailverifypage')

            except User.DoesNotExist:
                messages.error(request, "This email is not registered. Please register first.")
                return render(request, 'account/login.html', {'form': form})
    else:
        form = jobseekerSiginForm()

    return render(request, 'account/login.html', {'form': form})


def sigoutJobseeker(request):
    logout(request)
    list(messages.get_messages(request)) 
    return redirect('jobseekersiginpage',role='job_seeker')


def emailverifyJobseeker(request):
    if request.method == 'POST':
        input_code=request.POST.get('code')
        session_code=request.session.get('verification_code')
        user_id=request.session.get('user_id')
        if input_code == session_code and user_id:
            try:
                user = User.objects.get(id=user_id)
                user.is_active = True
                user.save()
                user.backend = 'django.contrib.auth.backends.ModelBackend'
                login(request, user)
                messages.success(request, "Email verified successfully!")
                return redirect('jobseekerpage')
            except User.DoesNotExist:
                messages.error(request, "User not found.")
        else:
            messages.error(request, "Invalid verification code.")
    return render(request,'account/emailverify.html')



