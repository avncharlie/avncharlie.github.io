// Boid class
function Boid(world, position, velocity) {
    this.world = world;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = new Coord(0, 0, 0);
    this.max_speed = 3.5;
    this.max_force = 0.5;

    // Cube boundary (size of the cube)
    this.boundary_size = 75;

    // Create visual representation (a small cube)
    this.obj = new WorldObject({
        mesh: Mesh.meshes.cube(1),
        position: position,
        rotation: new Rotation(0, 0, 0),
    });
    this.world.objects.push(this.obj);
}

Boid.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.max_speed);
    this.position.add(this.velocity);
    this.acceleration = new Coord(0, 0, 0);  // Reset acceleration each cycle

    // Check boundaries and bounce back if necessary
    this.check_boundaries();

    // Update the visual object's position
    this.obj.position = this.position;
};

// Check boundaries and bounce the boid back if it hits the edge of the cube
Boid.prototype.check_boundaries = function() {
    let size = this.boundary_size;

    if (this.position.x > size) {
        this.position.x = size;
        this.velocity.x *= -1; // Bounce back
    } else if (this.position.x < -size) {
        this.position.x = -size;
        this.velocity.x *= -1;
    }

    if (this.position.y > size) {
        this.position.y = size;
        this.velocity.y *= -1;
    } else if (this.position.y < -size) {
        this.position.y = -size;
        this.velocity.y *= -1;
    }

    if (this.position.z > size) {
        this.position.z = size;
        this.velocity.z *= -1;
    } else if (this.position.z < -size) {
        this.position.z = -size;
        this.velocity.z *= -1;
    }
};

Boid.prototype.apply_force = function(force) {
    this.acceleration.add(force);
};

Boid.prototype.flock = function(boids) {
    let sep = this.separate(boids);   // Separation
    let ali = this.align(boids);      // Alignment
    let coh = this.cohesion(boids);   // Cohesion

    // Adjust forces by arbitrary weights
    // sep.multiply(1.9);
    // ali.multiply(0.6);
    // coh.multiply(0.6);   
    separationWeight = 1.9;
    alignmentWeight = 0.7;
    cohesionWeight = 0.7;
    // separationWeight = 1;
    // alignmentWeight = 1;
    // cohesionWeight = 1;
    sep = sep.multiply(separationWeight);  // Separation slider
    ali = ali.multiply(alignmentWeight);   // Alignment slider
    coh = coh.multiply(cohesionWeight);    // Cohesion slider

    this.apply_force(sep);
    this.apply_force(ali);
    this.apply_force(coh);
};

// Separation: Steer away from nearby boids
Boid.prototype.separate = function(boids) {
    let desired_separation = 3.0;
    let steer = new Coord(0, 0, 0);
    let count = 0;

    boids.forEach(other => {
        let d = this.position.distance_to(other.position);
        if (d > 0 && d < desired_separation) {
            let diff = this.position.subtract(other.position);
            diff.normalize();
            diff.divide(d);  // Weight by distance
            steer.add(diff);
            count++;
        }
    });

    if (count > 0) steer.divide(count);
    if (steer.magnitude() > 0) {
        steer.normalize();
        steer.multiply(this.max_speed);
        steer.subtract(this.velocity);
        steer.limit(this.max_force);
    }

    return steer;
};

// Alignment: Steer towards the average velocity of neighbors
Boid.prototype.align = function(boids) {
    let neighbor_dist = 10.0;
    let sum = new Coord(0, 0, 0);
    let count = 0;

    boids.forEach(other => {
        let d = this.position.distance_to(other.position);
        if (d > 0 && d < neighbor_dist) {
            sum.add(other.velocity);
            count++;
        }
    });

    if (count > 0) {
        sum.divide(count);
        sum.normalize();
        sum.multiply(this.max_speed);
        let steer = sum.subtract(this.velocity);
        steer.limit(this.max_force);
        return steer;
    }

    return new Coord(0, 0, 0);
};

// Cohesion: Steer towards the average position of neighbors
Boid.prototype.cohesion = function(boids) {
    let neighbor_dist = 10.0;
    let sum = new Coord(0, 0, 0);
    let count = 0;

    boids.forEach(other => {
        let d = this.position.distance_to(other.position);
        if (d > 0 && d < neighbor_dist) {
            sum.add(other.position);
            count++;
        }
    });

    if (count > 0) {
        sum.divide(count);
        return this.seek(sum);  // Steer towards the average position
    }

    return new Coord(0, 0, 0);
};

// Seek a target
Boid.prototype.seek = function(target) {
    let desired = target.subtract(this.position);
    desired.normalize();
    desired.multiply(this.max_speed);

    let steer = desired.subtract(this.velocity);
    steer.limit(this.max_force);
    return steer;
};

// Flock class
function Flock(world, num_boids) {
    this.world = world;
    this.boids = [];

    for (let i = 0; i < num_boids; i++) {
        let position = new Coord(
            Math.random() * 100 - 50,  // Random x between -50 and 50
            Math.random() * 100 - 50,  // Random y between -50 and 50
            Math.random() * 100 - 50   // Random z between -50 and 50
        );
        let velocity = new Coord(
            Math.random() * 2 - 1,     // Random x velocity between -1 and 1
            Math.random() * 2 - 1,     // Random y velocity between -1 and 1
            Math.random() * 2 - 1      // Random z velocity between -1 and 1
        );
        let boid = new Boid(world, position, velocity);
        this.boids.push(boid);
    }
}

Flock.prototype.update = function() {
    this.boids.forEach(boid => {
        boid.flock(this.boids);
        boid.update();
    });
};
