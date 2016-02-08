# warShip

this game is based on [Phaser ES6 Demo](https://github.com/cstuncsik/phaser-es6-demo) by cstuncsik. 

This is small shoot'em up demo game to show how you can build a [phaser](http://phaser.io/) game with the next generation of javascript (ES6/2015).


## Technology

The project is based on [Node.js](https://nodejs.org/en/)
If you are familiar just have a look at **package.json** and gulp tasks in **tasks** folder.
If you are familiar and lazy just run:

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

In production mode (dev mode is nearly just copying files into builds/dev)

  - optimizing images
  - minifying html, js and json
  - file revisioning to prevent browser cache

## Assets


### Sprites & Background


### Sounds & Music


## License

Copyright © 2016 Csaba Tuncsik <csaba.tuncsik@gmail.com>

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See [WTFPL](http://www.wtfpl.net) ![WTFPL icon](http://i.imgur.com/AsWaQQl.png) for more details.
