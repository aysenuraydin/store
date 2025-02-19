import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Alert, ClassName, Color } from '../../models/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: [``]
})
export class NavbarComponent {
  activeId =3;
  categories: Category[] = [];
  showOrHide = true;
  message: string ="";
  search: string ="";
  isAuthenticated= false;
  searchVisible= false;
  cartVisible= false;
  favVisible= false;
  roleId:number = 0;
  username:string = "";

  constructor(
    private router: Router,
    public authService: AuthService,
    public alertService: AlertService,
    private categoryService: CategoryService
  ){ }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.username = user ? `${user.name} ${user.surname}` : '';
      this.roleId = user?.roleId ?? 0;
    });

    this.categoryService.currentCategory$.subscribe((categories) => {
      this.categories = categories
    });
  }
  logout(): void {
    let alert:Alert =  {
      className: ClassName.info,
      message:"You logged out",
      color: Color.blue
    }
    this.alertService.addAlert(alert);

    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

  Search(): void{
    if(this.search.length==0)this.searchVisible = !this.searchVisible;
    else{
      this.router.navigate(['product/product-list/0'], {
        queryParams: {
          query: this.search
        }
      });
      this.search = "";
    }
  }
  Close(): void{
    this.search = "";
    this.searchVisible=false;
  }
  clickFav(): void{
    this.cartVisible=true;
    this.favVisible=false;
  }
  clickCart(): void{
    this.favVisible=true;
    this.cartVisible=false;
  }
  changeCartVisible(value:boolean): void{
    this.cartVisible=value;
  }
  changeFavVisible(value:boolean): void{
    this.favVisible=value;
  }
  colorOpacity(hex: string="") {
    return hex+'30';
  }
}
