import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: [``]
})
export class NavbarComponent {
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
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }
  // getCategories(): void{
  //   this.categoryService.getCategories()
  //       .subscribe(
  //         (data) => {
  //           this.categories = data;
  //       }
  //     );
  // }
  Search(): void{
    if(this.search.length==0)this.searchVisible = !this.searchVisible;
    else{
      this.router.navigate(['product/product-list'], {
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
}
