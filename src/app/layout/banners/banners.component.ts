import { Component } from '@angular/core';
import { Banner } from '../../models/banner';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'banners',
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.css'
})
export class BannersComponent {
  banner: Banner = new Banner();

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.banner = this.bannerService.getActiveBanner();
  }

  getSlider():Banner{
    return this.bannerService.getActiveBanner();
  }
}
