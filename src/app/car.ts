
export class Car {

  private game: Phaser.Game;
  private body: Phaser.Circle;
  private sensor: Phaser.Line;
  private cursors: any;
  private wall: Phaser.Line;


  constructor(game: Phaser.Game) {
    this.game = game;
    this.body = new Phaser.Circle(game.world.centerX, game.world.centerY, 20);
    this.sensor = new Phaser.Line(this.body.x + this.body.diameter / 2, this.body.y, this.body.x + 80, this.body.y);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wall = new Phaser.Line(100, 100, 200, 200);
  }


  public update() {

    if (this.cursors.left.isDown) {
      this.moveLeft();
      this.updateSensor();
    } else if (this.cursors.right.isDown) {
      this.moveRight();
      this.updateSensor();
    }

    if (this.cursors.up.isDown) {
      this.moveUp();
      this.updateSensor();
    } else if (this.cursors.down.isDown) {
      this.moveDown();
      this.updateSensor();
    }


  }


  public draw() {
    this.game.debug.geom(this.body, '#cfffff');
    this.game.debug.geom(this.sensor, '#43dfff');
    this.game.debug.geom(this.wall, '#ffffa0');
  }


  updateSensor() {
    this.sensor.setTo(this.body.x + this.body.diameter / 2, this.body.y, this.body.x + 80, this.body.y);
  }


  getSensorDistance() {

    let distance = 200;

    let p = this.sensor.intersects(this.wall, true);

    if (p) {
      distance = this.sensor.start.distance(p);
    }

    return distance;

  }


  moveUp() {
    this.body.setTo(this.body.x, this.body.y - 10, this.body.diameter);
  }


  moveDown() {
    this.body.setTo(this.body.x, this.body.y + 10, this.body.diameter);
  }


  moveLeft() {
    this.body.setTo(this.body.x - 10, this.body.y, this.body.diameter);
  }


  moveRight() {
    this.body.setTo(this.body.x + 10, this.body.y, this.body.diameter);
  }

}
