import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header />
    <div class="flex flex-col bg-light px-6 lg:px-60 md:px-10 ">
    <main>
      <router-outlet />
    </main>
    <app-footer />
    </div>
  `,
})
export class LayoutComponent {}
