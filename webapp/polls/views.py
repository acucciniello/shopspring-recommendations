from django.http import HttpResponse, JsonResponse
from polls.models import Recommendation
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json
from django.db import connection


# Route to to pull the three highest rated recommendations from the database and send to client
@csrf_exempt
def index(request):
  # get the top three recommendations based on rating
  getRecommendations = Recommendation.objects.order_by('-rating')[0:3]
  print(getRecommendations)
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
    update_rating(currRating, currId)
  return HttpResponse('ratings were changed')


# Calls UPDATE SQL query given a rating and id
def update_rating(currRating, currId):
    with connection.cursor() as cursor:
        cursor.execute('UPDATE polls_recommendation SET rating = %s WHERE id = %s;', [currRating, currId])
    return 