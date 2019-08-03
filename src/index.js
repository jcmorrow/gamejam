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

let spacebar;

function gravity(bodyA, bodyB) {
    var bToA = Matter.Vector.sub(bodyB.position, bodyA.position),
        distanceSq = Matter.Vector.magnitudeSquared(bToA) || 0.0001,
        normal = Matter.Vector.normalise(bToA),
        magnitude = -0.01 * (bodyA.mass * bodyB.mass / distanceSq),
        force = Matter.Vector.mult(normal, magnitude);

    // only apply force to our ship, which I guess is always bodyB
    Matter.Body.applyForce(bodyB, bodyB.position, force);
}

function preload() {
    this.load.image('planet', 'assets/black_back_72px_planet.png');
    this.load.image('ship', 'assets/smallship.png')
}

function create() {
    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.matter.world.engine.world.gravity.y = 0;

    let graphics = this.add.graphics({
        lineStyle: { color: 0xff00ff },
        fillStyle: { color: 0xffffff }
    });

    // this.cameras.main.setSize(800, 300);

    let planet = new Phaser.Geom.Circle(400, 300, 20);
    let planet2 = this.matter.add.image(500, 100, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 37
        },
        plugin: {
            attractors: [gravity]
        },
        mass: 150
    });
    let planet3 = this.matter.add.image(100, 500, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 37
        },
        plugin: {
            attractors: [gravity]
        },
        mass: 300
    });

    planet2.body.isStatic = true;
    planet3.body.isStatic = true;

    this.ship = this.matter.add.image(350, 300, 'ship', {
        plugin: {
            attractors: [gravity]
        }
    });

    this.ship.body.isStatic = true;


    // this.cameras.main.startFollow(ship);
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    graphics.strokeCircleShape(planet);
    graphics.fillCircleShape(planet);
}

function update() {
    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        this.ship.body.isStatic = false;
    }
};
