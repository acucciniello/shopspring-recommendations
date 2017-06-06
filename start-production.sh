#!/bin/bash
# script to start running production server forever

cd webapp
sudo service nginx stop
sudo service nginx start
gunicorn webapp.wsgi:application
