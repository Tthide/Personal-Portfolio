import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <div class="flex flex-col bg-light min-h-dvh">    
      <app-header />

      <main class=" grow px-6 py-10 lg:px-60 lg:py-16 md:px-10">
        <router-outlet />
      </main>
      <app-footer class="px-0 md:px-10 lg:px-60" />
    </div>

  `,
})
export class LayoutComponent { }
