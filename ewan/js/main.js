// helper

function rand(min, max) {
    return Math.random() * (max - min) + min;
}


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

// create an engine
var engine = Engine.create({
});

// canvas element
var canvas = document.getElementById('outCanvas');

// get height and width
let height = window.innerHeight; 
let width = window.innerWidth; 

// create a renderer
var render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent'
    }
});

// create the ewacircle (ewan circle)
var ewacircle = Bodies.circle(width/2, height/2, 140, {
    label: 'ewacircle',
    restitution: 0.8, // bounce
    render: {
        fillStyle: 'red',
        strokeStyle: 'white',
        lineWidth: 3,
        sprite: {
            texture: './img/ewan.png',
            xScale: 0.9,
            yScale: 0.9,
        }
    }
});

var ewacircle2 = Bodies.circle(450, 500, 60, {
    restitution: 1 // bounce
});

var wallsWidth = 1000
var halfWW = (wallsWidth/2)-3;

// create walls on screen edges
var ground = Bodies.rectangle(width/2, height+halfWW, width, wallsWidth, { isStatic: true });
var ceiling = Bodies.rectangle(width/2, -halfWW, width, wallsWidth, { isStatic: true });
var right = Bodies.rectangle(width+halfWW, height/2, wallsWidth, height, { isStatic: true });
var left = Bodies.rectangle(-halfWW, height/2, wallsWidth, height, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [
    ewacircle,
    //ewacircle2,
    ground,
    ceiling,
    right,
    left,
]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(engine.world, mouseConstraint);


function randomGravity() {
    bounds = 3
    y = rand(-bounds, bounds);
    x = rand(-bounds, bounds);
    engine.world.gravity.y = y;
    engine.world.gravity.x = x;
}

// ball moving around crazy
setInterval(randomGravity, 1000); 

// do not autoplay
sound_enabled = false;

// create audio context
window.AudioContext = window.AudioContext||window.webkitAudioContext;
audioCtx = new AudioContext();

// play sound, using audio context
function playSound(buffer) {
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
}

// load sound files

// bounce sound
var bounceSound;
var request = new XMLHttpRequest();
request.open("GET", './audio/bounce.mp3', true);
request.responseType = "arraybuffer";
request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
        bounceSound = buffer;
    });
}
request.send();

// welcome sound
var welcomeSound;
var request2 = new XMLHttpRequest();
request2.open("GET", './audio/welcome.mp3', true);
request2.responseType = "arraybuffer";
request2.onload = function() {
    audioCtx.decodeAudioData(request2.response, function(buffer) {
        welcomeSound = buffer;
    });
}
request2.send();

function bouncePlaySound() {
    console.log('hi')
    if (sound_enabled) {
        playSound(bounceSound);
    }
}

Events.on(engine, 'collisionStart', bouncePlaySound);

soundButton = document.getElementById("startButton");
back = document.getElementById("back");

soundButton.addEventListener('click', function() {
    audioCtx.resume().then(() => {
        console.log('Playback resumed successfully');
    });
    sound_enabled = true;
    playSound(welcomeSound);
    soundButton.style.display = "none";
    back.style.opacity = "0";
    setInterval(function() {
        back.style.display = "none";
    }, 500);
})

images = [
    'hamster.JPG',
    'ye_meme.jpg',
    'no_maidens.JPG',
    'shaq_got_milk.JPG',
    'SIMP.JPG',
    'deb.JPG',
    'zek.JPG',
    'donke.JPG',
    'cat.JPG',
    'joe.JPG',
    'tenners.JPG',
    'alvo.JPG'
]


function changeBG() {
    image = images[Math.floor(Math.random()*images.length)];
    document.body.style['background-image'] = 'url(../ewan/img/' + image + ')';
}

// change background
setInterval(changeBG, 5000); 
