/**
 * @file 
 * 3d conway
 * @author Alvin Charles <alvinjoycharles@gmail.com>
 */

/**
 * Conway's game of life. Grid initialised with all off.
 * @constructor
 * @param {number} height - height of grid
 * @param {number} width - width of grid
 */
function Conway(height, width) {
    this.grid = []

    for (let x = 0; x < height; x++) {
        let row = [];
        for (let y = 0; y < width; y++) {
            row.push(false);
        }
        this.grid.push(row)
    }
}

/**
 * Get cells around specified cell
 */
Conway.prototype.check_neighbourhood = function (x, y) {
    let check = [
        [x, y+1],
        [x+1, y],
        [x, y-1],
        [x-1, y],
        [x+1, y+1],
        [x+1, y-1],
        [x-1, y-1],
        [x-1, y+1]
    ]

    let neighbours = []

    // find neighbours in 2d grid
    for (let i = 0; i < check.length; i++) {
        let [nx, ny] = check[i]; 
        // check if in bounds
        if (nx >= 0 && nx < this.grid.length && ny >= 0 && ny < this.grid[0].length) {
            neighbours.push(this.grid[nx][ny]);
        }
    }

    return neighbours;
}

/**
 * Advance Conway simulation to next step
 */
Conway.prototype.next_step = function () {
    // clone grid to create next step
    let next = this.grid.map(x => x.slice());

    for (let x = 0; x < this.grid.length; x++) {
        for (let y = 0; y < this.grid[0].length; y++) {
            let neighbours = this.check_neighbourhood(x, y);
            let num_alive = neighbours.filter(x => x).length;

            if (this.grid[x][y]) {
                next[x][y] = false;
                if (num_alive == 2 || num_alive == 3)
                    next[x][y] = true;
            } else {
                next[x][y] = false;
                if (num_alive == 3)
                    next[x][y] = true;
            }
        }
    }

    this.grid = next;
}

/**
 * Build string representation of Conway game
 * @param {number} s - The side length of the cube
 * @returns {string}
 */
Conway.prototype.to_string = function () {
    let out = '';
    for (let x = 0; x < this.grid.length; x++) {
        let s = ''
        for (let y = 0; y < this.grid[0].length; y++)
            s += this.grid[x][y] ? '#' : '.';
        out += s + '\n';
    }
    return out;
}

/**
 * Generate Conway from string. String must be newline seperated. 
 * '.' = off, '#' = on
 * @param {number} s - The side length of the cube
 * @returns {Conway}
 */
Conway.from_string = function (str) {
    let s = str.split('\n');
    let grid = []
    for (let row = 0; row < s.length; row++) {
        let result = s[row].split('').map(s => s === '.' ? false : true);
        grid.push(result);
    }
    let c = new Conway(s.length, s[0].length);
    c.grid = grid;
    return c;
}


/**
 * Generate Conway grid randomly
 * @param {number} height - height of grid
 * @param {number} width - width of grid
 * @returns {Conway}
 */
Conway.random = function (height, width) {
    let grid = [];

    for (let x = 0; x < height; x++) {
        let row = [];
        for (let y = 0; y < width; y++) {
            row.push(Math.random() < 0.5);
        }
        grid.push(row);
    }

    let c = new Conway(height, width);
    c.grid = grid;
    return c;
}

/**
 * Conway 3d game
 * @constructor
 * @param {World} world - 3d world game will be placed in
 * @param {string} str - string representation of conway game to visualise
 * '.' = off, '#' = on, rows seperated by newlines
 * @param {number} cutoff_depth - depth at which generations stop
 * @param {number} speed - speed of updates
 */
function Conway3d(world, str, cutoff_depth, speed) {
    this.world = world;
    this.c = Conway.from_string(str);
    this.cutoff_depth = -cutoff_depth;
    this.speed = speed;

    this.display();
}

Conway3d.prototype.display = function() {
    let height = this.c.grid.length;
    let width = this.c.grid[0].length;

    // console.log(height, width);
    // console.log(height == width);

    // axis
    // let axis = new WorldObject({
    //     mesh: Mesh.meshes.axis(3),
    //     position: new Coord(0, 0, 0),
    //     rotation: new Rotation(0, 0, 0),
    // });
    // this.world.objects.push(axis);

    // create cubes
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            if (this.c.grid[x][y]) {
                let c = new WorldObject({
                    mesh: Mesh.meshes.cube(1),
                    position: new Coord(x - height/2, y - width/2, -this.cutoff_depth/2), 
                    rotation: new Rotation(0, 0, 0),
                });
                this.world.objects.push(c);
            }
        }
    }
}

Conway3d.prototype.increment = function() {
    let new_objs = [];

    for (let x = 0; x < this.world.objects.length; x++) {

        if (this.world.objects[x].mesh.vertices.length == 8) {

            if (this.world.objects[x].position.z > this.cutoff_depth/2) {

                this.world.objects[x].position = new Coord(
                    this.world.objects[x].position.x,
                    this.world.objects[x].position.y,
                    this.world.objects[x].position.z - 1,
                )

                new_objs.push(this.world.objects[x]);
            }
        }
    }
    this.world.objects = new_objs;

    this.display();
    this.c.next_step();
}

Conway3d.prototype.play = function() {
    let conway = this;
    setInterval(function () {
        conway.increment();
    }, conway.speed);
}

Conway3d.prototype._debug_increment = function() {
    console.log(this.c.to_string());
    this.c.next_step();
}

Conway3d.prototype._debug_play = function() {
    setInterval(() => this._debug_increment(), 75);
}
