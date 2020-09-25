from django.contrib import admin
from salary.models import Salary
# Register your models here.

class SalaryAdmin(admin.ModelAdmin):
    readonly_fields = ['total']
    """ list_display """
    # add fields you want to see in admin under above list
    # list_display = ['name', 'slug']
    # list_display = ['__all__']
    list_display = [field.name for field in Salary._meta.get_fields()]
    
    """ editble fields """
    list_editable = ['basic', 'da', 'hra', 'ea', 'pa']
    
    """ prepopulated_fields """
    # helps to auto update / overwrite as soon as its parent fields is updated
    # prepopulated_fields = { 'total' : ('hra', )}
    """ list_per_page """
    # gives you pagination
    list_per_page = 20
admin.site.register( Salary, SalaryAdmin )
# admin.site.register(Salary)