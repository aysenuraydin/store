import { Component } from '@angular/core';
import { InformationsService } from '../services/informations.service';
import { Contact, Faqs } from '../models/informations';

@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
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
