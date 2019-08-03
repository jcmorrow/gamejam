var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            plugins: {
                attractors: true
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
const Matter = Phaser.Physics.Matter.Matter;

function gravity(bodyA, bodyB) {
    var bToA = Matter.Vector.sub(bodyB.position, bodyA.position),
        distanceSq = Matter.Vector.magnitudeSquared(bToA) || 0.0001,
        normal = Matter.Vector.normalise(bToA),
        magnitude = -0.1 * (bodyA.mass * bodyB.mass / distanceSq),
        force = Matter.Vector.mult(normal, magnitude);

    // only apply force to our ship, which I guess is always bodyB
    // Matter.Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
    Matter.Body.applyForce(bodyB, bodyB.position, force);
}

function preload() {
    this.load.image('planet', 'black_planet.jpeg');
}

function create() {
    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.matter.world.engine.world.gravity.y = 0;

    let graphics = this.add.graphics({
        lineStyle: { color: 0xff00ff },
        fillStyle: { color: 0xffffff }
    });

    let planet = new Phaser.Geom.Circle(400, 300, 20);

    let planet2 = this.matter.add.image(500, 100, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 60
        },
        plugin: {
            attractors: [gravity]
        },
        mass: 100
    });

    let planet3 = this.matter.add.image(100, 500, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 60
        },
        plugin: {
            attractors: [gravity]
        },
        mass: 200
    });

    planet2.body.isStatic = true;
    planet3.body.isStatic = true;

    let ship = this.matter.add.circle(200, 50, 10, {
        plugin: {
            attractors: [gravity]
        }
    });

    graphics.strokeCircleShape(planet);
    graphics.fillCircleShape(planet);
}

function update() {

};
