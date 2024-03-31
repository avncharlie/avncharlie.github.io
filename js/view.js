// get canvas and size to window
let canvas = document.getElementById('outCanvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// with 20 on angle
let camera = new Camera({
    position: new Coord(35, -35, 35),
    rotation: new Rotation(0, 0, 0),
    distance: 1,
    scale: 1000
});
camera.look_at(new Coord(0, 0, -0)); 

// set up camera interactivity
camera.set_draggable({ element: window, drag_degrees: Rotation.to_radians(400) });
camera.set_scrollable({ element: window, scroll_amount: 40 });
camera.set_WASD_controls({ angle: Rotation.to_radians(5) });

// create world
let world = new World({
    objects: [],
    camera: camera,
    canvas_ctx: ctx
});

// render loop
function display() {
    // animation
    world.render({clear_screen: true});
    requestAnimationFrame(display);
}
display();

let gun = '......................................\n' +
          '.........................#............\n' +
          '.......................#.#............\n' +
          '.............##......##............##.\n' +
          '............#...#....##............##.\n' +
          '.##........#.....#...##...............\n' +
          '.##........#...#.##....#.#............\n' +
          '...........#.....#.......#............\n' +
          '............#...#.....................\n' +
          '.............##.......................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n' +
          '......................................\n';


let rand_conway = Conway.random(30, 30).to_string();
let conway_grid = new Conway3d(world, rand_conway, 20, 75);

camera.position = new Coord(35, -35, 35);
camera.look_at(new Coord(0, 0, 0)); 
conway_grid.play();

setInterval(function () {
    conway_grid.world.camera.rotate_camera(0, 0.01);
}, 50);

// side view
function view_side() {
    camera.position = new Coord(35, -35, 35);
    camera.look_at(new Coord(0, 0, 0)); 
}

// top view
function view_top() {
    camera.position = new Coord(0.001, -0.001, 60);
    camera.look_at(new Coord(0, 0, -0)); 
}

let curr_view_is_top = false;

// switch views with c
window.addEventListener('keypress', function(event) {
    if (event.code == 'KeyC') {
        if (curr_view_is_top)
            view_side();
        else
            view_top();
        curr_view_is_top = !curr_view_is_top;
    } else if (event.code == 'KeyR') {
        location.reload();
    }
});

