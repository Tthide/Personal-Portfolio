import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, Project } from "../services/data.service";
import { Observable, Subscription, defer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { RotatingTextIconComponent } from "../shared/rotating-text-icon/rotating-text-icon";
import { AsyncPipe } from "@angular/common";

declare let createUnityInstance: any; // Unity global from loader.js

@Component({
  selector: "app-project-item",
  imports: [RotatingTextIconComponent, AsyncPipe,],
  templateUrl: "./project-item.html",
  standalone: true,
  styleUrl: "./project-item.css"
})
export class ProjectItemComponent implements OnDestroy {
  project$!: Observable<Project | undefined>;

  // UI state for loading progress
  isUnityLoading = false;
  unityProgress = 0;
  private sub?: Subscription;
  private unityLoaded = false;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => defer(() => this.dataService.getProjectById(+id)))
    );

    // React to project data changes
    this.sub = this.project$.subscribe(project => {
      if (project?.content?.info_card?.hasGame && !this.unityLoaded) {
        this.unityLoaded = true;
        this.loadUnityGame(project.id);
      }
    });
  }

  private loadUnityGame(gameId: number) {
    console.log('[Unity] Loading script...');
    this.isUnityLoading = true;
    this.unityProgress = 0; const script = document.createElement("script");

    script.src = `unity-webgl/${gameId}/unity.loader.js`;
    console.log(`[Unity] Script path: ${script.src}`);
    script.onload = () => {
      console.log('[Unity] Script loaded successfully!');
      const canvas = document.querySelector("#unity-canvas") as HTMLCanvasElement;
      if (!canvas) return;

      const config = {
        dataUrl: `unity-webgl/${gameId}/unity.data`,
        frameworkUrl: `unity-webgl/${gameId}/unity.framework.js`,
        codeUrl: `unity-webgl/${gameId}/unity.wasm`,
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'YourCompany',
        productName: 'YourGame',
        productVersion: '1.0'
      };

      console.log('[Unity] Creating instance...');
      createUnityInstance(canvas, config, (progress: number) => {
        this.unityProgress = progress;
        console.log(`[Unity] Loading progress: ${(progress * 100).toFixed(0)}%`);
      })
        .then((unityInstance: any) => {
          console.log('[Unity] Loaded successfully!', unityInstance);
          this.isUnityLoading = false;
        })
        .catch((err: any) => {
          console.error('[Unity] Failed to load:', err);
          this.isUnityLoading = false;
        });
    };

    script.onerror = (e) => {
      console.error('[Unity] Script failed to load', e);
      this.isUnityLoading = false;
    };
    document.body.appendChild(script);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
