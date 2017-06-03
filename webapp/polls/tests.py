from __future__ import unicode_literals
from django.test import TestCase
from .models import Recommendation
from django.urls import reverse
from views import update_rating, FrontendAppView
from django.conf import settings
import os
import json
from django.core import serializers
# Create your tests here.


class TestCaseRecommendation(TestCase):
  def setUp(self):
    self.recommendation = Recommendation.objects.create(title='Some Clothing', url='http://google.com', rating=0, pictureurl='http://picture.com')

  def tearDown(self):
    Recommendation.objects.all().delete()

class TestRecommendationMethods(TestCaseRecommendation):
  def test_init(self):
    self.assertEqual(self.recommendation.title, 'Some Clothing')
    self.assertEqual(self.recommendation.url, 'http://google.com')
    self.assertEqual(self.recommendation.rating, 0)
    self.assertEqual(self.recommendation.pictureurl, 'http://picture.com')

  def test_str(self):
    strOutput = str(self.recommendation)
    self.assertEqual(strOutput, self.recommendation.title + ' ' + self.recommendation.url + ' ' + self.recommendation.pictureurl + ' ' + str(self.recommendation.id) + ' ' + str(self.recommendation.rating) + ' ')

class RecommendationViewTests(TestCase):
  def create_recommendation(self, title, url, rating, pictureurl):
    return Recommendation.objects.create(title=title, url=url, rating=rating, pictureurl=pictureurl)

  # Returns a message if there is no recommendations in the DB
  def test_index_view_nothing_in_db(self):
    response = self.client.get(reverse('index'))
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, 'There are no recommendations')

  # Returns a message if there are not at least 3 recommendations in DB
  def test_index_view_less_than_three(self):
    for i in range(0, 1):
      self.create_recommendation('test clothing', 'http://google.com', 0, 'http://picture.com')
    response = self.client.get(reverse('index'))
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, 'There are not enough recommendations' )

  # Returns top three by recommendation when more than 3 in DB
  def test_index_view_less_than_three(self):
    for i in range(0, 10):
      self.create_recommendation('test clothing', 'http://google.com', i, 'http://picture.com')
    response = self.client.get(reverse('index'))
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, '[{"model": "polls.recommendation",' )

  # Test for when currRating and currId are not numbers, they should not update the DB
  def test_update_rating_bad_inputs(self):
    responseMsg = update_rating('yeah', 7)
    self.assertEqual(responseMsg, 'Inputs did not match the type')
    responseMsg = update_rating(10, 'test')
    self.assertEqual(responseMsg, 'Inputs did not match the type')
    responseMsg = update_rating('test1', 'test2')
    self.assertEqual(responseMsg, 'Inputs did not match the type')

  # Updates the DB with the new rating
  def test_update_rating_good_inputs(self):
    responseMsg = update_rating(10, 1)
    self.assertEqual(responseMsg, 'ratings were changed')

  # Should return a 200 with the file
  def test_get_view_with_file(self):
    response = self.client.get(reverse('getReact'))
    self.assertEqual(response.status_code, 200)

  '''
  # Tests proper response when ratings were sent
  def test_rating_view_with_data(self):
    data = {"recommendations":[{"url":"https://www.shopspring.com/products/53297090",
      "pictureUrl":"https://s3.amazonaws.com/shopspring-recommendations/kennethcoleny.jpg",
      "rating":10,"title":"Kenneth Cole New York","id":4},{"url":"https://www.shopspring.com/products/53522908",
      "pictureUrl":"https://s3.amazonaws.com/shopspring-recommendations/mango.jpg","rating":1,"title":"Mango","id":5},
      {"url":"https://www.shopspring.com/products/52974556","pictureUrl":"https://s3.amazonaws.com/shopspring-recommendations/dolceandgabbana.jpg",
      "rating":1,"title":"Dolce & Gabbana","id":6}]}
    response = self.client.get(reverse('rating'), data, 'application/json')
    print(response)
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, 'ratings were changed')
  '''
  
  '''
  # Tests an empty JSON object being sent in the /ratings route
  def test_rating_view_no_data(self):
    response = self.client.post(reverse('rating'), {}, content_type='json')
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, 'There was an error decoding JSON' )
  '''

