// Default slider values
let alignmentWeight = 1.9;
let cohesionWeight = 1;
let separationWeight = 1;

// // Set up event listeners for the sliders
// document.getElementById('alignmentSlider').addEventListener('input', function(event) {
//     alignmentWeight = parseFloat(event.target.value);
// });
//
// document.getElementById('cohesionSlider').addEventListener('input', function(event) {
//     cohesionWeight = parseFloat(event.target.value);
// });
//
// document.getElementById('separationSlider').addEventListener('input', function(event) {
//     separationWeight = parseFloat(event.target.value);
// });
//


// Get canvas and size to window
let canvas = document.getElementById('outCanvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Initialize camera
let camera = new Camera({
    position: new Coord(500, -590, 500),
    rotation: new Rotation(0, 0, 0),
    distance: 1,
    scale: 3500
});

// let camera = new Camera({
//     position: new Coord(220, -190, 200),
//     rotation: new Rotation(0, 0, 0),
//     distance: 1,
//     scale: 1000
// });
camera.look_at(new Coord(0, 0, 0));

// Set up camera interactivity
camera.set_draggable({ element: window, drag_degrees: Rotation.to_radians(400) });
camera.set_scrollable({ element: window, scroll_amount: 40 });
camera.set_WASD_controls({ angle: Rotation.to_radians(5) });

// Function to manually create dashed lines for the boundary cube
function create_boundary_cube(world, size, dashLength = 5, gapLength = 5) {
    let half_size = size / 2;

    // Define the vertices for a wireframe cube
    let vertices = [
        new Coord(-half_size, -half_size, -half_size),
        new Coord(half_size, -half_size, -half_size),
        new Coord(half_size, half_size, -half_size),
        new Coord(-half_size, half_size, -half_size),
        new Coord(-half_size, -half_size, half_size),
        new Coord(half_size, -half_size, half_size),
        new Coord(half_size, half_size, half_size),
        new Coord(-half_size, half_size, half_size)
    ];

    // Define the edges for the wireframe (connect the vertices)
    let edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
        [4, 5], [5, 6], [6, 7], [7, 4], // Top face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Vertical edges
    ];

    // Function to draw dashed lines manually
    function draw_dashed_line(start, end, dashLength, gapLength) {
        let dx = end.x - start.x;
        let dy = end.y - start.y;
        let dz = end.z - start.z;
        let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        let num_dashes = Math.floor(distance / (dashLength + gapLength));
        
        let dash_dx = (dx / distance) * dashLength;
        let dash_dy = (dy / distance) * dashLength;
        let dash_dz = (dz / distance) * dashLength;

        let gap_dx = (dx / distance) * gapLength;
        let gap_dy = (dy / distance) * gapLength;
        let gap_dz = (dz / distance) * gapLength;

        for (let i = 0; i < num_dashes; i++) {
            let dash_start = new Coord(
                start.x + i * (dash_dx + gap_dx),
                start.y + i * (dash_dy + gap_dy),
                start.z + i * (dash_dz + gap_dz)
            );

            let dash_end = new Coord(
                dash_start.x + dash_dx,
                dash_start.y + dash_dy,
                dash_start.z + dash_dz
            );

            let line = new WorldObject({
                mesh: Mesh.meshes.line(dash_start, dash_end),
                position: new Coord(0, 0, 0),
                rotation: new Rotation(0, 0, 0)
            });
            world.objects.push(line);
        }
    }

    // Draw all edges of the cube with dashed lines
    edges.forEach(edge => {
        let start = vertices[edge[0]];
        let end = vertices[edge[1]];

        draw_dashed_line(start, end, dashLength, gapLength);
    });
}

// Function to create the boundary cube
// Create the world
let world = new World({
    objects: [],
    camera: camera,
    canvas_ctx: ctx
});

// Create boundary cube (size of the cube, in this case, 100 units)
create_boundary_cube(world, 150);

// Initialize boids and the world
let flock = new Flock(world, 500);

// Render loop
function display() {
    world.render({ clear_screen: true });
    flock.update();
    requestAnimationFrame(display);
}
display();

setInterval(function () {
    world.camera.rotate_camera(0, 0.001);
}, 10);
