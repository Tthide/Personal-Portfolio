import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Project } from '../services/data.service';
import { Observable, defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RotatingTextIconComponent } from '../shared/rotating-text-icon/rotating-text-icon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-item',
  imports: [RotatingTextIconComponent,AsyncPipe],
  templateUrl: './project-item.html',
  styleUrl: './project-item.css'
})
export class ProjectItemComponent {
  project$!: Observable<Project | undefined>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => defer(() => this.dataService.getProjectById(+id)))
    );  }
}
