
export class Car {

  private game: Phaser.Game;
  private body: Phaser.Circle;
  private frontSensors: Array<Phaser.Line>;

  constructor(game: Phaser.Game) {
    this.game = game;
    this.body = new Phaser.Circle(game.world.centerX, game.world.centerY, 20);
    this.createFrontSensors();
  }

  createFrontSensors () {
    let sensorsAngle = -1;
    this.frontSensors = new Array(9);
    for (let i = 0; i < this.frontSensors.length; i++) {
      const s = new Phaser.Line(this.body.x + this.body.diameter / 2, this.body.y, this.body.x + 80, this.body.y);
      sensorsAngle += 0.2;
      s.fromAngle(s.x, s.y, sensorsAngle, 80);
      this.frontSensors[i] = s;
    }
  }


  public draw() {
    this.game.debug.geom(this.body, '#cfffff');
    for (let i = 0; i < this.frontSensors.length; i++) {
      this.game.debug.geom(this.frontSensors[i], '#43dfff');
    }
  }


  getSensorsDistance(walls: Phaser.Line[]): Array<number> {

    const distances = new Array(this.frontSensors.length);

    for (let i = 0; i < this.frontSensors.length; i++) {

      let iPoint = null;
      for (let k = 0; k < walls.length; k++) {
        iPoint = this.frontSensors[i].intersects(walls[k], true);
      }

      if (iPoint) {
        distances[i] = this.frontSensors[i].start.distance(iPoint);
        break;
      }

      distances[i] = 80;
    }

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
    for (let i = 0; i < this.frontSensors.length; i++) {
      const angle = this.frontSensors[i].angle;
      const len = this.frontSensors[i].length;
      this.frontSensors[i].fromAngle(this.body.x + this.body.diameter / 2, this.body.y, angle, len);
    }
  }
}
