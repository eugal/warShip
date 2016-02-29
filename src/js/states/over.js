import TextButton from '../extensions/textbutton';

export default class Over extends Phaser.State {

    create() {

        let _this = this;

        $('#menu').show();
        $('.title h1').text("Game Over!");
        $('.intro').hide();

        $('#btn1 h1').text("Try Again");
        $('#btn1').click(function(){ 
            _this.state.start('Play');
        });
        $('#btn2 h1').text("Main Menu");
        $('#btn2').click(function(){
            _this.state.start('Menu');
        });

        // reset hud
       $('.healthbar').width(100 + '%')
       $(".scoreText h1").text("Score: " + 0)
       $("#hud").hide();
       $('#circle h1').text(100);

    }
}
