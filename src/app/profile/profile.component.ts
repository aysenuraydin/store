import { Component } from '@angular/core';
import { AdressItem } from '../models/adressItem';
import { User } from '../models/user';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { AdressItemService } from '../services/adress.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styles: [` `]
})
export class ProfileComponent {
  buttonVisible:number = 2;
  adressVisible:boolean = false;
  cartVisible:boolean = false;

  adressItem: AdressItem = new AdressItem();
  adressItems: AdressItem[] = [];

  user:User = new User();
  userPassword:{password:string; newpassword1:string; newpassword2:string} = {password:'', newpassword1:'', newpassword2:''};

  constructor(
    private adressItemService: AdressItemService,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUser();
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
  getUser() :void {
    this.userService.getUserAccount()
    .subscribe( (data) => {
        if(data) this.user = data
      }
    )
  }
  updateUser(user:User) :void {
    this.userService.updateUser(user)
      .subscribe( (data) => data )
  }
  changePassword(userPassword: { password: string; newpassword1: string; newpassword2: string }): void {
    this.userPassword = { password: '', newpassword1: '', newpassword2: '' };
    if (userPassword.newpassword1 !== userPassword.newpassword2) return;

    this.userService.getUserAccount().pipe(
      switchMap((data) => {
        if (data?.password != userPassword.password)  return EMPTY;

        data.password = userPassword.newpassword1;
        return this.userService.updateUser(data);
      })
    ).subscribe((data)=> data );
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
        this.addAdressWindow(false);
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
