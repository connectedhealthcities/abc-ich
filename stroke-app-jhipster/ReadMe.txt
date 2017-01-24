Jhipster documentation
======================
see https://jhipster.github.io/

Project options
===============

This project was created using generator-hipster 3.11.0.

Selected options were as follows:

see https://jhipster.github.io/creating-an-app/

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

Database setup
==============

1. Create a local mysql user account with username 'strokeapp' and password ‘strokeapp'.
	
	This can be done from the command line:
	
	  mysql -u root -p
	        
	  CREATE USER 'strokeapp'@'localhost' IDENTIFIED BY 'strokeapp';
	
2. Create a mysql database named 'strokeapp' and grant all privileges to user 'strokeapp'
	
	  CREATE DATABASE strokeapp;        
	        
	  GRANT ALL ON strokeapp.* TO 'strokeapp'@'localhost';
	  

Initial Project Setup
=====================

Note: These instructions assume that you have Java 8 installed

1. Clone the repository (git clone ssh://<UserName>@mhealth.herc.ac.uk:29418/stroke-app.git)

2. Install Node.js from the Node.js website (prefer an LTS version). This will also install npm, which is the node package manager we are using in the next commands.

3. (Recommended) Update npm: npm install -g npm

4. Install Yeoman: npm install -g yo

5. Install Bower: npm install -g bower

6. Install Gulp: npm install -g gulp-cli 
(If you have previously installed a version of gulp globally, please run
npm rm -g gulp to make sure your old version doesn’t collide with gulp-cli)

(Note: steps 3 to 6 can be run anywhere as the installs are global!)

7. cd into the "stroke-app-jhipster" folder and install node module dependencies: npm install


Running the application
=======================

Note: the following command should be run from the "stroke-app-jhipster" folder

Launch the Java server with Maven: ./mvnw (on Mac OS X/Linux) or mvnw (on Windows)
   
   This should display the following log message in the command window:
   ----------------------------------------------------------
	Application 'StrokeApp' is running! Access URLs:
	Local: 		http://localhost:8080
	External: 	http://130.88.0.200:8080
   ----------------------------------------------------------

As the message states, the application will be available on http://localhost:8080. 


Development / Debugging the application
=======================================

1. Right-Click on StrokeApp.java in STS and select: Debug As | Spring Boot App

2. Launch the application in a web browser using the "gulp" command from the "stroke-app-jhipster" folder.
   
   This should open up your Web browser, with live reload enabled, on http://localhost:9000.
   This works thanks to BrowserSync, and you can access its administration screen on
   http://localhost:3001.

   This provides the following features:

   As soon as you modify one of your HTML/CSS/JavaScript file, your browser will refresh itself automatically
   As soon as you add/remove a javascript file it will be added to the index.html, your browser will refresh itself automatically
   When you test your application on several different browsers or devices, all your clicks/scrolls/inputs should be automatically synchronized on all screens


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


Email configuration
===================

Jhipster supports 2 profiles: Development and Production.

Email is configured separately for each profile in the following files:
	src\main\resources\config\application-dev.yml
	src\main\resources\config\application-prod.yml
