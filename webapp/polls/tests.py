from __future__ import unicode_literals
from django.test import TestCase
from .models import Recommendation
# Create your tests here.

class TestCaseRecommendation(TestCase):
  def setUp(self):
    self.recommendation = Recommendation.objects.create(title='Some Clothing', url='http://google.com', rating=0, pictureurl='http://picture.com')

class TestRecommendationMethods(TestCaseRecommendation):
  def test_init(self):
    self.assertEqual(self.recommendation.title, 'Some Clothing')
    self.assertEqual(self.recommendation.url, 'http://google.com')
    self.assertEqual(self.recommendation.rating, 0)
    self.assertEqual(self.recommendation.pictureurl, 'http://picture.com')

  def test_str(self):
    strOutput = str(self.recommendation)
    self.assertEqual(strOutput, 'Some Clothing http://google.com http://picture.com 2 0 ')
