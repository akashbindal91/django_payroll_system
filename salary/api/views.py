from salary import models
from salary.api import serializers
from salary.models import Salary
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', ])
def SalaryListView(request):
    salary = Salary.objects.all()
    serializer = serializers.SalarySerializer(salary, many=True)
    return Response(serializer.data)
