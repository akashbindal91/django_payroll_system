# Generated by Django 2.2 on 2020-09-26 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salary', '0016_auto_20200925_2035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salary',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=15),
        ),
    ]