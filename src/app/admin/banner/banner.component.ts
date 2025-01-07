import { Component } from '@angular/core';
import { Banner } from '../../models/banner';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  banner: Banner = new Banner();
  class:string ="";

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
  }

  getBanners(): Banner[] {
    return this.bannerService.getBanners().reverse().slice(0,10);
  }
  getActiveBanner(): Banner {
    return this.bannerService.getActiveBanner();
  }
  getDisableBanners(): Banner[] {
    return this.bannerService.getDisableBanners().reverse().slice(0,9);
  }
  saveBanner(banner:Banner):void{
    banner.id
      ? this.bannerService.updateBanner(banner)
      : this.bannerService.createBanner(banner);

    this.cancel();
  }
  deleteBanner(id:number):void{
    this.bannerService.deleteBanner(id);
    this.cancel();
  }
  editBanner(id:number):void{
    this.banner = this.bannerService.getBanner(id)?? new Banner();
  }
  cancel():void{
    this.banner = new Banner();
  }
  activeBanner(event: Event, b: Banner){
    if(this.bannerService.getActiveBanner().id == b.id){
      event.preventDefault();
    }
  }
}
