import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styles: [``]
})
export class DetailComponent {
   @Input() details: string |undefined;
}
