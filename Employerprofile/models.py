from django.db import models
from Accounts.models import User

# Create your models here.
    # Example using a list of tuples
STATUS_CHOICES = [
        ('S', 'Sittway'),
        ('MO', 'MraukOo'),
        ('MB', 'MinBra'),
        
    ]
class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='account_employer_profile')
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    business_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=2, choices=STATUS_CHOICES, default='S')
    
    def __str__(self):
        return self.first_name
    
