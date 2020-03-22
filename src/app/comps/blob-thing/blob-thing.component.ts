import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
  HostListener,
  AfterViewChecked
} from '@angular/core';

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  AmbientLight,
  MeshNormalMaterial,
  IcosahedronGeometry
} from 'three';


import * as SimplexNoise from 'simplex-noise';

@Component({
  selector: 'app-blob-thing',
  templateUrl: './blob-thing.component.html',
  styleUrls: ['./blob-thing.component.scss']
})
export class BlobThingComponent implements OnInit, AfterViewInit {
  @HostListener('window:resize', [])
  onWinResize() {
    if (this.camera) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  @ViewChild('threeStats') statsElem: ElementRef;
  @ViewChild('threeCanvas') canvasElem: ElementRef;

  private noise = new SimplexNoise();

  private scene: Scene = new Scene();
  private renderer: WebGLRenderer = new WebGLRenderer({
    alpha: true,
    antialias: true
  });
  private camera: PerspectiveCamera;
  private blobGeometry: IcosahedronGeometry;
  private blobMesh: Mesh;

  canvasDom: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Promise((resolve, reject) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

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
    if (!this.blobGeometry) {
      return;
    }

    this.blobMesh.rotation.y += 0.0025;
    this.blobMesh.rotation.x += 0.0035;

    const now = Date.now();
    const radius = this.blobGeometry.parameters.radius;

    this.blobGeometry.vertices.forEach( vert => {
      vert.normalize();
      vert.multiplyScalar(radius + this.noise.noise3D(
        Math.cos(now * 0.000125) * vert.x,
        Math.sin(now * 0.000063) * vert.y,
        Math.sin(now * 0.000038) * vert.z
      ) * 5);
    })

    this.blobGeometry.verticesNeedUpdate = true;
    this.blobGeometry.normalsNeedUpdate = true;
    this.blobGeometry.computeVertexNormals();
    this.blobGeometry.computeFaceNormals();
  }

  private generateGeometry(): void {
    this.blobGeometry = new IcosahedronGeometry(15, 5);
    const mat = new MeshNormalMaterial({
      wireframe: true
    });
    this.blobMesh = new Mesh(this.blobGeometry, mat);
    this.scene.add(this.blobMesh);
  }
}
