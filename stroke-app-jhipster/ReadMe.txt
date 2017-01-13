JHIPSTER OPTIONS
================

This project was created using generator-hipster 3.11.0.

Selected options were as follows:

? (1/13) Which *type* of application would you like to create? Monolithic application (recommended for simple projects)
? (2/13) What is the base name of your application? StrokeApp
? (3/13) What is your default Java package name? org.nibhi.strokeapp
? (4/13) Which *type* of authentication would you like to use? JWT authentication (stateless, with a token)
? (5/13) Which *type* of database would you like to use? SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle)
? (6/13) Which *production* database would you like to use? MySQL
? (7/13) Which *development* database would you like to use? MySQL
? (8/13) Do you want to use Hibernate 2nd level cache? No
? (9/13) Would you like to use Maven or Gradle for building the backend? Maven
? (10/13) Which other technologies would you like to use? (Press <space> to select, <a> to toggle all, <i> to inverse selection)
? (11/13) Would you like to use the LibSass stylesheet preprocessor for your CSS? No
? (12/13) Would you like to enable internationalization support? No
? (13/13) Which testing frameworks would you like to use? Protractor

DATABASE SETUP
==============

1. Create a local mysql user account with username 'strokeapp' and password ‘strokeapp'.
	
	This can be done from the command line:
	
	  mysql -u root -p
	        
	  CREATE USER 'clintouch'@'localhost' IDENTIFIED BY 'clintouch';
	
2. Create a mysql database named 'strokeapp' and grant all privileges to user 'strokeapp'
	
	  CREATE DATABASE strokeapp;        
	        
	  GRANT ALL ON strokeapp.* TO 'strokeapp'@'localhost';
	  

Generating a WAR file
=====================

see https://jhipster.github.io/production/

To package the application as a “production” WAR, type:

./mvnw -Pprod package

This will generate two files:

target/stroke-app-0.0.1-SNAPSHOT.war
target/stroke-app-0.0.1-SNAPSHOT.war.original

Simply copy the .original file into the Tomcat "webapps" folder
and rename by removing the .original extension.



