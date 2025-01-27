import { Component, ViewEncapsulation, type OnInit } from '@angular/core';
import { TestDataService } from './services/test-data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit  {
  // constructor(private testDataService: TestDataService) {}
  ngOnInit(): void {
    // this.uploadTestDatas();
  }

  // uploadTestDatas() {
  //   this.testDataService.uploadBannersToFirebase();
  //   this.testDataService.uploadAddressesToFirebase();
  //   this.testDataService.uploadAlertsToFirebase();
  //   this.testDataService.uploadCartItemsToFirebase();
  //   this.testDataService.uploadCategoriesToFirebase();
  //   this.testDataService.uploadFavItemsToFirebase();
  //   this.testDataService.uploadMessagesToFirebase();
  //   this.testDataService.uploadOrdersToFirebase();
  //   this.testDataService.uploadProductsToFirebase();
  //   this.testDataService.uploadRecentlyItemsToFirebase();
  //   this.testDataService.uploadReviewsToFirebase();
  //   this.testDataService.uploadRolesToFirebase();
  //   this.testDataService.uploadSlidersToFirebase();
  //   this.testDataService.uploadSubscribeToFirebase();
  //   this.testDataService.uploadFaqToFirebase()
  //   this.testDataService.uploadAboutToFirebase()
  //   this.testDataService.uploadİnfoToFirebase()
  //   this.testDataService.uploadSocialMediaToFirebase()
  //   this.testDataService.uploadUsersToFirebase();
  // }
}
