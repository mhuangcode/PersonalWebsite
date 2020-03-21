import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
  HostListener
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

      const light = new AmbientLight(0xffffff, 3);
      light.color.setHSL(0.1, 1, 0.95);
      light.position.set(-1, 1.75, 1);
      light.position.multiplyScalar(30);
      light.castShadow = false;

      this.scene.add(light);
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
    // heavier math causing stall on first load of the site,
    // putting it at the end of the call stack since it should happen
    // after render is finished
    this.updateBlob();
  }

  private updateBlob(): void {
    if (!this.blobGeometry) {
      return;
    }

    this.blobMesh.rotation.y += 0.0025;
    this.blobMesh.rotation.x += 0.0035;

    const now = window.performance.now();
    this.blobGeometry.vertices.forEach( vert => {
      vert.normalize();
      vert.multiplyScalar(this.noise.noise3D(
        this.blobGeometry.parameters.radius * Math.cos(now * 3.14 * 0.0000035) + vert.x,
        Math.sin(now * 3.14 * 0.0000025) * (this.blobGeometry.parameters.radius),
        Math.sin(now * 3.14 * 0.00005) * vert.z
      ) * 5 + this.blobGeometry.parameters.radius);
    })

    this.blobGeometry.verticesNeedUpdate = true;
    this.blobGeometry.normalsNeedUpdate = true;
    this.blobGeometry.computeVertexNormals();
    this.blobGeometry.computeFaceNormals();
  }

  private generateGeometry(): void {
    this.blobGeometry = new IcosahedronGeometry(15, 5);
    const mat = new MeshNormalMaterial({});
    this.blobMesh = new Mesh(this.blobGeometry, mat);
    this.scene.add(this.blobMesh);
  }
}
