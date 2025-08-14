from django.forms import ModelForm
from .models import *
class CreateJob(ModelForm):
    class Meta:
        model=Job
        exclude = ('employer','is_active')