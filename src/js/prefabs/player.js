import Bullet from './bullet';
import Bullet2 from './bullet'; //nothing yet, different bullet styles please

export default class Player extends Phaser.Sprite {


    constructor({ game, x, y, asset, frame, health }) {
        super(game, x, y, asset, frame);

        this.game = game;

        this.anchor.setTo(0.5);
        this.scale.setTo(0.8);

        this.health = health;
        this.maxHealth = health;

        this.game.physics.arcade.enable(this);
        this.enableBody = true;

        this.body.maxVelocity.setTo(250, 250);

        this.body.collideWorldBounds = true;
        this.body.allowGravity = true;

        this.lastPos = {x, y};

        this.diff = {
            x: 0,
            y: 0
        };

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bulletSpeed = -400;

        this.loadout = localStorage.getItem("loadout");

        // this.shotSound = this.game.add.sound('playerShot');

        // this.game.input.onUp.add(() => {
        //     if (this.alive) {
        //         this.frame = 1;
        //     }
        // });

    }

    update() {

        let isUp = this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.KeyCode.W);
        let isDown = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.game.input.keyboard.isDown(Phaser.KeyCode.S);
        let isLeft = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.KeyCode.A);
        let isRight = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.KeyCode.D);


        if(isUp){
            this.body.acceleration.y = -500;
        } else if (isDown){
            // this.game.physics.arcade.accelerationFromRotation(this.rotation, -200, this.body.acceleration);
            this.body.acceleration.y = 500;
        } else {
            if(this.body.velocity.y > 20){
                this.body.acceleration.y -= 50;
            } else if (this.body.velocity.y < -20) {
                this.body.acceleration.y += 50;
            } else {    
                this.body.velocity.y = 0;
                this.body.acceleration.y = 0;
            }
        }

        if(isRight){
            this.body.acceleration.x = 500;
        } else if (isLeft){
             this.body.acceleration.x = -500;
        } else {
            if(this.body.velocity.x > 20){
                this.body.acceleration.x -= 30;
            } else if (this.body.velocity.x < -20) {
                this.body.acceleration.x += 30;

            } else {    
                this.body.velocity.x = 0;
                this.body.acceleration.x = 0;
            }
        }

        // console.log( this.body.acceleration.x);
        // console.log(this.body.velocity);

    } //end update 

    shoot() {
        // console.log(this.game.physics.arcade);
        // this.shotSound.play("",0,0.02);

        let bullet = this.bullets.getFirstExists(false);

        let _yOffset = this.y - 3; 

        if (!bullet) {
            bullet = new Bullet({
                game: this.game,
                x: this.x,
                y: _yOffset = this.y - 3,
                health: 3,
                asset: 'bullet',
                tint: 0xccffcc
            });
            this.bullets.add(bullet);
        }
        else {
            bullet.reset(this.x,  _yOffset = this.y - 3, 3);
        }

        if(this.loadout < 6){ //RN loadout is bullet firerate
           bullet.body.velocity.x = this.bulletSpeed * -1;
        } else {
            bullet.body.rotation = this.game.physics.arcade.moveToPointer(bullet, -this.bulletSpeed, this.game.input.activePointer);
        }

    } // END shoot

    damage(amount) {
        super.damage(amount);
    }

}
