from django.forms import ModelForm
from Accounts.models import User
from django.forms import forms
from django import forms
from django.contrib.auth.password_validation import validate_password

class employerpreRegisterForm(forms.Form):
    email = forms.EmailField(
        label="Email Address",
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={'placeholder': 'Enter your email'})
    )
    
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Create a password'}),
        label="Create a password",
        min_length=6,
        required=True
    )
    
    def clean_password(self):
        password = self.cleaned_data.get('password')

        # Run all validators in AUTH_PASSWORD_VALIDATORS
        validate_password(password)

        return password
