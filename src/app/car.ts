
export class Car {

  private game: Phaser.Game;
  private body: Phaser.Circle;
  private frontSensors: Array<Phaser.Line>;


  constructor(game: Phaser.Game) {
    let inc = 0;
    this.game = game;
    this.body = new Phaser.Circle(game.world.centerX, game.world.centerY, 20);
    this.frontSensors = new Array(9);
    this.frontSensors.forEach((sensor: Phaser.Line) => {
      sensor = new Phaser.Line(this.body.x + this.body.diameter / 2, this.body.y, this.body.x + 50, this.body.y);
      sensor.fromAngle(sensor.x, sensor.y, ++inc, 50 );
    });
  }

  public draw() {
    this.game.debug.geom(this.body, '#cfffff');
    this.frontSensors.forEach((sensor: Phaser.Line) => {
      this.game.debug.geom(sensor, '#43dfff');
    });
  }


  getSensorsDistance(line: Phaser.Line): Array<number> {

    const distances: number[] = [];

    this.frontSensors.forEach((s: Phaser.Line) => {
      const p = s.intersects(line, true);
      if (p) {
         distances.push(s.start.distance(p));
         return;
      }
      distances.push(80);
    });

    return distances;
  }


  moveUp() {
    this.body.setTo(this.body.x, this.body.y - 10, this.body.diameter);
    this.updateSensors();
  }


  moveDown() {
    this.body.setTo(this.body.x, this.body.y + 10, this.body.diameter);
    this.updateSensors();
  }


  moveLeft() {
    this.body.setTo(this.body.x - 10, this.body.y, this.body.diameter);
    this.updateSensors();
  }


  moveRight() {
    this.body.setTo(this.body.x + 10, this.body.y, this.body.diameter);
    this.updateSensors();
  }


  updateSensors() {

    let inc = 0;
    this.frontSensors.forEach((sensor: Phaser.Line) => {
      sensor = new Phaser.Line(this.body.x + this.body.diameter / 2, this.body.y, this.body.x + 50, this.body.y);
      sensor.fromAngle(sensor.x, sensor.y, ++inc, 50 );
    });

  }
}
