Boringo!
=======

A web app for Boring Bingo -- spice up those boring meetings!

#The Pitch
Have you ever been in a boring meeting? In that meeting, have you ever thought to yourself "...aaaand Captain Obvious just stated the obvious."? Wish you could revel in your clever, satirical thoughts with your friends or coworkers in the meeting? Or maybe you're the organizer of the meeting, and the content by nature is just...well...boring. Spice up that meeting with Boringo -- Boring Bingo! 

See the [wiki](https://github.com/boringo/boringo/wiki) for more information.

#Development
##Prerequisites
* `node` and `npm`. I recommend using [Node Version Manager (nvm)](https://github.com/creationix/nvm), which is a node analog of python's virtualenv. You will only be able to use this on Mac or Linux. It will allow simultaneous development of different apps that require different versions of node, and it doesn't require a super user to install packages globally. If you use Windows, you shouldn't. But if you do, install node from [download page](http://nodejs.org/download/).
*  install nvm with the following: `curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash`, then restart your terminal.
*  install node: `nvm install 0.10`
*  open a new shell and `nvm use 0.10`
* [MongoDB](http://docs.mongodb.org/manual/installation/), installed and __running__ on the default port. Just use the instructions found on their page for installing and running it.

##Installation
* Clone the github repository into a directory called 'boringo': `git clone git@github.com:boringo/boringo.git boringo`
* `cd boringo`
* `npm install`

##Running
* `grunt` will use the CSS and JS style rules to check the code style, minify the css and javascript, and it will start the server on the default port
* or you can use `node server.js` to skip the build and just start the server
* to specify an environment and squelch those red warning messages, use `NODE_ENV=production grunt`, `NODE_ENV=development grunt`, or `NODE_ENV=test grunt`