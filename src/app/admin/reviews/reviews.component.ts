import { Component } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/reiew.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  buttonVisible:boolean = true;
  reviews:Review[]= [];
  review: Review = new Review();

    constructor( private reviewService: ReviewService ) {}

    ngOnInit(): void {
      this.getReviews();
    }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getReviews(): void{
    this.reviewService.getReviews()
        .subscribe(
          (data) => {
            this.reviews = data.reverse().slice(0,10);
        }
      );
  }
  getReview(id:number):void{
    this.reviewService.getReview(id)
    .subscribe(
      (data) => {
        this.review = data;
      }
    );
  }
  updateReview(review:Review):void{
    review.isConfirmed=!review.isConfirmed;
    this.reviewService.updateReview(review)
    .subscribe(() => {
      this.getReviews();
      this.cancel();
    });
  }
  deletReview(id:number):void{
    this.reviewService.deleteReview(id)
    .subscribe(() => {
      this.getReviews();
      this.cancel();
    });
  }
  cancel():void{
    this.review = new Review();
  }
}

