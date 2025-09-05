import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contactForm.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      company: [''],
    });
  }

  onSubmit() {
    if (this.contactForm.value.company) {
      console.warn('Inavlid sender detected, ignoring submission.');
      return;
    }

    if (this.contactForm.valid) {
      const now = new Date();
      const datePipe = new DatePipe('en-US');
      const formattedTime = datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');

      const templateParams = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        title: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        time: formattedTime,
      };

      emailjs
        .send('service_rs6300r', 'template_ksg5a0i', templateParams, 'cG_TAg_JcDAAzxOp-')
        .then(
          (result: EmailJSResponseStatus) => {
            console.log(result.text);
            alert('Message sent successfully!');
            this.contactForm.reset();
          },
          (error) => {
            console.error(error.text);
            alert('Oops! Something went wrong.');
          }
        );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
