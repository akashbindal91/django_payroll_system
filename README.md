
# django_payroll_system

# python version
python 3.6

# backend
1. django 2.2
2. djangorestframework 3.11.1

# backend steps to follow
1. pip install -r requirements.txt
2. python manage.py makemigrations
3. python manage.py migrate
4. python manage.py createsuperuser
5. python manage.py runserver

# database
sqlite3

# frontend
angular 9

# frontend steps to follow
1. npm install
2. cd frontend/src/
3. ng serve

# for loading angular view from django use below steps
1. ng build --prod --output-path ~/projects/python3/django2.2/payroll_youtility/payroll/accounts/static/ --output-hashing none
2. copy index.html and replace it with accounts/templates/index.html
3. load js files and update them with {% static 'runtime-es2015.js' %} instead of 'runtime-es2015.js'
4. run django server