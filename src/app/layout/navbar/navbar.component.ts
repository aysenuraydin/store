import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void{
    this.categoryService.getCategories()
        .subscribe(
          (data) => {
            this.categories = data;
        }
      );
  }
}

