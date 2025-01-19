import { Component } from '@angular/core';
import { Banner } from '../../models/banner';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'banners',
  templateUrl: './banners.component.html',
  styles: [``]
})
export class BannersComponent {
  banner: Banner = new Banner();

    constructor(private bannerService: BannerService) { }

    ngOnInit(): void {
      this.bannerService.currentBanner$.subscribe((s) => {
        if(s!=null){
          this.banner = s
        }
      });
    }

  getActiveBanner(): void {
    this.bannerService.getActiveBanner()
    .subscribe(
      (data) => {
        this.banner = data;
      }
    );
  }
}
