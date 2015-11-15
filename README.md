# Nucleus Frontend

## Installing Dependencies
In order to install frontend development dependencies:

### Install Grunt
```
$ sudo npm install -g grunt-cli
```

### Install Compass
It requires compass gem installed, depending the OS, you should have rvm (Ruby Version Manager) installed in order to install this gem.

Supposing rvm it's already installed
```
$ gem install compass
```

### Install build dependencies
```
$ npm install
```

### Install frontend libraries
```
$ bower install
```

## Run frontend server

```
$ grunt serve
```

## Notes
Bootstrap is set to 3.3.4 on bower.json due to a bug, see https://github.com/yeoman/generator-angular/issues/1116

