import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

// import { EventEmitter, Input, Output, ViewEncapsulation, type OnInit } from '@angular/core';
// import { loadCKEditorCloud, type CKEditorCloudResult, type CKEditorCloudConfig } from '@ckeditor/ckeditor5-angular';

// import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';

// const LICENSE_KEY =
//   'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzYyOTQzOTksImp0aSI6IjVlMTEzZDM1LWU2MDYtNDBmZC1iYmE1LTAyOTdhODEwMjBlNCIsImxpY2Vuc2VkSG9zdHMiOlsiKi53ZWJjb250YWluZXIuaW8iLCIqLmpzaGVsbC5uZXQiLCIqLmNzcC5hcHAiLCJjZHBuLmlvIiwiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIiwic2giXSwibGljZW5zZVR5cGUiOiJldmFsdWF0aW9uIiwidmMiOiJiMDgyY2I1ZSJ9.zhHjCGIqUdPfwZil5J0fqDHdvQePXRzxLHkaZxu2LlubAxhoCeZeDWqbqIkkQffCH0VqXf528_e3g4d37kVs8A';

//   const cloudConfig = {
//     version: '44.1.0'
//   } satisfies CKEditorCloudConfig;

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  onDescriptionChange(updatedDescription: string): void {
    this.product.description = updatedDescription;
  }
  onDetailsChange(updatedDetails: string): void {
    this.product.details = updatedDetails;
  }


  getProducts(): Product[] {
    return this.productService.getProducts().reverse();
  }
  getProductsWithCategoriesName(){
    return this.productService.getProductsWithCategoryNames().reverse().slice(0,8);
  }
  getCategories(): Category[]{
    return this.categoryService.getCategories();
  }
  getCategoryName(categoryId: number): string {
    const category = this.getCategories().find(cat => cat.id == categoryId);
    return category ? category.name! : 'Unknown';
  }
  saveProduct(prd:Product):void{
    if(prd.id){
      this.productService.updateProduct(prd)
      // this.products = this.getProductsWithCategoriesName();
    }else{
      this.productService.createProduct(prd);
    }
    this.cancel();
  }
  deleteProduct(id:number):void{
    this.productService.deleteProduct(id);
    this.cancel();
  }
  editProduct(id:number):void{
    this.product = this.productService.getProduct(id)?? new Product();
  }
  cancel():void{
    this.product = new Product();
  }
  getCategoryStyle(id: number): { [key: string]: string } {
    if (!id) return {};
    const category = this.categoryService.getCategory(id);

    return {
      'background-color': category?.color!+'30',
      'color': category?.color!,
      'border-color': category?.color!,
      'border-width': '1px',
      'border-style': 'solid',
    };
  }


  // @Input() content: string = "";
  // @Output() contentChange = new EventEmitter<string>();
  // onContentChange(event: any): void {
  //   this.content = event.target.value;
  //   this.contentChange.emit(this.content);
  // }

  // public Editor: typeof ClassicEditor | null = null;
  // public config: EditorConfig | null = null;

  // public ngOnInit(): void {
  //   loadCKEditorCloud(cloudConfig).then(this._setupEditor.bind(this));
  // }

  // private _setupEditor(cloud: CKEditorCloudResult<typeof cloudConfig>) {
  //   const {
  //     ClassicEditor, Alignment, Autosave,Bold, Code,Essentials, FontBackgroundColor, FontColor, FontFamily,FontSize, GeneralHtmlSupport,Highlight,Indent, IndentBlock, Italic,List, Paragraph, RemoveFormat,SpecialCharacters,Strikethrough,Subscript,Superscript,TodoList, Underline
  //   } = cloud.CKEditor;

  //   this.Editor = ClassicEditor;
  //   this.config = {
  //     toolbar: {
  //       items: [
  //         'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', 'removeFormat', '|', 'specialCharacters', 'highlight', '|', 'alignment', '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
  //       ],
  //       shouldNotGroupWhenFull: false
  //     },
  //     plugins: [
  //       Alignment, Autosave, Bold, Code, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport, Highlight, Indent, IndentBlock, Italic, List, Paragraph, RemoveFormat, SpecialCharacters, Strikethrough, Subscript, Superscript, TodoList, Underline
  //     ],
  //     fontFamily: {
  //       supportAllValues: true
  //     },
  //     fontSize: {
  //       options: [10, 12, 14, 'default', 18, 20, 22],
  //       supportAllValues: true
  //     },
  //     htmlSupport: {
  //       allow: [
  //         {
  //           name: /^.*$/,
  //           styles: true,
  //           attributes: true,
  //           classes: true
  //         }
  //       ]
  //     },
  //     initialData: this.content,
  //     licenseKey: LICENSE_KEY,
  //     placeholder: this.content
  //   };
  // }





}
