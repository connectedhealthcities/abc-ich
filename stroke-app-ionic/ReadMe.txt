STROKE APP - ReadMe.txt

PREREQUISITES
Assumes that Node and NPM are already installed.

It also assumes you have already cloned Stroke App git repository, but this is the first time you have tried to build the tablet app.

USE NPM TO INSTALL IONIC, CORDOVA & GULP CLIs

Note: NPM packages such as Cordova and Ionic that can be run directly from the command line need to be installed globally.  Other NPM project dependancies can be installed globally, or locally to a project (with the local project packages taking precedence over the global ones).  

    npm install -g cordova ionic gulp-cli 

The following assumes <STROKE APP> is the main project folder containing all the Stroke App components (e.g. the tablet app and the server app).


INSTALL THE DEPENDANCIES

Change to the Ionic tablet app folder:

    cd <STROKE APP>/stroke-app-ionic/

Install the NPM dependancies specified in the package.json file:

    npm install

NPM will download all the dependancies creating a 'node-modules' folder in the 'stroke-app-ionic' folder.


ADD THE PLATFORM

Add the Android platform:

    ionic cordova platform add android

When prompted with the question: "The config.xml file exists in project. Overwrite?", reply "No".

When prompted with the question: "The resources/ directory exists in project. Overwrite?", reply  "No".


BUILD AND RUN ON A TABLET

Check everything builds correctly:

    ionic cordova build android

The to deploy to device, connect a tablet in development mode via a USB cable then:

    ionic cordova run android


RUN IN A WEBBROWSER

The app can also be run in a browser on a development machine with the following command:

    Ionic Serve

This will instantiate a local webserver (i.e. localhost:8100 by default) and open the application in the default web browser.