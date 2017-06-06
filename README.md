# shopspring-recommendations   [![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard     )

A Startup Page for shopspring.com to give users recommendations based on data science

Hosted on EC2 Instance [here](http://ec2-54-172-174-220.compute-1.amazonaws.com/)

## Requirements

1. Node v5.6.0
2. NPM 3.10.6
3. Django 1.11.1
4. Python 2.7.13

## Getting Started
1. Git clone the repository:

	```
	$ git clone https://github.com/acucciniello/shopspring-recommendations.git
	```
	
2. Enter the Repository:

	```
	$ cd shopspring-recommendations
	```
	
3. Build the Frontend components:

   ```
   $ cd client
   $ npm install
   $ npm run build
   ```
   
4. Start up a Virtual Environment:

	```
  	$ cd ..
	$ virtualenv env
	$ source env/bin/activate
	```
	
5. Install Project Dependencies:

	```
	$ pip install -r requirements.txt
	```
	
6. Create a File named secrets.sh:

	```
	$ touch secrets.sh
	```
	
7. Get a Secret Key from [here](http://www.miniwebtool.com/django-secret-key-generator/).

8. Add the Key to secrets.sh:

	```
	export SECRET_KEY='SECRET_KEY'
	```
	
9. Create a postgres database in psql:

	```
	$ CREATE database shopspring-recommendations;
	```
	
10.  Add the Credentials to settings.py file:

	 ```
	 DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.postgresql_psycopg2',
         'NAME': 'DB_NAME',
         'USER': 'DB_USER',
         'PASSWORD': 'DB_PASS',
         'HOST': 'localhost',
         'PORT': '',
    	 }
	 }
	 ```
   
11. Add DB_NAME, DB_USER, DB_PASS to secrets.sh:

   	 ```
    export DB_NAME='DB_NAME'
    export DB_USER='DB_USER'
    export DB_PASS='DB_PASS'
    ```
  
12. Run the bash script to set Environment Variables:

    ```
    $ . secrets.sh
    ```
  
13. Enter the	 `webapp` directory and migrate the database changes:

	```
	$ cd polls
	$ python manage,py migrate
	```
	
14. Create an Admin Account:

	```
	$ python manage.py createsuperuser
	```
	
15. Make migrations for the app:

	```
	$ python manage.py makemigrations polls
	```
	
16. Final Migrations:

	```
	$ python manage.py migrate
	```
	
17. Make sure you have postgreSQL running in another tab (Mac):

	```
	$ postgres -D /usr/local/var/postgres
	```
	
18. Run the Django App:

	```
	$ python manage.py runserver
	```
	

## Inspiration

This is meant to be a sample of what the full product could potentially look like and run.  From the [engineeering](https://www.shopspring.com/engineering) page, I saw that Spring is trying to use data science to give people amazing personal recommendations.  I thought of this simple page as a way to greet the user upon signing in, it could display three items the user might want to check out.  In the real product, these recommendations would be based on the data science given.  Here I simply hard coded a rating for the indivudal pieces of clothing I picked.  If an item is selected, its rating will increase and for those that are not selected  it will increase.

## Usage

Upon loading the site, it will give you three recommendations based on data science.  From there you may click on any of the images that are displayed.  That will take you to the page to check out more details about the item. 

## License

MIT 

## Resources

[Spring](https://www.shopspring.com/)

