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

## Disclaimer
- It's just a demo!
- Given more time I would have used Gulp! (But had random Grunt tasks from other projects already on hand.)
- A proper Angular app should be structured to be more modular. See [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide).


## TODOs
- find a better way to insert api key even in dev mode
