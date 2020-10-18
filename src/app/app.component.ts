import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  firstRandomNumber: number;
  secondRandomNumber: number;
  message: string;
  interval: any;
  displayAverageTiming: number;
  time = 0;
  solutions = 0;

  userInput = new FormControl('');

  ngOnInit() {
    this.initiateRandomMathGame();

    this.startTimer();

    this.userInput.valueChanges.pipe(debounceTime(1000)).subscribe(value => {           
      if(value !== '') {
          if(Number(value) == (this.firstRandomNumber + this.secondRandomNumber)) {     
            this.message = 'Kudos! Correct answer!'
            this.solutions++;

            this.getAverageTiming();

            setTimeout(() => {
              this.initiateRandomMathGame()
            }, 1000);

          } else {
            this.message = 'Wrong answer, try again!';

            setTimeout(() => {
                this.message = '';
            }, 1000);
          } 
        }
      })
  }

  initiateRandomMathGame() {
    this.firstRandomNumber = Math.floor(Math.random() * 10);
    this.secondRandomNumber =  Math.floor(Math.random() * 10);
    this.message = '';
    this.userInput.setValue('');
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
    }, 1000);
  }



  getAverageTiming() {
    if(this.solutions){
      this.displayAverageTiming = Math.round(Number(this.time) / this.solutions);
    }
  }

}
