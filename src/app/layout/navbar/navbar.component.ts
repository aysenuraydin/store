import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  categories: Category[] = [];
  showOrHide = true;
  constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService) { }

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

