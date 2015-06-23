# Photobook Demo

Little AngularJS demo app using Facebook API.

## Dev Machine Setup

This project uses npm and Ruby for certain dependencies. Make sure they are install on your machine.

**Install the Bundler tool to manage gem dependencies.**
```
> gem install bundler
```

**Install Bower globally to manage browser-based dependencies.**
```
> npm install -g bower
```


## Project Setup

**Install npm dev dependencies**
```
> npm install
```

**Install client-side libraries**
```
> bower install
```

**Install Ruby Gems**
```
> bundle install
```

**Run dev server**
```
> grunt serve
```

*Note: if either of npm or bower do not install all dependencies properly, try running `> npm cache clean` or `> bower cache clean`.*


## Package App

**Setup Facebook app key**
Copy and rename `keys.json.sample` to `keys.json` and add a valid Facebook api token.

**Create a dist build**
To build:
```
> grunt serve:dist
```

To test the dist build on Mac run a python server.
```
cd dist && python -m SimpleHTTPServer 9000
```

## Disclaimer
- It's just a demo!
- Given more time I would have used Gulp! (But had random Grunt tasks from other projects already on hand.)


## TODOs
- find a better way to insert api key even in dev mode (currently need to run in dist mode or manually override it into the index file)
- add camera capture as method of posting photo (will need polyfill for getUserMedia)
- need to refactor the controllers to use Control As syntax (current method using scope is not recommended)
- grunt build:dist appears to be broken (broken css paths)
- photo uploads but the contents is blank (debug code to that encodes/decodes ??)
- properly clear file field after upload is complete
- some code cleanup needed
