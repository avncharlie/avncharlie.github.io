// helper

function rand(min, max) {
    return Math.random() * (max - min) + min;
}


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
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

// 'what' sounds 
var what_sounds = [];

// what 1 
var request3 = new XMLHttpRequest();
request3.open("GET", './audio/what/what.mp3', true);
request3.responseType = "arraybuffer";
request3.onload = function() {
    audioCtx.decodeAudioData(request3.response, function(buffer) {
        what_sounds[0] = buffer;
    });
}
request3.send();

// what 2 
var request4 = new XMLHttpRequest();
request4.open("GET", './audio/what/what2.mp3', true);
request4.responseType = "arraybuffer";
request4.onload = function() {
    audioCtx.decodeAudioData(request4.response, function(buffer) {
        what_sounds[1] = buffer;
    });
}
request4.send();

// what 3
var request5 = new XMLHttpRequest();
request5.open("GET", './audio/what/what3.mp3', true);
request5.responseType = "arraybuffer";
request5.onload = function() {
    audioCtx.decodeAudioData(request5.response, function(buffer) {
        what_sounds[2] = buffer;
    });
}
request5.send();

// what 4
var request6 = new XMLHttpRequest();
request6.open("GET", './audio/what/what4.mp3', true);
request6.responseType = "arraybuffer";
request6.onload = function() {
    audioCtx.decodeAudioData(request6.response, function(buffer) {
        what_sounds[3] = buffer;
    });
}
request6.send();

// what 5
var request7 = new XMLHttpRequest();
request7.open("GET", './audio/what/what5.mp3', true);
request7.responseType = "arraybuffer";
request7.onload = function() {
    audioCtx.decodeAudioData(request7.response, function(buffer) {
        what_sounds[4] = buffer;
    });
}
request7.send();

// what 5
var request8 = new XMLHttpRequest();
request8.open("GET", './audio/what/what6.mp3', true);
request8.responseType = "arraybuffer";
request8.onload = function() {
    audioCtx.decodeAudioData(request8.response, function(buffer) {
        what_sounds[5] = buffer;
    });
}
request8.send();

function bouncePlaySound() {
    if (sound_enabled) {
        playSound(bounceSound);
    }
}

Events.on(engine, 'collisionStart', bouncePlaySound);

ball_moving_underway = false;

what_pictures = [
    'what.png',
    'what2.png',
    'what3.png',
    'what4.png',
    'what5.png'
]

lastPickedWhatPic = "";
lastPickedWhatAudio = "";

function checkBallOutside() {
    var outOfBounds = false;
    if (ewacircle.position.x > right.position.x) {
        outOfBounds = true;
    } else if (ewacircle.position.x < left.position.x) {
        outOfBounds = true;
    } else if (ewacircle.position.y > ground.position.y) {
        outOfBounds = true;
    } else if (ewacircle.position.y < ceiling.position.y) {
        outOfBounds = true;
    }

    if (outOfBounds && !ball_moving_underway) {
        ball_moving_underway = true;
        setTimeout(function () {
            Body.setPosition(ewacircle, {x: width/2, y: height/2});
            ball_moving_underway = false;
        }, 1200);

        var whatPic = document.getElementById("whatPicture");

        // pic random what pic (that is not the same as the last one)
        random_what_pic = what_pictures[Math.floor(Math.random()*what_pictures.length)];
        while (random_what_pic == lastPickedWhatPic) {
            random_what_pic = what_pictures[Math.floor(Math.random()*what_pictures.length)];
        }
        whatPic.src = './img/what/' + random_what_pic;
        lastPickedWhatPic = random_what_pic;

        whatPic.classList.add('notransition'); // Disable transitions

        // make what thing visible with no css change
        whatPic.style["opacity"] = '1';

        whatPic.offsetHeight; // Trigger a reflow, flushing the CSS changes
        whatPic.classList.remove('notransition'); // Re-enable transitions

        setTimeout(function() {
            // let it fade out (using re enabled css change), after 0.2 secs of staying still
            whatPic.style["opacity"] = '0';
        }, 200)

        random_what_sound = what_sounds[Math.floor(Math.random()*what_sounds.length)];
        while (random_what_sound == lastPickedWhatAudio) {
            random_what_sound = what_sounds[Math.floor(Math.random()*what_sounds.length)];
        }
        playSound(random_what_sound);
        lastPickedWhatAudio = random_what_sound;
    }
}

Events.on(engine, 'beforeUpdate', checkBallOutside);

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
    'alvo.JPG',
    'dafoe.JPG',
    'troublemaker.JPG',
    'thinktwice.JPG',
    'sop.JPG',
    'footemoji.JPG',
    'yestory.JPG',
    'naanbed.JPG',
    'cowstudy.JPG',
    'zekegirl.JPG',
    'kasiabuff.JPG',
    'tenilleGrin.JPG',
    'kasiapic.JPG',
    'ewanWatermelon.JPG',
    'charlieforehead.JPG',
    'daboys.JPG',
    'nickyoung.JPG',
    'nickSlick.JPG',
    'ethanFunny.PNG'
]


function changeBG() {
    image = images[Math.floor(Math.random()*images.length)];
    document.body.style['background-image'] = 'url(../ewan/img/backgrounds/' + image + ')';
}

// change background
setInterval(changeBG, 5000); 
