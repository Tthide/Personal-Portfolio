import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface InfoCard {
    title: string;
    subtitle: string;
    desc: string; 
    key_words: string[];
    picture_url: string;
}

export interface ProjectOverview {
    desc: string;
    objective: string;
    timeframe: string;
    skills: string;
    tech: string;
}

export interface ProcessStep {
    step_desc: string;
    desc_img_url: string;
}

export interface Process {
    steps: ProcessStep[];
    results: string;
}

export interface GalleryItem {
    picture: {
        title: string;
        url: string;
        date: string;
        location: string;
        desc: string;
    };
}

export interface Project {
    id: number;
    content: {
        info_card: InfoCard;
        project_overview: ProjectOverview;
        process: Process;
        gallery: GalleryItem[];
    };
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    getProjects(): Observable<{ projects: Project[] }> {
        return this.http.get<{ projects: Project[] }>('/data/projects.json');
    }

    getProjectById(id: number): Observable<Project | undefined> {
        return this.getProjects().pipe(
            map((data: { projects: Project[] }) =>
                data.projects.find((p: Project) => p.id === id)));
    }
}
