import { Component } from '@angular/core';
import { About } from '../models/informations';
import { InformationsService } from '../services/informations.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  about: About = new About();

  constructor(private informationsService: InformationsService) {}

  ngOnInit(): void {
    this.about = this.informationsService.getAbout();
  }
}
