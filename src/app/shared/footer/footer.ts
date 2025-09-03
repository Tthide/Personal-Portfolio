import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './footer.html',
  styles: ``
})
export class FooterComponent {
  navLinks = [
    { path: '/home', label: 'HOME', exact: true },
    { path: '/about', label: 'ABOUT' },
    { path: '/resume', label: 'RESUME' },
    { path: '/contact', label: 'CONTACT' },
  ];

  socialLinks = [
    { href: 'https://www.linkedin.com/in/thibaultborde/', img: './InBug-White.png', alt: 'LinkedIn' },
    { href: 'https://github.com/Tthide', img: './github-mark-white.png', alt: 'GitHub' },
  ];

  currentYear = new Date().getFullYear();
}
