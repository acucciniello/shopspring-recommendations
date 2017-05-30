# shopspring-recommendations   [![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard     )

A Startup Page for shopspring.com to give users recommendations based on data science

## Requirements

1. Node v5.6.0
2. NPM 3.10.6
3. Django 1.11.1
4. Python 2.7.13

## Getting Started
1. Git clone the repository
	```
	$ git clone https://github.com/acucciniello/shopspring-recommendations.git
	```
2. Enter the Repository
	```
	$ cd shopspring-recommendations
	```
3. Start up a Virtual Environment
	```
	$ virtualenv env
	$ source env/bin/activate
	```
4. Install Project Dependencies
	```
	$ pip install -r requirements.txt
	```
5. Create a File named secrets.sh
	```
	$ touch secrets.sh
	```
6. Get a Secret Key from [here](http://www.miniwebtool.com/django-secret-key-generator/).
7. Add the Key to secrets.sh
	```
	export SECRET_KEY='SECRET_KEY'
	```
8. Create a postgres database in psql
	```
	$ CREATE database shopspring-recommendations;
	```
9.  Add the Credentials to settings.py file
	```	
	DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db_name',
        'USER': 'name',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
	}```
10. Enter the	 `webapp` directory and migrate the database changes
	```
	$ cd polls
	$ python manage,py migrate
	```
11. Create an Admin Account:
	```
	$ python manage.py createsuperuser
	```
12. Make migrations for the app
	```
	$ python manage.py makemigrations polls
	```
13. Final Migrations
	```
	$ python manage.py migrate
	```
14. Run the Django App
	```
	$ python manage.py runserver
	```
15.  Go to localhost:8000 in web browser

## Inspiration

This is meant to be a sample of what the full product could potentially look like and run.  From the [engineeering](https://www.shopspring.com/engineering) page, I saw that Spring is trying to use data science to give people amazing personal recommendations.  I thought of this simple page as a way to greet the user upon signing in, it could display three items the user might want to check out.  In the real product, these recommendations would be based on the data science given.  Here I simply hard coded a rating for the indivudal pieces of clothing I picked.  If an item is selected, its rating will increase and for those that are not selected  it will increase.

## Usage

Upon loading the site, it will give you three recommendations based on data science.  From there you may click on any of the images that are displayed.  That will take you to the page to check out more details about the item. 

## License

MIT 

