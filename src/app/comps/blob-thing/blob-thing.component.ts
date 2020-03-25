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

import * as vertexShader from "./shaders/vertexShader.shader";
import * as fragmentShader from "./shaders/fragmentShder.shader";

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
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  @ViewChild("threeStats") statsElem: ElementRef;
  @ViewChild("threeCanvas") canvasElem: ElementRef;

  private scene: Scene = new Scene();
  private camera: PerspectiveCamera;
  private blobMesh: Mesh;
  // number to offset performance start, acts like a seed param
  private seed = Math.random() * 123456;

  private renderer: WebGLRenderer = new WebGLRenderer({
    alpha: true,
    antialias: true
  });

  private blobGeometry: IcosahedronBufferGeometry = new IcosahedronBufferGeometry(
    15,
    6
  );

  private material = new ShaderMaterial({
    wireframe: true,
    vertexShader: vertexShader.default,
    fragmentShader: fragmentShader.default,
    uniforms: {
      time: {
        type: "f",
        value: 0.0
      }
    }
  });

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvasElem.nativeElement.style.opacity = 0;

    new Promise((resolve, reject) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x000000, 0.0);
      this.canvasElem.nativeElement.appendChild(this.renderer.domElement);
      this.camera.position.z = 31;
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
    this.material.uniforms["time"].value =
      0.025 * window.performance.now() + this.seed;
    this.updateBlob();
  }

  private updateBlob(): void {
    if (this.blobGeometry) {
      this.blobMesh.rotation.y += 0.001;
      this.blobMesh.rotation.x -= 0.0005;
    }
  }

  private generateGeometry(): void {
    this.blobMesh = new Mesh(this.blobGeometry, this.material);
    this.scene.add(this.blobMesh);
    this.canvasElem.nativeElement.style.opacity = "inherit";
  }
}
