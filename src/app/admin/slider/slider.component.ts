import { Component } from '@angular/core';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styles: [``]
})
export class SliderComponent {

  sliders: Slider[] = [];
  buttonVisible:boolean = true;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 5;
  pageTotal:number = 1;
  isSubmitted = false;

  sliderForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
    isActive: new FormControl(false),
    createdAt: new FormControl(new Date()),
    action: new FormControl(''),
  });

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.getSliders();
  }
  Search() {
    this.pageNumber=1;
    this.getQuerySliders();
  }
  onInputChange(event: Event) {
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQuerySliders();
  }
  Clear() {
    this.pageNumber=1;
    this.search = "";
    this.getSliders();
  }
  getQuerySliders(): void{
      this.sliderService.searchSliders(this.search,this.pageNumber, this.pageSize)
          .subscribe(
            (data) => {
              this.sliders = data.sliders;
              this.pageTotal = data.totalPages;
          }
        );
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getSliders(): void {
    this.sliderService.getSliders(this.pageNumber, this.pageSize)
    .subscribe(
      data => {
        this.sliders=data.sliders;
        this.pageTotal = data.totalPages;
      }
    )
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getSliders();
    else this.getQuerySliders();
  }
  editSlider(id: number): void {
    this.sliderService.getSlider(id)
    .subscribe(
      (data) => {
        this.sliderForm.patchValue({
          id:data.id,
          name: data.name,
          imgUrl: data.imgUrl,
          isActive: data.isActive,
          createdAt: data.createdAt
        });
      }
    );
    this.toggleWindow(true);
  }
  saveSlider():void{
    if (this.sliderForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    console.log(this.sliderForm.value);
    switch(this.action){
      case 'add':
          this.createSlider()
          break;
      case 'edit':
        this.updateSlider()
            break;
      case 'delete':
          this.deleteSlider();
            break;
      default:
          break;
    }
  }
  createSlider(): void {
    this.sliderService.createSubscribe(this.sliderForm.value as Slider).subscribe(() => {
      this.cancel();
      this.getSliders();
    });
  }
  updateSlider():void{
    this.sliderService.updateSubscribe(this.sliderForm.value as Slider).subscribe(() => {
      this.cancel();
      this.getSliders();
    });
  }
  deleteSlider(): void {
    this.sliderService.deleteSubscribe(this.sliderForm.value.id??0).subscribe();
    this.cancel();
    this.getSliders();
  }
  cancel():void{
    this.isSubmitted = false;
    // this.sliderForm.reset();
    this.sliderForm.reset({
      id: 0,
      name: '',
      imgUrl: null,
      isActive: false,
      createdAt: new Date(),
      action: '',
    });
  }
  setAction(action: string) {
    this.sliderForm.get('action')?.setValue(action);
  }
  get action() {
    return this.sliderForm.get('action')?.value;
  }
  get hasValidId() {
    const id = this.sliderForm.get('id')?.value;
    return Number(id) > 0;
  }
  get id() {
    return this.sliderForm.get('id');
  }
  get name() {
    return this.sliderForm.get('name');
  }
  get imgUrl() {
    return this.sliderForm.get('imgUrl');
  }
  get isActive() {
    return this.sliderForm.get('isActive');
  }
}
