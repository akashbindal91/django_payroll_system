from django.shortcuts import render
from django.views.generic.list import ListView
from salary.models import Salary
from django.utils import timezone
# Create your views here.


class SalaryListView(ListView):
    model = Salary
    paginate_by = 100  # if pagination is desired

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context


def create(request):
    """
    docstring
    """
    pass


def update(request):
    """
    docstring
    """
    pass


def delete(request):
    """
    docstring
    """
    pass
