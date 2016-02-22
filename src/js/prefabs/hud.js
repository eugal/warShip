export default class Hud extends Phaser.Group {
    constructor({ game, player }) {
        super(game);
        this.game = game;
        this.player = player;
        this.totalTime = 0;
        // this.bg = new Phaser.Image(this.game, 0, 0, 'hudBg');
        this.width = 800;
        // this.healthbar = new Phaser.Sprite(this.game, 2, 2, 'healthbar');
        // this.healthbar.scale.setTo(0.995, 11);

        this.score = 0;
        // this.scoreLabel = 'Score: ';
        // this.scoreText = new Phaser.Text(this.game, 20, 14, this.scoreLabel + this.score, {
        //     font: '13px Verdana',
        //     fill: 'white',
        //     align: 'center'

        // });

        this.timer = 0;

        this.highScore = localStorage.getItem("high-score");

        // this.add(this.bg);
        // this.add(this.healthbar);
        // this.add(this.scoreText);

        this.maxHealth = this.player.health;

        this.originalWidth = $(window).width();
        // window.addEventListener('resize', this.handleResize.bind(this), false); //TODO: Scale DOM nicely

        //DOM UI:
        $("#btnOne").hide();
        $("#hud").show();
    }

    handleResize() {
        let newWidth = $(window).width();
        let scale = (newWidth/this.originalWidth);
         $("#hud").css('-webkit-transform', 'scale(' + scale + ')');
        console.log($( window ).width());
    }

    update(){
        this.totalTime += this.game.time.physicsElapsed;
        this.timer = Math.round(this.totalTime);
        // this.timeText.text = this.timeLabel + this.timer;
        $(".timeText h1").text("Time: " + this.timer)
        // console.log(this.timer);
    }

    updateHealth() {
        // this.healthbar.crop(new Phaser.Rectangle(0, 0, (this.player.health / this.player.maxHealth) * this.width, 10));
        // this.healthbar.updateCrop();
        let newHealth = (this.player.health / this.maxHealth) * 100;
        // console.log(Math.round(newHealth) + '%');
        $('.healthbar').width(Math.round(newHealth)+ '%')
    }

    updateScore(amount) {
        this.score += amount;
        $(".scoreText h1").text("Score: " + (this.score * 10))
        // this.scoreText.text = this.scoreLabel + (this.score * 10);
        
        if(this.highScore < this.score){
            localStorage.setItem("high-score", this.score);
        }

    }

};
