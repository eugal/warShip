import * as states from './states';
const GAME = new Phaser.Game(800, 600, Phaser.AUTO, null, null, true);

Object.keys(states).forEach(state => GAME.state.add(state, states[state]));

GAME.state.start('Boot');
