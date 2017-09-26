const THREE = require('three');

var scene, camera, renderer;
var geometry, material, mesh;

const objects = [];
let t = 0;
let hero;

(async function superInit(){
    await init();
    animate();
})();
 
async function init() {
    const body = document.querySelector('body');
    body.style.margin = '0px';
    body.style.overflow = 'hidden';

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 1000;
    camera.rotation.x = 0.1;

    geometry = new THREE.BoxGeometry( 70, 70, 10 );
    // material = new THREE.MeshPhongMaterial( { color: 0xd5d5d5, wireframe: false } );

    var textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;
    const texture = await textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/4268-bump.jpg'/*, function(texture) {
        // apply the texture as a bump map
        
    }*/);
    material = new THREE.MeshPhongMaterial( {color: new THREE.Color( "#7899aa" ), bumpMap: texture} );

    for(let i = -50; i <= 50; i++){
        for(let j = -50; j <= 50; j++){
            let m = new THREE.Mesh( geometry, material )
            m.position.x = i * 75;
            // m.position.z = j * 300;
            m.position.y = j * 75;
            scene.add( m );
            m.rotation.x = Math.sin( i / 50) + (Math.random() - 0.5) * 0.25;
            m.rotation.y = Math.random() - 0.5;
            // objects.push( m );
        }
    }

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // directionalLight.castShadow = true;
    // scene.add( directionalLight );

    var light = new THREE.PointLight( 0xAAAAAA );
    light.position.set( 0, 0, 1000 );
    light.castShadow = true;
    scene.add( light );

    var light = new THREE.PointLight( 0xFFFFFF );
	light.position.set( 0, 0, -1000 );
    scene.add( light );
    
    material = new THREE.MeshPhongMaterial( {color: new THREE.Color( "#7833aa" ), bumpMap: texture} );
    hero = new THREE.Mesh( geometry, material );
    hero.position.z = 500;
    scene.add( hero );
}

function animate() {
    requestAnimationFrame( animate );

    camera.position.x = hero.position.x;
    camera.position.y = hero.position.y;
    // camera.lookAt(hero.position);

    renderer.render( scene, camera );
}

document.body.onkeydown = function({ key }){
    if (key === 'w'){
        hero.position.y += 100;
    } else if (key === 's'){
        hero.position.y -= 100;
    } else if (key === 'a'){
        hero.position.x -= 100;
    } else if (key === 'd'){
        hero.position.x += 100;
    }
}