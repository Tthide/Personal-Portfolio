import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-item',
  imports: [],
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
