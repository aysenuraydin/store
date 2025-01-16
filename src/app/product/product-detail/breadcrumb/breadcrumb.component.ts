import { Component, Input } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [``]
})
export class BreadcrumbComponent {
  @Input() productName: string |undefined;
  @Input() categoryName: string|undefined;
  @Input() categoryId: number|undefined;
}
