from django.http import HttpResponse
from polls.models import Recommendation

def index(request):
  # get the top three recommendations based on rating
  getRecommendations = Recommendation.objects.order_by('-rating')[0:3]
  print(getRecommendations)

  return HttpResponse(getRecommendations)


""" 
The Final form of index, will basically take query the database for 3 items with the highest rating.
Once it gets that it will pass the information about the clothing to react where the components will get rendered
"""

"""
Once a user selects a type of clothing, the page should redirect to the shopspring buy it page.
it should then send a XHR Post request to a route here, where we subtract one from the rating (as long as its >0)
from the ones that were not selected.  And then add one to the rating that is was selected.
In the case where none were selected, we subtract one from them all
"""
