import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact/contactForm/contactForm';
import { RotatingTextIconComponent } from '../shared/rotating-text-icon/rotating-text-icon';

@Component({
  selector: 'app-about',
  imports: [ContactFormComponent, RotatingTextIconComponent],
  templateUrl: './about.html',
  standalone: true,
  styleUrl: './about.css'
})
export class AboutComponent {

}
