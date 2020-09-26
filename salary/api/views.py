from salary import models
from salary.api import serializers
from salary.models import Salary
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET', ])
def SalaryListView(request):
    salary = Salary.objects.all()
    serializer = serializers.SalarySerializer(salary, many=True)
    return Response(serializer.data)


@api_view(['GET', ])
def SalaryDetail(request, pk):
    try:
        snippet = Salary.objects.get(pk=pk)
    except Salary.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.SalarySerializer(snippet)
    return Response(serializer.data)


@api_view(['POST', ])
def SalaryCreate(request):
    serializer = serializers.SalarySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', ])
def SalaryUpdate(request, pk):
    try:
        snippet = Salary.objects.get(pk=pk)
    except Salary.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.SalarySerializer(snippet, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', ])
def SalaryDelete(request, pk):
    try:
        snippet = Salary.objects.get(pk=pk)
    except Salary.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    snippet.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
