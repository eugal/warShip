export default class Cube {
    constructor() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0x000000});

        this.mesh = new THREE.Mesh( geometry, material );
        this.wireframe = new THREE.WireframeHelper(this.mesh, 0xc39e6d);
    }

    place(scene) {
        scene.add(this.mesh);
        scene.add(this.wireframe);
    }

    render() {

     // $('.title').click(function(){
     //     newRotSpeed++;
     //     console.log(newRotSpeed);
     // })

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }
}
