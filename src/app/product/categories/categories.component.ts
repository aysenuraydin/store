import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  category: Category[] = [];

  constructor(
    private categoryService: CategoryService,
  ) {  }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void{
    this.categoryService.getCategories()
        .subscribe(
          (data) => {
            this.category = data;
        }
      );
  }
  colorOpacity(hex: string="") {
    return hex+'30';
  }
}
