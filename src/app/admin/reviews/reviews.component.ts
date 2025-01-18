import { Component } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/reiew.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styles: [``]
})
export class ReviewsComponent {
  buttonVisible:boolean = true;
  reviews:any[]= [];
  review: Review & { username: string; productName: string; productUrl: string } = Object.assign(
    new Review(),
    {
      username: '',
      productName: '',
      productUrl: ''
    }
  );
  search:string = "";

  constructor( private reviewService: ReviewService ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  Search() {
    this.getQueryReviews();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryReviews();
  }
  Clear() {
    this.search = "";
    this.getReviews();
  }
  getQueryReviews(): void{
      this.reviewService.searchReviews(this.search)
          .subscribe(
            (data) => {
              this.reviews = data;
          }
        );
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getReviews(): void{
    this.reviewService.getReviewsWithUserAndProduct()
        .subscribe(
          (data) => {
            this.toggleWindow(false);
            this.reviews = data.reverse().slice(0,10);
        }
      );
  }
  getReview(id:number):void{
    this.reviewService.getReviewWithUserAndProduct(id)
    .subscribe(
      (data) => {
        this.review = data;
      }
    );
    this.toggleWindow(true);
  }
  updateReview(review:Review):void{
    review.isConfirmed=!review.isConfirmed;
    this.reviewService.updateReview(review)
    .subscribe(() => {
      this.getReviews();
      this.cancel();
    });
  }
  deleteReview(id:number):void{
    this.reviewService.deleteReview(id)
    .subscribe(() => {
      this.getReviews();
      this.cancel();
    });
  }
  cancel():void{
    this.review = Object.assign(
      new Review(),
      {
        username: '',
        productName: '',
        productUrl: ''
      }
    );
  }
}

