from django.urls import re_path
from . import views

urlpatterns = [
    # Catch-all pattern: anything (/, /register, /about, etc.)
    re_path(r'^(?:.*)/?$', views.frontend),
]
