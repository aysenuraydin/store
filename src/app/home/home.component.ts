import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ProductList } from '../models/productList';
import { FavService } from '../services/fav.service';
import { forkJoin, map, switchMap }from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styles: [``]
})
export class HomeComponent {
  products: ProductList[] = [];
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private favService: FavService,
    private router: Router,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void{
    this.categoryService.getCategories().subscribe(
      d=> this.categories =d
    )
  }

  loadProducts() {
    this.router.navigate(['/products'], {
      queryParams: {
        page: 1
      }
    });
  }

  getProducts(): void{
    this.productService.getProductItems()
        .subscribe(
          (data) => {
            this.products = data;
        }
      );
  }

      // this.route.queryParamMap.subscribe(params=> {
    //   console.log(params);
    // });

    // let page = this.route.snapshot.queryParamMap.get('page');
    // console.log(page);

    // let id = +this.route.snapshot.paramMap.get('id');
    // this.selectedProduct = products.find(i => i.id === id);

    // constructor(private route: ActivatedRoute)
    // this.route.paramMap
    // .subscribe(params=> {
    //   let id = +params.get('id');
    //   this.selectedProduct = products.find(i=>i.id===id);
    // })
  // loadPages() {
  //   this.router.navigate(['/products'], {
  //     queryParams: {
  //       page: 1
  //     }
  //   });
  // }

  // loadPages() {
  //   this.router.navigate(['/products']);
  // }
}
