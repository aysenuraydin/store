import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styles: [``]
})
export class CategoriesComponent {
  @Output() categoryId = new EventEmitter<number>();
  @Input() params: string | undefined;
  categories: Category[] = [];
  activeId:number = 0;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.activeId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCategories();
  }
  clickCategory(id: number){
    this.activeId=id;
    this.categoryId.emit(id);
  }
  getCategories(): void{
    this.categoryService.getAllCategories()
        .subscribe(
          (data) => {
            this.categories = data;
        }
      );
  }
  colorOpacity(hex: string="") {
    return hex+'30';
  }
}
