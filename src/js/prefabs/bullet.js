export default class Bullet extends Phaser.Sprite {

    constructor({ game, x, y, asset, health, tint = 0xff4d4d }) {
        super(game, x, y, asset);

        this.anchor.setTo(0.5);
        this.scale.setTo(0.8);
        this.health = health;
        this.tint = tint;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }
}

// DIFFERENT BULLET STYLES PLEASE?
// export default class Bullet2 extends Phaser.Sprite {

//     constructor({ game, x, y, asset, health, tint = 0xff0000 }) {
//         super(game, x, y, asset);

//         this.anchor.setTo(0.5);
//         this.scale.setTo(0.8);
//         this.health = health;
//         this.tint = tint;
//         this.checkWorldBounds = true;
//         this.outOfBoundsKill = true;
//         this.enableBody = true;
//         // this.allowGravity = true;
//         // this.body.rotation = this.game.physics.arcade.moveToPointer(this, this.bulletSpeed, this.game.input.activePointer, 500);
//     }


// }
