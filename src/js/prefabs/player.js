import Bullet from './bullet';

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
        // this.body.maxAngularVelocity = 200;

        this.body.collideWorldBounds = true;

        this.lastPos = {x, y};

        this.diff = {
            x: 0,
            y: 0
        };

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bulletSpeed = -500;

        // this.shotSound = this.game.add.sound('playerShot');

        // this.game.input.onDown.add(() => {
        //     if (this.alive) {
        //         // this.mousePos.x = this.game.input.activePointer.position.x;
        //         // this.mousePos.y = this.game.input.activePointer.position.y;
        //         // this.diff.x = x - this.position.x;
        //         // this.diff.y = y - this.position.y;
        //     }
        // });

        // this.game.input.onUp.add(() => {
        //     if (this.alive) {
        //         this.frame = 1;
        //     }
        // });
    }

    update() {


        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.KeyCode.W)){
            this.body.acceleration.y = -500;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.game.input.keyboard.isDown(Phaser.KeyCode.S)){
            // this.game.physics.arcade.accelerationFromRotation(this.rotation, -200, this.body.acceleration);
            this.body.acceleration.y = 500;
        } else {
            if(this.body.velocity.y > 50){
                this.body.acceleration.y--;
            } else if (this.body.velocity.y < -50) {
                this.body.acceleration.y++;
            } else {    
                this.body.velocity.y = 0;
            }
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.KeyCode.D)){
            // this.body.angularVelocity = 100;
            this.body.acceleration.x = 500;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.KeyCode.A)){
             this.body.acceleration.x = -500;
        } else {
            if(this.body.velocity.x > 50){
                this.body.acceleration.x--;
            } else if (this.body.velocity.x < -50) {
                this.body.acceleration.x++;
            } else {    
                this.body.velocity.x = 0;
            }
        }


        // console.log(this.body.velocity);

    } //end update 

    shoot() {

        console.log(this.game.physics.arcade);

        // this.shotSound.play("",0,0.5);

        let bullet = this.bullets.getFirstExists(false);

        if (!bullet) {
            bullet = new Bullet({
                game: this.game,
                x: this.x,
                y: this.y - 3,
                health: 3,
                asset: 'bullet',
                tint: 0x04c112
            });
            this.bullets.add(bullet);
        }
        else {
            bullet.reset(this.x, this.top, 3);
        }
        // bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, this.bulletSpeed, game.input.activePointer, 500);
        bullet.body.velocity.x = this.bulletSpeed * -1;
    } // END shoot

    damage(amount) {
        super.damage(amount);
    }

}
