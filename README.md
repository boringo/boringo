Boringo!
=======

A web app for Boring Bingo -- spice up those boring meetings!

#The Pitch
Have you ever been in a boring meeting? In that meeting, have you ever thought to yourself "...aaaand Captain Obvious just stated the obvious."? Wish you could revel in your clever, satirical thoughts with your friends or coworkers in the meeting? Or maybe you're the organizer of the meeting, and the content by nature is just...well...boring. Spice up that meeting with Boringo -- Boring Bingo! 

See the [wiki](https://github.com/boringo/boringo/wiki) for more information.

#Development
##Prerequisites
* `node` and `npm`. I recommend using [Node Version Manager (nvm)](https://github.com/creationix/nvm), which is a node analog of python's virtualenv. You will only be able to use this on Mac or Linux. It will allow simultaneous development of different apps that require different versions of node, and it doesn't require a super user to install packages globally. If you use Windows, you shouldn't. But if you do, install node from [download page](http://nodejs.org/download/).
  * install nvm with the following: `curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash`, then restart your terminal.
  * install node: `nvm install 0.10`
  * open a new shell and `nvm use 0.10`
* [MongoDB](http://docs.mongodb.org/manual/installation/), installed and __running__ on the default port. Just use the instructions found on their page for installing and running it.

##Installation
* Clone the github repository into a directory called 'boringo': `git clone git@github.com:boringo/boringo.git boringo`
* `cd boringo`
* `npm install`

##Running
* `grunt` will use the CSS and JS style rules to check the code style, minify the css and javascript, and it will start the server on the default port
* or you can use `node server.js` to skip the build and just start the server
* to specify an environment and squelch those red warning messages, use `NODE_ENV=production grunt`, `NODE_ENV=development grunt`, or `NODE_ENV=test grunt`

##File Structure Description
* `app/` - all the server side code goes here. 
* `app/controllers` - the controllers for our app go in this directory. The users stuff is mostly taken care of...we can edit those files to only use facebook authentication. The example app has the core controller, an 'articles' controller, an 'errors' controller, and a 'users' controller. We can probably delete the articles controller after using it as an example for what we need.
* `app/models` - the models we will use for our app; basically the class definitions for the database json.
* `app/routes` - here we will define what happens when a user visits a particular url on our domain. Basically it maps a url to a function we defined in the controllers. 
* `app/tests` - for unit tests; we can either implement this or not...
* `app/views` - this is for defining html templates that the server will return to the client; however, since our app will be a RESTful API, it will only return JSON and won't really need any templates (except maybe for error/404 page in case of a bad url passed to our routes)
* `config/` - all the configuration goes here for the server. 
* `config/env/` - the environment-specific configurations goes here (ie, which database instance should we use when testing vs in production). 
* `config/strategies/` - these contain all the config files for passport, which is the module for logging in with credentials. we'll probably start off just with facebook, maybe local login, idk. The others we can probably delete.
* `config/*` - the rest of the files we can mostly leave alone -- they tie everything together
* `node_modules/` - these are all of the node dependencies. They are automatically installed when you type 'npm install', so no need to include this directory in the repository.
* `public/` - this is the client code. all the angularjs files will go here.
* `public/dist/` - when we build our client side, the finished stuff goes here (grunt knows this already).
* `public/lib/` - all our client-side dependencies will go here...bower knows this already. This stuff should stay out of the git repo.
* `public/modules` - basically the class definitions for the client side
* `public/modules/*` - each module is a directory containing config, controllers, services, tests, and views -- all of which are angular concepts that you can learn by following their tutorial or reading through the angular docs.
* `public/application.js` - the entry point for our client-side code.
* `screenshots/` - the images hosted for the boringo wiki

The rest are config files for the command line utilities:
* `.bowerrc` tells bower where to install dependencies. we use a command as simple as `bower install <dependency>`, and it will install it in to the `public/` directory (we specify this directory in the `.bowerrc` file).
* `.csslintrc` - tells lint (a program for checking code style) which rules we want to enforce for our CSS code
* `.gitignore` - tells git which files not to include when pushing/pulling from the repository. example: our node modules folder, which is a lot of dependency code that is easily installed with npm install
* `.jshintrc` - the rules we want to enforce for our javascript code style
* `bower.json` - project description and dependency list for client code - is used when we type `bower install` to install all the dependencies. `bower install` is called when we type `npm install`, I think.
* `gruntfile.js` - used by our `grunt` command. it defines what tasks need to be done when we type a command. for example: typing `grunt` will default to checking our javascript style (with jshint config file), our css style (with our csslint config file), it minifies our javascript and css files so that they aren't so big, runs all our unit tests (if we decide to implement any of them), and it starts our server. 
* `karma.conf.js` - the configuration file for our unit tests - it specifies which browsers to test our app in, it watches files for any changes and reruns tests instantly upon a file change, so we know whether a change broke anything instantly.
* `package.json` - the config file listing dependencies and project information. it is used by npm when we type `npm install`. 
* `server.js` - the entry point for our app (the server side).





