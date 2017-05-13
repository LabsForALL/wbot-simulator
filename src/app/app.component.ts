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

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.WEBGL, 'content',
      { create: this.create, update: this.update, render: this.render });
  }

  create() {
    this.game.stage.backgroundColor = '#124184';
    this.car = new Car(this.game);
  }

  update() {
   this.car.update();
  }

  render() {
    this.car.draw();
  }

}
