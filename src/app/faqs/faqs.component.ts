import { Component } from '@angular/core';
import { Contact, Faqs } from '../models/informations';
import { InformationsService } from '../services/informations.service';

@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styles: [``]
})
export class FAQsComponent {
  faqs: Faqs[] = [];

  constructor(private informationsService: InformationsService) {}

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs(): void {
    this.informationsService.getFaqs()
    .subscribe(
      (data) => {
        this.faqs = data;
      }
    );
  }
}
