# Generated by Django 2.2 on 2020-09-25 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salary', '0008_remove_salary_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='salary',
            name='id',
            field=models.BigIntegerField(default=1),
        ),
    ]
