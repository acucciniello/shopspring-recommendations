from django.db import models
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class Recommendation(models.Model):
  # the title of the piece of clothing or accessory
  title = models.CharField(max_length=200)
  # url to the shopspring store
  url = models.URLField()
  # rating from 1-10 of how much someone likes this recommendation
  # this is just a placeholder
  # real application use data science to get rating
  rating = models.IntegerField(default=0)
  # URL to S3 bucket with the image
  pictureurl = models.URLField()

  def __str__(self):
    return self.title