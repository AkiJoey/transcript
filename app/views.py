from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from crawler.login import Login
import json

# Create your views here.

def index(request):
	return render(request, 'index.html')

@csrf_exempt
def search(request):
	if request.method == 'POST':
		username = json.loads(request.body).get('username')
		password = json.loads(request.body).get('password')
		year = json.loads(request.body).get('year')
		term = json.loads(request.body).get('term')
		crawler = Login(username, password, year, int(term))
		response = crawler.getGrade()
		data = []
		for item in response['items']:
			data.append(
				{
					'name': item['kcmc'],
					'type': item['kcxzmc'],
					'credit': item['xf'],
					'grade': item['cj'],
					'gpa': item['jd']
				}
			)
		return HttpResponse(json.dumps(data), content_type='application/json')