import { Component, NgZone, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, Project } from "../services/data.service";
import { Observable, Subscription, defer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { RotatingTextIconComponent } from "../shared/rotating-text-icon/rotating-text-icon";
import { AsyncPipe } from "@angular/common";

declare let createUnityInstance: any; // Unity global from loader.js

@Component({
  selector: "app-project-item",
  imports: [RotatingTextIconComponent, AsyncPipe],
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

  // UI State fullscreen
  isFullscreen = false;

  private resizeObserver?: ResizeObserver;

  constructor(private route: ActivatedRoute, private dataService: DataService, private zone: NgZone) { }

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
    /* Unity App loading pipeline */
    console.log('[Unity] Loading script...');
    this.isUnityLoading = true;
    this.unityProgress = 0;
    const script = document.createElement("script");

    // Fetching game's loader script
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
        productVersion: '1.0',
        matchWebGLToCanvasSize: false
      };


      console.log('[Unity] Creating instance...');
      createUnityInstance(canvas, config, (progress: number) => {
        this.zone.run(() => this.unityProgress = progress);
      }).then((unityInstance: any) => {
        console.log('[Unity] Loaded successfully!', unityInstance);
        this.isUnityLoading = false;

        // Ensure initial sizing happens after DOM layout
        requestAnimationFrame(() => this.adjustCanvasSize(canvas));

        // Watch for container resizing
        const container = canvas.parentElement!;
        this.resizeObserver = new ResizeObserver(() => this.adjustCanvasSize(canvas));
        this.resizeObserver.observe(container);
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

  adjustCanvasSize(canvas: HTMLCanvasElement) {
    /* Method to resize the unity canva according to its parent HTML container in the template
    While the Canvas element CSS size and the WebGL render target size are by default in sync, here it wasn't really rendering well to my liking
    Therefore I manually resize the WebGL render target size */
    const container = canvas.parentElement;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    const maxDPR = 2; // cap high-DPI scaling, found that 2 works well with trial and error
    const dpr = Math.max(window.devicePixelRatio, maxDPR);

    // Set visual size (Canvas element CSS size)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set internal buffer (WebGL render target size)
    canvas.width = width * dpr;
    canvas.height = height * dpr;
  }

  toggleFullScreen() {
    const canvasContainer = document.getElementById('unity-canvas-container');
    if (!canvasContainer) return;

    if (!document.fullscreenElement) {
      canvasContainer.requestFullscreen()
        .then(() => {

          this.isFullscreen = !this.isFullscreen;
        })
        .catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
      document.exitFullscreen();
      this.isFullscreen = !this.isFullscreen;

    }
  }

}
