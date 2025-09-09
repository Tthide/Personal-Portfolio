import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from '../project-list/project-list';

@Component({
  selector: 'app-home',
  imports: [RouterModule,ProjectListComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
