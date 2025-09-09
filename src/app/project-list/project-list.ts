import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService, Project } from '../services/data.service';

@Component({
  selector: 'app-project-list',
  imports: [RouterModule],
  templateUrl: './project-list.html',
  styles: ``
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(data => {
      this.projects = data.projects;
    });
  }
}
