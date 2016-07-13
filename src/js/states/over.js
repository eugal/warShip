import TextButton from '../extensions/textbutton';

export default class Over extends Phaser.State {

    create() {

        let _this = this;

        $('#menu').show();
        $('#clicker').hide();
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

       // this.updatePilot();
    }

    updatePilot() {

        var pilotData = jQuery.parseJSON(localStorage.getItem('pilotData'));
        // pilot.relation.A2++;
        // // var pilotLove = pilot.relation.A2 + 1;
        console.log(pilotData);
        // var newPilot = JSON.stringify(pilot);
        // localStorage.setItem("pilotData", null);
        $('#pilotInfo h1').text(pilotData.pilot[0].name);

        $('#pClass h1').text(pilotData.pilot[0].class);
        $('#pScore h1').text(pilotData.pilot[0].highScore);


    }
}
