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
  isAuthenticated= false;
  roleId:number = 0;
  username:string = "";

  constructor(
    private router: Router,
    public authService: AuthService,
    private categoryService: CategoryService
  ){ }

  ngOnInit(): void {
    this.getCategories();
    this.getAuthenticated();
    this.getUser();

  }
  getAuthenticated(){
    this.isAuthenticated=this.authService.isAuthenticated();
    if(this.isAuthenticated) this.getUser();
    else {
      this.roleId = 0;
      this.username = "";
    }
  }
  logout(): void {
    this.authService.logout();
    this.getAuthenticated();
    this.router.navigate(['/account/login']);
  }
  getCategories(): void{
    this.categoryService.getCategories()
        .subscribe(
          (data) => {
            this.categories = data;
        }
      );
  }
  getUser(): void{
    const user = this.authService.getUser();
    this.username = `${user?.name} ${user?.surname}`;
    this.roleId = user?.roleId ?? 0;
  }
}

