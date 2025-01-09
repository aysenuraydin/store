import { Component } from '@angular/core';
import { Banner } from '../../models/banner';
import { BannerService } from '../../services/banner.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
    banner: Banner = new Banner();
    banners: Banner[] = [];
    disableBanners: Banner[] = [];
    activeBanner: Banner = new Banner();
    buttonVisible:boolean = true;

    constructor(private bannerService: BannerService) { }

    ngOnInit(): void {
      this.getBanners();
    }

    toggleWindow(value:boolean) :void {
      this.buttonVisible = !value;
      this.cancel();
    }
    getBanners(): void {
      forkJoin({
        active: this.bannerService.getActiveBanner(),
        disabled: this.bannerService.getDisableBanners(),
      }).subscribe(({ active, disabled }) => {
        const activeBanners = active;
        const disableBanners = disabled.reverse().slice(0, 9);
        this.banners = [activeBanners, ...disableBanners];
      });
    }
    editBanner(id: number): void {
      this.bannerService.getBanner(id)
      .subscribe(
        (data) => {
          this.banner = data;
        }
      );
    }
    getActiveBanner(): void {
      this.bannerService.getActiveBanner()
      .subscribe(
        (data) => {
          this.activeBanner = data;
        }
      );
    }
    getDisableBanners():  void {
      this.bannerService.getDisableBanners()
        .subscribe(
          (data) => {
            this.disableBanners = data.reverse().slice(0,9);
        }
      );
    }
    saveBanner(banner:Banner):void{
      banner.id
        ? this.updateBanner(banner)
        : this.createBanner(banner);
        this.cancel();
    }
    createBanner(banner: Banner): void {
      this.bannerService.createBanner(banner).subscribe(() => {
        this.getBanners();
      });
    }
    updateBanner(banner:Banner):void{
      this.bannerService.updateBanner(banner).subscribe(() => {
      this.getBanners();
      });
    }
    deleteBanner(id: number): void {
      this.bannerService.deleteBanner(id).subscribe();
      this.getBanners();
      this.cancel();
    }
    cancel():void{
      this.banner = new Banner();
    }
    activedBanner(event: Event, b: Banner){
      if(this.activeBanner.id == b.id){
        event.preventDefault();
      }
    }

}
