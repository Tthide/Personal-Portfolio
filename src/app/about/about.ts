import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact/contactForm/contactForm';

@Component({
  selector: 'app-about',
  imports: [ContactFormComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {

}
