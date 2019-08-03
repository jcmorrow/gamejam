function preload() {
    this.load.image('planet', 'black_planet.jpeg');
}

function create() {
    this.state = { pointer: {}, theta: 0 };
    this.planets = [
        {
            x: 300, y: 300, radius: 50
        }
    ]

    this.graphics = this.add.graphics(0, 0);
    this.matter.add.image(500, 100, 'planet', null, {
        shape: {
            type: 'circle',
            radius: 64
        }
    });
    this.input.on('pointermove', function (pointer) {

        let v = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
        this.state.pointer = { x: v.x, y: v.y };

    }, this);
}

function update() {
    this.graphics.destroy();
    this.graphics = this.add.graphics(0, 0);

    this.planets.forEach((p) => {
        this.matter.add.circle(p.x, p.y, p.radius);
        this.graphics.fillStyle(0xFFFFFF, 1.0);
        this.graphics.fillCircle(p.x, p.y, p.radius);
    });

    this.graphics.fillStyle(0xFFFFFF, 1.0);
    let shipX = this.planets[0].x + Math.cos(this.state.theta) * 110;
    let shipY = this.planets[0].y + Math.sin(this.state.theta) * 110;

    this.graphics.fillCircle(shipX, shipY, 10);
    this.state.theta = this.state.theta + 0.05;

    // this.graphics.lineStyle(5, 0xFF00FF, 1.0);
    // this.graphics.beginPath();
    // this.graphics.moveTo(this.planets[0].x, this.planets[0].y);
    // this.graphics.lineTo(
    //     (this.state.pointer.x - this.planets[0].x) * 100,
    //     (this.state.pointer.y - this.planets[0].y) * 100
    // );
    // this.graphics.closePath();
    // this.graphics.strokePath();
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        // arcade: {
        //     gravity: { y: 0 }
        // }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
