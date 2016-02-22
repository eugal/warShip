# warShip

this game is based on [Phaser ES6 Demo](https://github.com/cstuncsik/phaser-es6-demo) by cstuncsik. 

## Installation

    npm install
    
    I had some errors in install but it still worked. Should probably check what, i think it failed on some python. 

## Technology

The project is based on [Node.js](https://nodejs.org/en/)

  ```sh
  npm i && npm run dev
  ```

  To build production:

  ```sh
  npm run build
  ```


## Structure

Source files are in **src** folder

Gulp task are in **tasks** folder as separate files in **dev** and **prod** folders. There are some redundancy but in this way it is very easy to maintain, scale and copy tasks from one project to another.

Development and production builds are going to **builds** folder.

## Features

In production mode (dev mode is nearly just copying files into builds/dev).json

  - optimizing images
  - minifying html, js and json
  - file revisioning to prevent browser cache

## Assets


### Sprites & Background


### Sounds & Music


## License

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See [WTFPL](http://www.wtfpl.net) ![WTFPL icon](http://i.imgur.com/AsWaQQl.png) for more details.
