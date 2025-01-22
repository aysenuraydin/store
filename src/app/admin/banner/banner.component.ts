import { Component } from '@angular/core';
import { Banner } from '../../models/banner';
import { BannerService } from '../../services/banner.service';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styles: [``]
})
export class BannerComponent {
    banners: Banner[] = [];
    buttonVisible:boolean = true;
    search:string = "";
    pageNumber:number = 1;
    pageSize:number = 7;
    pageTotal:number = 1;
    isSubmitted = false;

    bannerForm = new FormGroup({
      id: new FormControl(0),
      message: new FormControl('', [Validators.required, Validators.minLength(5)]),
      button: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      isActive: new FormControl(false),
      createdAt: new FormControl(new Date()),
      action: new FormControl(''),
    });
    constructor(private bannerService: BannerService) {  }

    ngOnInit(): void {
      this.getBanners();
    }
    Search() {
      this.pageNumber=1;
      this.getQueryReviews();
    }
    onInputChange(event: Event) {
      this.pageNumber=1;
      this.search = (event.target as HTMLInputElement).value;
      this.getQueryReviews();
    }
    Clear() {
      this.pageNumber=1;
      this.search = "";
      this.getBanners();
    }
    getQueryReviews(): void{
        this.bannerService.searchBanners(this.search,this.pageNumber, this.pageSize)
            .subscribe(
              (data) => {
                this.banners = data.products;
                this.pageTotal = data.totalPages;
            }
          );
    }
    toggleWindow(value:boolean) :void {
      this.buttonVisible = !value;
      this.cancel();
    }
    getBanners(): void {
      this.bannerService.getBanners(this.pageNumber, this.pageSize)
        .subscribe(data =>
          {
            this.banners=data.products;
            this.pageTotal = data.totalPages;
          }
        )
    }
    getPageNumber(pageNumber:number){
      this.pageNumber = pageNumber
      if(this.search.length==0) this.getBanners();
      else this.getQueryReviews();
    }
    editBanner(id: number): void {
      this.bannerService.getBanner(id)
      .subscribe(
        (data) => {
          this.bannerForm.patchValue({
            id:data.id,
            button: data.button,
            message: data.message,
            isActive: data.isActive,
            createdAt: data.createdAt
          });
        }
      );
      this.toggleWindow(true);
    }
    saveBanner():void{
      if (this.bannerForm.invalid) {
        this.isSubmitted = true;
        return;
      }
      switch(this.action){
        case 'add':
            this.createBanner()
            break;
        case 'edit':
          this.updateBanner()
              break;
        case 'delete':
            this.deleteBanner();
              break;
        default:
            break;
      }
    }
    createBanner(): void {
      this.bannerService.createBanner(this.bannerForm.value as Banner).subscribe(() => {
        this.cancel()
        this.getBanners();
      });
    }
    updateBanner():void{
      this.bannerService.updateBanner(this.bannerForm.value as Banner).subscribe(() => {
        this.cancel()
        this.getBanners();
      });
    }
    deleteBanner(): void {
      this.bannerService.deleteBanner(this.bannerForm.value.id??0).subscribe(()=>{
        this.cancel();
        this.getBanners();
      });
    }
    cancel():void{
      this.isSubmitted = false;
      this.bannerForm.reset({
        id: 0,
        message: '',
        button: '',
        isActive: false,
        createdAt: new Date(),
        action: '',
      });
    }
    activedBanner(event: Event){
      if(this.banners[0].id == this.id?.value){
        event.preventDefault();
      }
    }
    setAction(action: string) {
      this.bannerForm.get('action')?.setValue(action);
    }
    get action() {
      return this.bannerForm.get('action')?.value;
    }
    get hasValidId() {
      const id = this.bannerForm.get('id')?.value;
      return Number(id) > 0;
    }
    get id() {
      return this.bannerForm.get('id');
    }
    get message() {
      return this.bannerForm.get('message');
    }
    get button() {
      return this.bannerForm.get('button');
    }
    get isActive() {
      return this.bannerForm.get('isActive');
    }
}
// saveContact() {
//   if (this.contactForm.invalid) {
//     this.isSubmitted = true;
//     return;
//   }

//   const formData = this.contactForm.value;

//   if (formData.action === 'create') {

//   } else if (formData.action === 'update') {

//   }
// }


/*

ngOnInit() {
  this.contactForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(5)]],
    lastname: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(5)]],
    isAccept: [false, Validators.requiredTrue],
    action: [''] // Gizli alan
  });
}

setAction(action: string) {
  this.contactForm.get('action')?.setValue(action);
}

saveContact() {
  if (this.contactForm.invalid) {
    this.isSubmitted = true;
    return;
  }

  const formData = this.contactForm.value;

  if (formData.action === 'create') {
    console.log('Creating contact...', formData);
    // Create işlemi
  } else if (formData.action === 'update') {
    console.log('Updating contact...', formData);
    // Update işlemi
  }
}


<form [formGroup]="contactForm" (ngSubmit)="saveContact()">
  <input formControlName="action" type="hidden" />
  <div class="mt-10 flex gap-4">
    <button
      type="submit"
      (click)="setAction('create')"
      class="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
    >
      Create
    </button>

    <button
      type="submit"
      (click)="setAction('update')"
      class="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
    >
      Update
    </button>
  </div>
</form>

*/
