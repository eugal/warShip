import Bullet from './bullet';

export default class Enemy extends Phaser.Sprite {

    constructor({ game, x, y, asset, frame, health, bulletSpeed }) {
        super(game, x, y, asset, frame);

        this.game = game;

        this.anchor.setTo(0.5);
        this.scale.setTo(0.8);
        this.health = health;
        this.maxHealth = health;
        this.game.physics.arcade.enable(this);

        this.animations.add('spinning', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 30, true);
        this.play('spinning');

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bulletSpeed = bulletSpeed;

        this.player;

        //pass in enemy type?

        // this.shotSound = this.game.add.sound('enemyShot');

    }

    update() {

    // AI!!!! 

        // if(this.player){
        //     return
        // } else {

            if (this.position.y < 0.04 * this.game.world.height) {
                this.position.y = 0.04 * this.game.world.height + 2;
                this.body.velocity.y *= -1;
            }
            else if (this.position.y > 0.96 * this.game.world.height) {
                this.position.y = 0.96 * this.game.world.height - 2;
                this.body.velocity.y *= -1;
            }

            if (this.position.x < 0) {
                this.kill();
            }
        // }
        
    }

    shoot(player) {

        // this.shotSound.play("",0,0.5);

        let bullet = this.bullets.getFirstExists(false);

        if (!bullet) {
            bullet = new Bullet({
                game: this.game,
                x: this.x,
                y: this.bottom,
                health: 5,
                asset: 'bullet',
                tint: 0xff4d4d
            });
            this.bullets.add(bullet);
        }
        else {
            bullet.reset(this.x, this.bottom, 2);
        }

        if(player) {
            bullet.body.rotation = this.game.physics.arcade.moveToObject(bullet, player, this.bulletSpeed);
        } else {
            bullet.body.velocity.x = this.bulletSpeed  * -1;
        }
    } //end shoot

    damage(amount) {
        super.damage(amount);
    }

    reset({ x, y, health, bulletSpeed, speed }) {
        super.reset(x, y, health);
        this.bulletSpeed = bulletSpeed;
        this.body.velocity.x = speed.x;
        this.body.velocity.y = speed.y;
    }
}
