import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterOutlet],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      |
      <a routerLink="/about">About</a>
            |
      <a routerLink="/resume">Resume</a>
            |
      <a routerLink="/contact">Contact</a>
    </nav>
    <router-outlet />
  `,
  styles: ``
})
export class HeaderComponent {

}
