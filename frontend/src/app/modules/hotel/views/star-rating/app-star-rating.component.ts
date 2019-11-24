import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-mat-star-rating',
  templateUrl: './app-star-rating.component.html',
  styleUrls: ['./app-star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppStarRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() starCount: number;
  @Input() color: string;
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    console.log(rating);
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
