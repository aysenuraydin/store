import { Injectable } from '@angular/core';
import { Banner } from '../models/banner';
import { BannerRepository } from '../repository/banner.repository';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
    private dataSource: BannerRepository;
    private banners: Banner[];

    constructor() {
      this.dataSource = new BannerRepository();
      this.banners = new Array<Banner>();

      this.dataSource.getBanners().forEach(p => this.banners.push(p));
    }

    getBanners() :Banner[] {
      return this.banners.reverse();
    }

    getBanner(id:number) :Banner | undefined {
      return this.banners.find(i=>i.id==id);
    }
    getActiveBanner() :Banner {
      return this.banners.find(i=>i.isActive)?? new Banner();
    }
    getDisableBanners() :Banner[] {
      return this.banners.filter(i=>!i.isActive).reverse();
    }

    createBanner(banner: Banner): void{
      banner.id=(this.banners.at(-1)?.id?? 0) + 1;

      if(banner.isActive){
        this.getActiveBanner().isActive = false;
      };
      this.banners.push(banner);
    }
    updateBanner(banner: Banner): void {
      const index = this.banners.findIndex(p => p.id === banner.id);

      if(banner.isActive && banner != this.getActiveBanner()){
        this.getActiveBanner().isActive = false;
      };

      if (index !== -1) {
        this.banners[index] = banner;
      }
    }
    deleteBanner(id: number): void {
      if(this.getActiveBanner().id === id){
        return;
      }
      const index = this.banners.findIndex(p => p.id === id);
      if (index !== -1) {
        this.banners.splice(index, 1);
      }
    }
}

