from email.policy import default
from django.db import models



# Create your models here.

class Dfs_model_custom(models.Model):
    name = models.CharField(max_length=250,null=False)
    roll_no = models.IntegerField(default=0,blank=False,null=False)
    # image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    image = models.CharField(max_length=250)
    city = models.CharField(max_length=250)
    contact = models.IntegerField(default=0)



class Dfs_model_covid(models.Model):
    timestamp = models.CharField(max_length=250)
    patient_id = models.CharField(default="--", max_length=250)
    sample_id = models.IntegerField(default=0000)
    country = models.CharField(max_length=250)
    site_id = models.CharField(default=0, max_length=250)