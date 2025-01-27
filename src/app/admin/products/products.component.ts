import { Component } from '@angular/core';
import { ExtendedProduct, Product } from '../../models/product';
import { Category } from '../../models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styles: [``]
})
export class ProductsComponent {
  productsWithCategoriesName: ExtendedProduct [] = [];
  categories: Category [] = [];
  buttonVisible:boolean = true;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 6;
  pageTotal:number = 1;

  isSubmitted = false;

  productForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl(0,[Validators.required]),
    stockAmount: new FormControl(0,[Validators.required]),
    categoryId: new FormControl(0,[Validators.required]),
    isConfirmed: new FormControl(false),
    description: new FormControl(''),
    details: new FormControl(''),
    imgUrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    createdAt: new FormControl(new Date()),
    categoryName: new FormControl(''),
    categoryColor: new FormControl(''),
    categoryStyle: new FormControl(''),
    viewCount: new FormControl(0),
    action: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private categoryProductService: CategoryProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }
  Search() {
    this.pageNumber=1;
    this.getQueryProducts();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.pageNumber=1;
    this.getQueryProducts();
  }
  Clear() {
    this.search = "";
    this.pageNumber=1;
    this.getProducts();
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  onDescriptionChange(updatedDescription: string): void {
    this.description?.setValue(updatedDescription);
  }
  onDetailsChange(updatedDetails: string): void {
    this.details?.setValue(updatedDetails);
  }
  colorOpacity(color?: string) {
    return color ? `${color}33` : 'transparent';
  }
  onCategoryChange(event: Event): void {
    const selectedCategoryId = +(event.target as HTMLSelectElement).value;
    const selectedCategory = this.categories.find(c => c.id === selectedCategoryId);
    if(selectedCategory){
      this.categoryColor?.setValue(selectedCategory?.color);
    }

  }
  getCategories(): void{
    this.categoryProductService.getCategories()
        .subscribe(
          (data) => {
            this.categories = data;
        }
      );
  }
  getCategoryName(id: number): void {
    this.categoryProductService.getCategory(id).subscribe()
  }
  getProducts(){
    return this.categoryProductService
    .getProductsWithCategoryNames(this.pageNumber,this.pageSize)
    .subscribe(
      (data) => {
        this.productsWithCategoriesName = data.products;
        this.pageTotal = data.totalPages;
      }
    );
  }
  getQueryProducts(): void{
    this.categoryProductService.searchProducts(this.search,this.pageNumber,this.pageSize)
        .subscribe(
          (data) => {
            this.productsWithCategoriesName = data.products;
            this.pageTotal = data.totalPages;
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getProducts();
    else this.getQueryProducts();
  }
  editProduct(id: number): void {
    this.categoryProductService.getProductWithCategoryName(id)
    .subscribe(
      (data) => {
        console.log("img:::",data.imgUrl)
        this.productForm.patchValue({
          id:data.id,
          name:data.name,
          price:data.price,
          stockAmount:data.stockAmount,
          categoryId:data.categoryId,
          isConfirmed:data.isConfirmed,
          description:data.description,
          details:data.details,
          imgUrl:data.imgUrl?? 'https://dummyimage.com/600x500/ccc/aaa',
          createdAt:data.createdAt,
          categoryName: data.categoryName,
          categoryColor: data.categoryColor,
          categoryStyle: data.categoryStyle,
          viewCount: data.viewCount
        });
      }
    );
    this.toggleWindow(true);
  }
  saveProduct():void{
    if (this.productForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    switch(this.action){
      case 'add':
          this.createProduct()
          break;
      case 'edit':
        this.updateProduct()
            break;
      case 'delete':
          this.deleteProduct();
            break;
      default:
          break;
    }
  }
  createProduct(): void {
    this.productService.createProduct(this.productForm.value as Product)
    .subscribe(() => {
      this.getProducts();
      this.cancel();
    });
  }
  updateProduct():void{
    this.productService.updateProduct(this.productForm.value as Product)
    .subscribe(() => {
      this.getProducts();
      this.cancel();
    });
  }
  deleteProduct():void{
    this.productService.deleteProduct(this.productForm.value.id??0)
    .subscribe(() => {
      this.getProducts();
      this.cancel();
    });
  }
  cancel():void{
    this.isSubmitted = false;
    this.productForm.reset({
      id: 0,
      name:'',
      price:0,
      stockAmount:0,
      categoryId:0,
      isConfirmed:false,
      description:'',
      details:'',
      imgUrl:'https://dummyimage.com/600x500/ccc/aaa',
      createdAt: new Date(),
      action: '',
      categoryName:'',
      categoryColor: '',
      categoryStyle:''
    });
  }
  setAction(action: string) {
    this.productForm.get('action')?.setValue(action);
  }
  get action() {
    return this.productForm.get('action')?.value;
  }
  get hasValidId() {
    const id = this.productForm.get('id')?.value;
    return Number(id) > 0;
  }
  get validImg() {
    const img = this.productForm.get('imgUrl')?.value;
    return (img?.length?? 0 > 0 )? img :'https://dummyimage.com/600x500/ccc/aaa' ;
  }
  get id() {
    return this.productForm.get('id');
  }
  get name() {
    return this.productForm.get('name');
  }
  get imgUrl() {
    return this.productForm.get('imgUrl');
  }
  get price() {
    return this.productForm.get('price');
  }
  get stockAmount() {
    return this.productForm.get('stockAmount');
  }
  get categoryId() {
    return this.productForm.get('categoryId');
  }
  get isConfirmed() {
    return this.productForm.get('isConfirmed');
  }
  get description() {
    return this.productForm.get('description');
  }
  get details() {
    return this.productForm.get('details');
  }
  get descriptionValue(): string {
    return this.description?.value ?? '';
  }
  get detailsValue(): string {
    return this.details?.value ?? '';
  }
  get categoryName() {
    return this.productForm.get('categoryName');
  }
  get categoryColor() {
    return this.productForm.get('categoryColor');
  }
  get categoryStyle() {
    return this.productForm.get('categoryStyle');
  }
}

