import { Component } from '@angular/core';
import { InformationsService } from '../services/informations.service';
import { Contact, Faqs } from '../models/informations';

@Component({
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FAQsComponent {

    constructor(private informationsService: InformationsService) {}

    ngOnInit(): void {
    }

    getFaqs(): Faqs[] {
        return this.informationsService.getFaqs().reverse().slice(0,6);
      }
}
