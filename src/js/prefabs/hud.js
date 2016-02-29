export default class Hud extends Phaser.Group {
    constructor({ game, player }) {
        super(game);
        this.game = game;
        this.player = player;
        this.totalTime = 0;
        this.width = 800;
        this.score = 0;
        this.timer = 0;

        this.highScore = localStorage.getItem("high-score");

        this.maxHealth = this.player.health;

        this.lastHp = (this.player.health / this.maxHealth) * 100;

        this.originalWidth = $(window).width();
        window.addEventListener('resize', this.handleResize.bind(this), false);

        //DOM UI:
        $("#menu").hide();
        $("#hud").show();
        // $('#circle').show():
        $('#circle').circleProgress({
            value: 100,
            size: 50,
            fill: {
                gradient: ["red", "orange"]}
        });

        this.handleResize();
    }

    handleResize() {
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let newWidth = $(window).width();
        let minWidth = 1024;
        let minHeigth = 576;
        // let scale = (newWidth/this.originalWidth);
        let scale = (h/minHeigth);
         $("#hud").css('transform', 'scale(' + scale + ')');
    }

    update(){
        this.totalTime += this.game.time.physicsElapsed;
        this.timer = Math.round(this.totalTime);
        // this.timeText.text = this.timeLabel + this.timer;
        $(".timeText h1").text("Time: " + this.timer)
        // console.log(this.timer);
    }

    updateHealth() {
        // let lastHealth = (this.player.health / this.maxHealth) * 100;
        let newHealth = (Math.round((this.player.health / this.maxHealth) * 100));
        // this.timer = Math.round(newHealth);
        // $('#circle h1').empty();
        $('#circle h1').text(String(newHealth));

        // let newDiv = document.createElement("h1"); 
        // let newContent = document.createTextNode(newHealth); 
        // newDiv.appendChild(newContent); //add the text node to the newly created div. 
        // document.body.insertBefore(newDiv, document.getElementById("div1")); 


        console.log(Math.round(newHealth) * .01);
        // $('.healthbar').width(Math.round(newHealth)+ '%')
        $('#circle').circleProgress({
            value: newHealth * .01,
            animationStartValue: Math.round(this.lastHp) * .01,
            // size: 80,
            // fill: {
            //     gradient: ["red", "orange"]}
        });
        this.lastHp= (this.player.health / this.maxHealth) * 100;

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
