import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';
import { ResumeComponent } from './resume/resume';
import { ContactComponent } from './contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contact', component: ContactComponent },
  // Add other routes here
];
