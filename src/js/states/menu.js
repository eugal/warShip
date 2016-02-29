import TextButton from '../extensions/textbutton';

import Cube from '../cube'; 

let _ThreeUI;
let _this;

export default class Menu extends Phaser.State {

    create() {

        let _this = this;

        new Main(); // creates three js menu in menu state

        // this.music = this.game.add.audio('menuMusic');
        this.farback = this.add.tileSprite(0, 0, 1024, 576, 'farback');

        this.score = localStorage.getItem("high-score");
        $('.highScore h1').text('High Score: ' + (this.score * 10));
  
        // this.music.loopFull();
        $('.title h1').text("warShip");
        $('.intro').show();

        $('#menu').show();
        $('#btn1 h1').text("ship one");
        $('#btn1').click(function(){
            localStorage.setItem("loadout", 10); 
            _this.state.start('Play');
            $(_ThreeUI).remove(); 
        });
        $('#btn2 h1').text("ship two");
        $('#btn2').click(function(){
            localStorage.setItem("loadout", 5); 
            _this.state.start('Play');
            $(_ThreeUI).remove(); 
        });

        window.addEventListener('resize', this.handleResize.bind(this), false);

    }

    handleResize() {
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        let newWidth = $(window).width();
        let minWidth = 1024;
        let minHeigth = 576;
        // let scale = (newWidth/this.originalWidth);
        let scale = (h/minHeigth);
         $("#menu").css('transform', 'scale(' + scale + ')');
    }

}

export class Main {
    constructor() {
        this.elements = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        document.body.appendChild( this.renderer.domElement );
        this.handleResize()
        window.addEventListener('resize', this.handleResize.bind(this), false);


        _ThreeUI = this.renderer.domElement;

        $(_ThreeUI).addClass("threeClass");

        this.addElement(new Cube());
        this.render();
    }

    addElement(element) {
        this.elements.push(element);
        element.place(this.scene);
    }

    handleResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.elements.forEach(function(element) {
            element.render();
        });
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}





