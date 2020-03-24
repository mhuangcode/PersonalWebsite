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
  ShaderMaterial,
  IcosahedronBufferGeometry
} from "three";

import * as shaders from "./shaders/shaders";

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

  private blobGeometry: IcosahedronBufferGeometry = new IcosahedronBufferGeometry(
    15,
    5
  );
  private blobMesh: Mesh;
  private mathLock = true;

  material = new ShaderMaterial({
    wireframe: true,
    vertexShader: shaders.default.vertex,
    fragmentShader: shaders.default.fragment,
    uniforms: {
      time: {
        type: "f",
        value: 0.0
      }
    }
  });
  canvasDom: any;

  constructor() {}

  ngOnInit(): void {
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
    this.material.uniforms["time"].value = 0.05 * window.performance.now();
  }

  private updateBlob(): void {
    if (this.blobGeometry) {
      this.blobMesh.rotation.y += 0.001;
      this.blobMesh.rotation.x -= 0.0005;
    }

    if (this.mathLock) {
      return;
    }

    this.mathLock = true;
  }

  private generateGeometry(): void {
    this.blobMesh = new Mesh(this.blobGeometry, this.material);
    this.scene.add(this.blobMesh);
    this.canvasElem.nativeElement.style.opacity = "inherit";
  }
}
