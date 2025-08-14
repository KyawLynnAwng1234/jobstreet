from django.shortcuts import render,redirect
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from .forms import employerpreRegisterForm
from django.contrib.auth.hashers import make_password
from .models import EmployerProfile
from django.contrib.auth import get_user_model
from .utils import send_verification_email
User = get_user_model()
from django.contrib import messages
from django.contrib.auth import login,logout,authenticate

# Create your views here.
def employer(request):
    return render(request,'employer.html')

def preregisterEmployer(request):
    if request.method == "POST":
        form=employerpreRegisterForm(request.POST)
        if form.is_valid():
            email=form.cleaned_data['email']
            request.session['user_email']=email
            password=form.cleaned_data['password']
            request.session['user_password']=password
            return redirect('registeremployerpage',role="employer")
    else:
        form=employerpreRegisterForm()

    context={'form':form}
    return render(request,'account/preregister.html',context)

def registerEmployer(request,role):
    if request.method == 'POST':
        first_name=request.POST.get('first_name')
        last_name=request.POST.get('last_name')
        business_name=request.POST.get('business_name')
        city=request.POST.get('city')
        phone_number=request.POST.get('phone_number')
        
        #email and pssword form session 
        email=request.session.get('user_email')
        user_password=request.session.get('user_password')
       
       # Get email and password from session
        email = request.session.get('user_email')
        username=email.split('@')[0]
        raw_password = request.session.get('user_password')
        user, created = User.objects.get_or_create(
            username=username,
            email=email,
            defaults={
                'password': make_password(raw_password),  # hash password
                'is_active': False  # pending activation
            },
            role=role
        )
        EmployerProfile.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            business_name=business_name,
            city=city,
            phone=phone_number
        )
        send_verification_email(request, user)
        request.session['pending_activation'] = True
        
        return redirect('createjobpage')
    
    else:
        email=request.session.get('user_email')
    return render(request,'account/employerregister.html',{'email':email})




def emailverifyEmployer(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError, OverflowError):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        if not user.is_active:
            user.is_active = True
            user.save()
        messages.success(request, "Your email has been verified successfully! You can create job now")
        return redirect('createjobpage')
    else:
        # If verification fails, render an error page or message
        context = {
            'error_message': "Verification link is invalid or expired."
        }
        return render(request, 'account/emailverify.html', context)


def siginEmployer(request,role):
    if request.method == "POST":
        email=request.POST.get('email')
        password=request.POST.get('password')
       # Authenticate user by email and password
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            login(request, user)
            return redirect("createjobpage")
        else:
            # Authentication failed: show error message or reload form
            messages.error(request,"Invalid username or password")
    return render(request,'account/employerlogin.html')

def sigoutEmployer(request):
    logout(request)
    return redirect("siginemployerpage",role="employer")