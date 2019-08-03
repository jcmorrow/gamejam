var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            plugins: {
                attractors: true
            }        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
const Matter = Phaser.Physics.Matter.Matter;
let THETA = 0;

let spacebar;

function gravity(bodyA, bodyB) {
    var bToA = Matter.Vector.sub(bodyB.position, bodyA.position),
        distanceSq = Matter.Vector.magnitudeSquared(bToA) || 0.0001,
        normal = Matter.Vector.normalise(bToA),
        magnitude = -0.001 * (bodyA.mass * bodyB.mass / distanceSq),
        force = Matter.Vector.mult(normal, magnitude);

    // only apply force to our ship, which I guess is always bodyB
    Matter.Body.applyForce(bodyB, bodyB.position, force);
    if (bodyB.id == 9) {
        Matter.Body.rotate(bodyB, Math.PI * .001);
    }
}

function preload() {
    this.load.image('big_fire_planet', 'assets/big_fire_planet.png');
    this.load.image('earth', 'assets/earth.png');
    this.load.image('medium_earth', 'assets/medium_earth.png');
    this.load.image('small_brown_planet', 'assets/small_brown_planet.png');
    this.load.image('green_planet', 'assets/green_planet.png');
    this.load.image('brown_planet', 'assets/brown_planet.png');
    this.load.image('planet', 'assets/black_back_72px_planet.png');
    this.load.image('ship', 'assets/smallship.png');
    this.load.image('bg', 'assets/bg.png');
}

function create() {
    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.matter.world.engine.world.gravity.y = 0;
    this.add.image('bg', 800, 600);

    let graphics = this.add.graphics({
        lineStyle: { color: 0xff00ff },
        fillStyle: { color: 0xffffff }
    });

    // this.cameras.main.setSize(800, 300);

    this.planet = this.matter.add.image(400, 300, 'earth');
    this.planet2 = this.matter.add.image(500, 100, 'green_planet', null, {
        shape: {
            type: 'circle',
            radius: 37
        },
        plugin: {
            attractors: [gravity]
        },
        mass: 150
    });
    this.planet3 = this.matter.add.image(100, 500, 'brown_planet', null, {
        shape: {
            type: 'circle',
            radius: 37
        },
        plugin: {
            attractors: [gravity]
        },
        mass: 300
    });
    this.planet4 = this.matter.add.image(650, 450, 'big_fire_planet', null, {
        shape: {
            type: 'circle',
            radius: 50
        },
        plugins: {
            attractors: [gravity]
        },
        mass: 500
    })

    this.planet.body.isStatic = true;
    this.planet2.body.isStatic = true;
    this.planet3.body.isStatic = true;
    this.planet4.body.isStatic = true;
    this.planet.body.mass = 0;
    this.planet2.body.mass = 0;
    this.planet3.body.mass = 0;
    this.planet4.body.mass = 0;

    this.ship = this.matter.add.image(350, 300, 'ship', {
        plugin: {
            attractors: [gravity]
        }
    });

    // this.ship.body.isStatic = true;
    console.log(this.ship)


    // this.cameras.main.startFollow(ship);
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    graphics.strokeCircleShape(this.planet);
    graphics.fillCircleShape(this.planet);
}

function update() {
    // console.log(this.ship.body.angle);
    // THETA += 0.05;
    // this.ship.setVelocityX(Math.cos(THETA) * .1);
    // this.ship.setVelocityY(Math.sin(THETA) * .1);

    // var cos = Math.cos(THETA),
    //   sin = Math.sin(THETA);
    //
    // var dx = this.ship.body.position.x - this.planet.x,
    //   dy = this.ship.body.position.y - this.planet.y;
    //
    // this.ship.setPosition({
    //   x: point.x + (dx * cos - dy * sin),
    //   y: point.y + (dx * sin + dy * cos)
    // });
    //
    // this.ship.setRotation(body, rotation);

    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        this.ship.body.isStatic = false;
        this.planet2.body.mass = 150;
        this.planet3.body.mass = 300;
        this.planet4.body.mass = 500;
    }

    // TODO: cap time at whenever thrust meter is full
    if (Phaser.Input.Keyboard.DownDuration(spacebar, 100000000)) {
        // for whatever reason, the default angle of the ship points right, so by thusting left,
        // we're going straight
        this.ship.thrustLeft(.00005);
    }
};
