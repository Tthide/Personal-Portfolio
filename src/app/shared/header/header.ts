import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-primary text-light font-konkhmer sticky px-16 py-5">
      <div class="flex justify-between items-center">
        <!-- Logo image -->
        <a routerLink="/home" class="w-16 h-16 flex items-center justify-center">
                <img src="./Main_Logo.png" alt="Logo" fill class="w-full h-full object-contain" />
        </a>


        <!-- Navigation -->
        <nav class="flex items-end space-x-8">
          <a routerLink="/home"
             routerLinkActive="text-accent after:w-full"
             [routerLinkActiveOptions]="{ exact: true }"
             class="relative text-2xl after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-colors">
            HOME
          </a>
          <a routerLink="/about"
             routerLinkActive="text-accent after:w-full"
             class="relative text-2xl after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-colors">
            ABOUT
          </a>
          <a routerLink="/resume"
             routerLinkActive="text-accent after:w-full"
             class="relative text-2xl after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-colors">
            RESUME
          </a>
          <a routerLink="/contact"
             routerLinkActive="text-accent after:w-full"
             class="relative text-2xl after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full transition-colors">
            CONTACT
          </a>
        </nav>
      </div>
    </header>

  `,
  styles: []
})
export class HeaderComponent { }
