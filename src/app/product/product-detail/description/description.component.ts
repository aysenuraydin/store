import { Component, Input } from '@angular/core';

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styles: [``]
})
export class DescriptionComponent {
  @Input() description: string |undefined;
}
