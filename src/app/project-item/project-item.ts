import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RotatingTextIconComponent } from '../shared/rotating-text-icon/rotating-text-icon';

@Component({
  selector: 'app-project-item',
  imports: [RotatingTextIconComponent],
  templateUrl: './project-item.html',
  styleUrl: './project-item.css'
})
export class ProjectItemComponent {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = params.get('id') ?? '');
  }
}
