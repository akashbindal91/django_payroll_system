from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.


def validate_fields(value):
    """
    docstring
    """
    if value < 1:
        raise ValidationError(
            ('Amount must be greator then 0.'), params={'value': value},)


class Salary(models.Model):
    """
    docstring
    """
    class Meta:
        db_table = "salary_structure"
        verbose_name = 'Salary_structure'
        verbose_name_plural = 'Salary_structures'

    # id = models.BigIntegerField(default=1, unique=False)
    code = models.CharField(unique=True, max_length=50,
                            null=False, blank=False,primary_key=True)
    basic = models.DecimalField(
        max_digits=15, decimal_places=2, null=False, blank=False, validators=[validate_fields])
    da = models.DecimalField(
        max_digits=15, decimal_places=2, null=False, blank=False, validators=[validate_fields])
    hra = models.DecimalField(
        max_digits=15, decimal_places=2, null=False, blank=False, validators=[validate_fields])
    ea = models.DecimalField(
        max_digits=15, decimal_places=2, null=False, blank=False, validators=[validate_fields])
    pa = models.DecimalField(
        max_digits=15, decimal_places=2, null=False, blank=False, validators=[validate_fields])
    total = models.DecimalField(
        max_digits=15, decimal_places=2)

    def __str__(self):
        return self.code

    def save(self, *args, **kwargs):
        self.total = (self.basic + self.da + self.hra + self.ea + self.pa)
        super(Salary, self).save(*args, **kwargs)
