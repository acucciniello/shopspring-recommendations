from django.http import HttpResponse, JsonResponse
from polls.models import Recommendation
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json
from django.db import connection
from django.conf import settings
from django.views.generic import View
import logging
import os


class FrontendAppView(View):
  """
  Serves the complied frontend entry point
  """
  def get(self, request):
    try:
      with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
        return HttpResponse(f.read())
    except IOError:
      print('hi')
      logging.exception('Production build of app not found')
      return HttpResponse(
        status = 501,
        )

# Route to to pull the three highest rated recommendations from the database and send to client
@csrf_exempt
def index(request):
  # get the top three recommendations based on rating
  getRecommendations = Recommendation.objects.order_by('-rating')[0:3]
  print(getRecommendations)
  if len(getRecommendations) == 0:
    return HttpResponse('There are no recommendations')
  elif len(getRecommendations) < 3:
    return HttpResponse('There are not enough recommendations')
  else:
    recommendations_serialized = serializers.serialize('json', getRecommendations)
    # send it over to react to render components
    return HttpResponse(recommendations_serialized)

# Receives the new ratings from the client and updates the database with it
@csrf_exempt
def rating(request):
  response = json.loads(request.body)
  recommendations = response['recommendations']
  for recommendation in recommendations:
    currRating = recommendation['rating']
    currId = recommendation['id']
    responseMsg = update_rating(currRating, currId)
  return HttpResponse(responseMsg)
  
# Calls UPDATE SQL query given a rating and id
def update_rating(currRating, currId):
  # validate inputs
  badInputs = 'Inputs did not match the type'
  executed = 'ratings were changed'
  if type(currRating) != int or type(currId) != int:
    return badInputs
  with connection.cursor() as cursor:
    cursor.execute('UPDATE polls_recommendation SET rating = %s WHERE id = %s;', [currRating, currId])
  return executed
