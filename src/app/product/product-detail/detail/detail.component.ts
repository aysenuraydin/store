import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
   @Input() details: string |undefined;
}
