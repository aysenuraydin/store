import { Component, Input } from '@angular/core';

@Component({
  selector: 'description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  @Input() description: string |undefined;
}
