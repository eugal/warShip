import TextButton from '../extensions/textbutton';

import Cube from '../cube'; 

let _ThreeUI;

export default class Menu extends Phaser.State {

    create() {

        new Main(); // creates three js menu in menu state

        // this.music = this.game.add.audio('menuMusic');

        this.title = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY-200, 'warShip', {
            font: '36px Tahoma',
            fill: 'white',
            align: 'center'
        });
        this.title.anchor.setTo(0.5);

        this.intro = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY-100, 'WASD + click to shoot', {
            font: '24px Tahoma',
            fill: 'white',
            align: 'center'
        });
        this.intro.anchor.setTo(0.5);

        this.start = new TextButton({
            game: this.game,
            x: this.game.world.centerX,
            y: this.game.world.centerY,
            asset: 'button',
            overFrame: 2,
            outFrame: 1,
            downFrame: 0,
            upFrame: 1,
            label: 'Start',
            style: {
                font: '16px Verdana',
                fill: 'white',
                align: 'center'
            }
        });

        // this.btnOverSound = this.add.sound('menuOver');
        // this.btnOutSound = this.add.sound('menuOut');
        // this.btnDownSound = this.add.sound('menuDown');

        // this.start.setOverSound(this.btnOverSound);
        // this.start.setOutSound(this.btnOutSound);
        // this.start.setDownSound(this.btnDownSound);

        this.start.onInputUp.add(()=>{
            // this.music.stop();
            this.state.start('Play');
            //kill three js view
            $(_ThreeUI).remove(); 
        });

        this.menuPanel = this.add.group();
        this.menuPanel.add(this.title);
        this.menuPanel.add(this.start);
        this.menuPanel.add(this.intro);

        // this.music.loopFull();
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





