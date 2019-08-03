var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // backgroundColor: '#FFFFFF',
    physics: {
        default: 'matter',
        // gravity: {
        //     // y: 0
        //     // scale: 0
        // },
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

function preload() {
    this.load.image('planet', 'black_planet.jpeg');
}

function create() {
    // this.state = { pointer: {}, theta: 0 };
    // this.planets = [
    //     {
    //         x: 300, y: 300, radius: 50
    //     }
    // ]

    // this.graphics = this.add.graphics(0, 0);
    // this.input.on('pointermove', function (pointer) {
    //
    //     let v = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
    //     this.state.pointer = { x: v.x, y: v.y };
    //
    // }, this);

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    // this.matter.world.engine.world.gravity.y = 0;
    let graphics = this.add.graphics({ lineStyle: { color: 0xff00ff } });
    let planet = new Phaser.Geom.Circle(400, 300, 50);
    let planet2 = this.matter.add.image(400, 200, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 35
        }
    });

    // let circle = this.matter.add.circle(200, 200, 50);

    graphics.strokeCircleShape(planet);
    graphics.lineStyle(1, 0x00ff00);
    graphics.lineBetween(planet.x, planet.y, planet.x + planet.radius, planet.y);
    graphics.strokeRect(planet.left, planet.top, planet.diameter, planet.diameter);

    this.matter.add.rectangle(300, 200, 100, 100, {
        chamfer: { radius: [90, 0, 0, 0] }
    });


    // this.matter.add.circle(600, 100, 50, {
    //     plugin: {
    //         attractors: [
    //             MatterAttractors.Attractors.gravity
    //         ]
    //     }
    // });
    // this.matter.add.circle(600, 100, 50, {
    //     plugin: {
    //         attractors: [
    //             function (bodyA, bodyB) {
    //                 return {
    //                     x: (bodyA.position.x - bodyB.position.x) * 0.000001,
    //                     y: (bodyA.position.y - bodyB.position.y) * 0.000001
    //                 }
    //             }
    //         ]
    //     }
    // });
}

function update() {
    // this.graphics.destroy();
    // this.graphics = this.add.graphics(0, 0);


    // this.planets.forEach((p) => {
    //     this.matter.add.circle(p.x, p.y, p.radius);
        // this.graphics.fillStyle(0xFF0FFF, 1.0);
        // this.graphics.fillCircle(p.x, p.y, p.radius);
    // });

    // this.graphics.fillStyle(0x00FFFF, 1.0);
    // let shipX = this.planets[0].x + Math.cos(this.state.theta) * 180;
    // let shipY = this.planets[0].y + Math.sin(this.state.theta) * 120;

    // this.graphics.fillCircle(shipX+60, shipY-20, 10);
    // this.state.theta = this.state.theta + 0.04;
};
