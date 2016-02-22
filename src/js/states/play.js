import Player from '../prefabs/player';
import Enemy from '../prefabs/enemy';
import HUD from '../prefabs/hud';

// import GConstants from '../prefabs/gConstants';

let _ThreeUI;

export default class Play extends Phaser.State {


    create() {

        // new Main();

        var gData = this.cache.getJSON('gameData');

        this.farback = this.add.tileSprite(0, 0, 800, 600, 'farback'); //the map bg
        this.totalTime = 0;
        this.game.time.slowMotion = 1;

        this.enemies = this.add.group();
        this.enemies.enableBody = true;

        this.enemies2 = this.add.group();
        this.enemies2.enableBody = true;

        this.player = new Player({
            game: this.game,
            x: this.game.world.centerX,
            y: 0.92 * this.game.world.height,
            health: gData[0].hp,
            asset: 'newfigther',
            frame: 1
        });
        this.game.stage.addChild(this.player);

        this.hud = new HUD({
            game: this.game,
            player: this.player,
        });


        //inputs only takes mouse to slow down
        this.game.input.onDown.add(() => {
            // this.game.time.slowMotion = 1;
            this.playerShooting = true;
        });

        this.game.input.onUp.add(() => {
            // this.game.time.slowMotion = 3;
            this.playerShooting = false;
        });

        this.enemyTime = 0;
        this.enemyTime2 = 0;
        this.enemyInterval = 1;
        this.enemyInterval2 = 1;
        this.enemyShootTime = 0;
        this.enemyShootTime2 = 0;
        this.enemyShootInterval = 3;

        let loadout = localStorage.getItem("loadout");



        this.playerShootTime = 0;
        this.playerShootInterval = loadout * .01;
        this.playerShooting = false;

        //enemy interval spawner this should be smarter 
        this.game.time.events.loop(Phaser.Timer.SECOND * 10, () => {
            if(this.enemyInterval > 0.2 ){
                this.enemyInterval -= 0.1;
            }
        });

        this.overlayBitmap = this.add.bitmapData(this.game.width, this.game.height);
        this.overlayBitmap.ctx.fillStyle = '#000';
        this.overlayBitmap.ctx.fillRect(0, 0, this.game.width, this.game.height);

        this.overlay = this.add.sprite(0, 0, this.overlayBitmap);
        this.overlay.visible = false;
        this.overlay.alpha = 0.75;

        // this.music = this.game.add.audio('playMusic');
        // this.bulletHitSound = this.add.sound('bulletHit');
        // this.enemyExplosionSound = this.add.sound('enemyExplosion');
        // this.playerExplosionSound = this.add.sound('playerExplosion');
        // this.gameOverSound = this.add.sound('gameOver');
        // this.music.loopFull();




    } //END CREATE

    update() {
        //TODO: figure out enemy spawning system. something better than enemy2
        this.totalTime += this.game.time.physicsElapsed;
        this.enemyTime += this.game.time.physicsElapsed;
        this.enemyTime2 += this.game.time.physicsElapsed;
        this.enemyShootTime += this.game.time.physicsElapsed;
        this.enemyShootTime2 += this.game.time.physicsElapsed;
        this.playerShootTime += this.game.time.physicsElapsed;
        // console.log(this.totalTime);

        if (this.enemyTime > this.enemyInterval) {
            this.enemyTime = 0;

            this.createEnemy({
                game: this.game,
                x: this.game.width,
                y: this.game.rnd.integerInRange(6, 76) * 10, //y height to spawn in
                speed: {
                    x: this.game.rnd.integerInRange(5, 10) * -10,
                    y: 1
                    // y: this.game.rnd.integerInRange(5, 10) * 10
                },
                health: 1,
                bulletSpeed: 250, //HERE
                // bulletSpeed: this.game.rnd.integerInRange(15, 25) * 10, 
                asset: 'alien'
            });
        }

        if(this.totalTime > 10){
            if (this.enemyTime2 > this.enemyInterval2) {
                this.enemyInterval = 3; //Slow down other enemies when this one starts spawning.
                this.enemyTime2 = 0;
                this.createEnemy2({
                    game: this.game,
                    x: this.game.width,
                    y: this.game.rnd.integerInRange(6, 76) * 10,
                    speed: {
                        x: this.game.rnd.integerInRange(5, 10) * -10,
                        // y: 1
                        y: this.game.rnd.integerInRange(5, 10) * 10
                    },
                    health: 9,
                    // bulletSpeed: 250, //HERE
                    bulletSpeed: this.game.rnd.integerInRange(15, 25) * 10, 
                    asset: 'alien2'
                });
            }
        }

        if (this.enemyShootTime > this.enemyShootInterval) {
            this.enemyShootTime = 0;
            this.enemies.forEachAlive(enemy => enemy.shoot(this.player)); //If the player is passed in then the bullet goes towards the player
            if (!this.player.alive) {
                this.game.world.bringToTop(this.overlay);
            }
        }

        if (this.enemyShootTime2 > this.enemyShootInterval) {
            this.enemyShootTime2 = 0;
            this.enemies2.forEachAlive(enemy => enemy.shoot());
            if (!this.player.alive) {
                this.game.world.bringToTop(this.overlay);
            }
        }

        if(this.playerShooting){
            if (this.playerShootTime > this.playerShootInterval) { //else it goes in a straight line
                this.playerShootTime = 0;
            if (this.player.alive) {
                this.player.shoot();
                }
            }
        }

        this.game.physics.arcade.overlap(this.player.bullets, this.enemies, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.player.bullets, this.enemies2, this.hitEnemy, null, this);

        this.game.physics.arcade.overlap(this.player, this.enemies, this.crashEnemy, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemies2, this.crashEnemy, null, this);

        this.enemies.forEach(enemy => this.game.physics.arcade.overlap(this.player, enemy.bullets, this.hitPlayer, null, this));
        this.enemies2.forEach(enemy => this.game.physics.arcade.overlap(this.player, enemy.bullets, this.hitPlayer, null, this));

        // if(this.totalTime > 5){
        //     this.farback.tilePosition.x -= 1;
        // }else {
            this.farback.tilePosition.x -= 3;
        // }


    } //END UPDATE

    createEnemy(data) {

        let enemy = this.enemies.getFirstExists(false);

        if (!enemy) {
            enemy = new Enemy(data);
            this.enemies.add(enemy);
        }
        enemy.reset(data);
    }

    createEnemy2(data)  {

        let enemy = this.enemies2.getFirstExists(false);

        if (!enemy) {
            enemy = new Enemy(data);
            this.enemies2.add(enemy);
        }
        enemy.reset(data);
    }

    hitEffect(obj, color) {
        let tween = this.game.add.tween(obj);
        let emitter = this.game.add.emitter();
        let emitterPhysicsTime = 0;
        let particleSpeed = 100;
        let maxParticles = 10;

        tween.to({tint: 0xff0000}, 100);
        tween.onComplete.add(() => {
            obj.tint = 0xffffff;
        });
        tween.start();

        emitter.x = obj.x;
        emitter.y = obj.y;
        emitter.gravity = 0;
        emitter.makeParticles('particle');

        if (obj.health <= 0) {
            particleSpeed = 200;
            maxParticles = 40;
            color = 0xff0000;
        }

        emitter.minParticleSpeed.setTo(-particleSpeed, -particleSpeed);
        emitter.maxParticleSpeed.setTo(particleSpeed, particleSpeed);
        emitter.start(true, 500, null, maxParticles);
        emitter.update = () => {
            emitterPhysicsTime += this.game.time.physicsElapsed;
            if(emitterPhysicsTime >= 0.6){
                emitterPhysicsTime = 0;
                emitter.destroy();
            }

        };
        emitter.forEach(particle => particle.tint = color);
        if (!this.player.alive) {
            this.game.world.bringToTop(this.overlay);
        }
    }

    //collision

    hitEnemy(bullet, enemy) {
        // this.bulletHitSound.play("",0,0.5);
        enemy.damage(bullet.health);
        this.hitEffect(enemy, bullet.tint);
        if (!enemy.alive) {
            // this.enemyExplosionSound.play("",0,0.5);
            this.hud.updateScore(enemy.maxHealth);
        }
        bullet.kill();
    }

    hitPlayer(player, bullet) {
        // this.bulletHitSound.play("",0,0.5);
        player.damage(bullet.health);
        this.hud.updateHealth();
        this.hitEffect(player, bullet.tint);
        if (!player.alive) {
            // this.playerExplosionSound.play();
            this.gameOver();
        }
        bullet.kill();
    }

    crashEnemy(player, enemy) {
        player.damage(enemy.health); 
        enemy.damage(enemy.health);
        this.hitEffect(player);
        this.hitEffect(enemy);
        if (!enemy.alive) {
            // this.enemyExplosionSound.play("",0,0.5);
            this.hud.updateScore(enemy.maxHealth);
        }
        this.hud.updateHealth();
        if (!player.alive) {
            // this.playerExplosionSound.play();
            this.gameOver();
        }
    }

    gameOver(){
        this.game.time.slowMotion = 3;
        this.overlay.visible = true;
        this.game.world.bringToTop(this.overlay);
        // $(_ThreeUI).remove(); 
        let timer = this.game.time.create(this.game, true);
        timer.add(3000, () => {
            // this.music.stop();
            // this.gameOverSound.play();
            this.game.state.start('Over');
        });
        timer.start();
    }

}
//3dbg TODO
// export class Main {

//     constructor() {
//         // this.elements = [];
        
       
//         // this.camera.position.x = 1000;
//         // this.camera.position.y = 1000;

//         this.scene = new THREE.Scene();
//         this.renderer;
//         this.mouseX;
//         this.mouseY;
//         this.particle1;

//         this.init();

        
//     }

//     init() {

//         this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000 );
//         this.camera.position.z = 1000;

//         let PI2 = Math.PI * 2;
//         let program = function ( context ) {
//           context.beginPath();
//           context.arc( 0, 0, 0.5, 0, this.PI2, true );
//           context.fill();
//         };
        
//         this.group = new THREE.Group();
//         this.scene.add(this.group);


//         for ( var i = 0; i < 1000; i++ ) {

//           let material = new THREE.SpriteCanvasMaterial( {
//             color: Math.random() * 0x808008 + 0x808080,
//             // color: 0xffffff,
//             program: program
//           } );

//           console.log(material);

//           this.particle1 = new THREE.Sprite( material );
//           this.particle1.position.x = Math.random() * 2000 - 1000;
//           this.particle1.position.y = Math.random() * 2000 - 1000;
//           this.particle1.position.z = Math.random() * 2000 - 1000;
//           this.particle1.scale.x = this.particle1.scale.y = Math.random() * 20 + 10;
//           this.group.add( this.particle1 );
//           console.log(this.particle1);
//         }
        

//         this.renderer = new THREE.CanvasRenderer();
//         this.renderer.setPixelRatio( window.devicePixelRatio );
//         this.renderer.setSize( window.innerWidth, window.innerHeight );
//         document.body.appendChild( this.renderer.domElement );
//         this.handleResize()
//         window.addEventListener('resize', this.handleResize.bind(this), false);
//         // window.addEventListener('resize', this.onMouseMove, false);

//         _ThreeUI = this.renderer.domElement;
//         $(_ThreeUI).addClass("bgClass");      
//           this.render();

//     }

//     handleResize() {
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.camera.aspect = window.innerWidth / window.innerHeight;
//         this.camera.updateProjectionMatrix();
//     }

//     // onMouseMove( event ) {
//     //     this.mouseX = event.clientX - windowHalfX;
//     //     this.mouseY = event.clientY - windowHalfY;
//     //     console.log('mouse move ' + this.mouseX)

//     // }

//     render() {
//         // this.elements.forEach(function(element) {
//         //     element.render();
//         // });
//         console.log('render');
//         this.renderer.render(this.scene, this.camera);
//         requestAnimationFrame(this.render.bind(this));

//         // this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
//         // this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.05;
//         this.camera.lookAt( this.scene.position );

//         this.group.rotation.x += 0.01;
//         this.group.rotation.y += 0.02;
//         console.log(this.group);

//     }
//}
