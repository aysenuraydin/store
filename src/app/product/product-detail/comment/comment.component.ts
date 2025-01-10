import { Component, Input } from '@angular/core';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/reiew.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  buttonVisible:boolean = true;
  starCountValue:number = 0;
  inputdeger:number = 0;
  reviews:Review[]= [];
  review: Review = new Review();
  @Input() productId:number = 0;

  constructor( private reviewService: ReviewService ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  starCountMouseover(value:number) :void {
    this.starCountValue = value;
  }
  starCountClick() :void {
    this.inputdeger = this.starCountValue ;
    this.review.starCount = this.inputdeger ;
  }
  starCountMouseUp() :void {
    this.starCountValue = 0;
  }
  getReviews(): void{
    this.reviewService.getReviewsByProdurtId(this.productId)
        .subscribe(
          (data) => {
            this.reviews = data.reverse();
        }
      );
  }
    saveReview(review:Review):void{
      review.productId = this.productId;
      this.reviewService.createReview(review).subscribe(() => {
        this.cancel();
        this.getReviews();
      });
    }
  cancel():void{
    this.review = new Review();
    this.inputdeger = 0;
  }
}
