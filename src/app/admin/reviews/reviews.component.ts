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
  pageNumber:number = 1;
  pageSize:number = 4;
  pageTotal:number = 1;

  constructor( private reviewService: ReviewService ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  Search() {
    this.pageNumber=1;
    this.getQueryReviews();
  }
  onInputChange(event: Event) {
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryReviews();
  }
  Clear() {
    this.pageNumber=1;
    this.search = "";
    this.getReviews();
  }
  getQueryReviews(): void{
      this.reviewService.searchReviews(this.search,this.pageNumber, this.pageSize)
          .subscribe(
            (data) => {
              this.reviews = data.reviews;
              this.pageTotal = data.totalPages;
          }
        );
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getReviews(): void{
    this.reviewService.getReviewsWithUserAndProduct(this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.toggleWindow(false);
            this.reviews = data.reviews
            this.pageTotal = data.totalPages;
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getReviews();
    else this.getQueryReviews();
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

