import { Component } from '@angular/core';
import {Car} from './car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  game: any;
  car: Car;
  walls: Phaser.Line[];
  cursors: any;

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.WEBGL, 'content',
      { create: this.create, update: this.update, render: this.render });
  }


  create() {
    this.game.stage.backgroundColor = '#124184';
    this.car = new Car(this.game);
    this.walls = new Array(4);
    this.walls.push(new Phaser.Line(10, 10, 790, 10));
    this.walls.push(new Phaser.Line(10, 10, 10, 590));
    this.walls.push(new Phaser.Line(10, 590, 790, 590));
    this.walls.push(new Phaser.Line(790, 590, 790, 10));
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }


  update() {

    if (this.cursors.left.isDown) {
      this.car.moveLeft();
      this.car.getSensorsDistance(this.walls);

    } else if (this.cursors.right.isDown) {
      this.car.moveRight();
      this.car.getSensorsDistance(this.walls);
    }


    if (this.cursors.up.isDown) {
      this.car.moveUp();
      this.car.getSensorsDistance(this.walls);

    } else if (this.cursors.down.isDown) {
      this.car.moveDown();
      this.car.getSensorsDistance(this.walls);
    }

  }


  render() {
    this.car.draw();
    this.walls.forEach((wall) => {
      this.game.debug.geom(wall, '#8ee279');
    });
  }

}
