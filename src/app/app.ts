import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent],

  template: `
    <app-layout />
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio-angular');
}
