import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
  HostListener
} from "@angular/core";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshNormalMaterial,
  IcosahedronGeometry
} from "three";

import * as SimplexNoise from "simplex-noise";
const noise = new SimplexNoise();
@Component({
  selector: "app-blob-thing",
  templateUrl: "./blob-thing.component.html",
  styleUrls: ["./blob-thing.component.scss"]
})
export class BlobThingComponent implements OnInit, AfterViewInit {
  @HostListener("window:resize", [])
  onWinResize() {
    if (this.camera) {
      const width = window.innerWidth;
      const height = window.innerHeight * 0.95;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  @ViewChild("threeStats") statsElem: ElementRef;
  @ViewChild("threeCanvas") canvasElem: ElementRef;

  private scene: Scene = new Scene();
  private renderer: WebGLRenderer = new WebGLRenderer({
    alpha: true,
    antialias: true
  });
  private camera: PerspectiveCamera;

  private blobGeometry: IcosahedronGeometry = new IcosahedronGeometry(15, 5);
  private blobMesh: Mesh;

  private mathWorker: Worker;
  private mathLock = true;
  private tick = 0;

  private started = false;
  canvasDom: any;

  constructor() {}

  ngOnInit(): void {
    this.mathWorker = new Worker("./../../helpers/math.worker", {
      type: "module"
    });

    this.mathWorker.onmessage = data => {
      this.blobGeometry.vertices.forEach((vert, index) => {
        vert.normalize();
        vert.multiplyScalar(
          this.blobGeometry.parameters.radius +
            noise.noise3D(
              data.data[index].x + vert.x,
              data.data[index].y + vert.y,
              data.data[index].z + vert.z
            ) *
              5
        );
      });

      this.blobGeometry.verticesNeedUpdate = true;
      this.mathLock = false;
      this.tick += 1;

      if (!this.started) {
        this.scene.add(this.blobMesh);
        this.canvasElem.nativeElement.style.opacity = "inherit";
        this.started = true;
      }
    };

    this.mathLock = false;
  }

  ngAfterViewInit(): void {
    this.canvasElem.nativeElement.style.opacity = 0;

    new Promise((resolve, reject) => {
      const width = window.innerWidth;
      const height = window.innerHeight * 0.95;

      this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x000000, 0.0);
      this.canvasElem.nativeElement.appendChild(this.renderer.domElement);
      this.camera.position.z = 32;
      this.generateGeometry();
      resolve();
    }).then(() => {
      this.animate();
    });
  }

  private animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });

    this.renderer.render(this.scene, this.camera);
    this.updateBlob();
  }

  private updateBlob(): void {
    if (this.blobGeometry) {
      this.blobMesh.rotation.y += 0.001;
      this.blobMesh.rotation.x += 0.0005;
    }

    if (this.mathLock) {
      return;
    }

    const radius = this.blobGeometry.parameters.radius;
    this.mathWorker.postMessage({
      now: this.tick,
      radius: radius,
      verts: this.blobGeometry.vertices
    });
    this.mathLock = true;
  }

  private generateGeometry(): void {
    const mat = new MeshNormalMaterial({
      wireframe: true
    });
    this.blobMesh = new Mesh(this.blobGeometry, mat);
  }
}
