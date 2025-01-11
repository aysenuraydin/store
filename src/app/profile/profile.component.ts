import { Component } from '@angular/core';
import { AdressItem } from '../models/adressItem';
import { AdressItemService } from '../services/adress.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  buttonVisible:number = 1;
  adressVisible:boolean = false;
  cartVisible:boolean = false;

  adressItem: AdressItem = new AdressItem();
  adressItems: AdressItem[] = [];

  constructor(
    private adressItemService: AdressItemService
  ) { }

  ngOnInit(): void {
    this.getAdressItems();
  }

  toggleWindow(value:number) :void {
    this.buttonVisible = value;
  }
  addAdressWindow(value:boolean) :void {
    this.adressVisible = !value;
  }
  addCartWindow(value:boolean) :void {
    this.cartVisible = !value;
  }

  getAdressItems(): void{
    this.adressItemService.getAdressItems()
        .subscribe(
          (data) => {
            this.adressItems = data.reverse().slice(0,10);
        }
      );
  }

  editAdress(id:number):void{
    this.adressItemService.getAdressItem(id)
    .subscribe(
      (data) => {
        this.adressItem = data;
      }
    );
  }

  saveAdressItem(adress:AdressItem):void{
    adress.id
      ? this.updateAdressItem(adress)
      : this.createAdressItem(adress);

      this.cancel();
  }
  createAdressItem(adress: AdressItem): void {
    this.adressItemService.createAdressItem(adress).subscribe(() => {
      this.getAdressItems();
    });
  }
  updateAdressItem(adress:AdressItem):void{
    this.adressItemService.updateAdressItem(adress).subscribe(() => {
      this.getAdressItems();
    });
  }
  deleteAdressItem(id:number):void{
    this.adressItemService.deleteAdressItem(id).subscribe(() => {
      this.getAdressItems();
      this.cancel();
    });
  }
  cancel():void{
    this.adressItem = new AdressItem();
  }

}
