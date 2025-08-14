from django.forms import ModelForm
from Accounts.models import User

class jobseekerRegisterForm(ModelForm):
    class Meta:
        model=User
        fields=['email']
        
class jobseekerSiginForm(ModelForm):
    class Meta:
        model=User
        fields=['email']