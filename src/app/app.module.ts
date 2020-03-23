import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BlobThingComponent } from "./comps/blob-thing/blob-thing.component";
import { MainLayoutComponent } from "./comps/ui/main-layout/main-layout.component";
import { TextLayerComponent } from "./comps/ui/main-layout/text-layer/text-layer.component";
import { ZoomDirective } from "./helpers/directives/zoom.directive";
import { ColorModeSelectorComponent } from "./comps/ui/color-mode-selector/color-mode-selector.component";
import { ExperienceListComponent } from "./comps/ui/main-layout/text-layer/experience-list/experience-list.component";
import { LanguageListComponent } from './comps/ui/main-layout/text-layer/language-list/language-list.component';
import { FrameworkListComponent } from './comps/ui/main-layout/text-layer/framework-list/framework-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BlobThingComponent,
    MainLayoutComponent,
    TextLayerComponent,
    ZoomDirective,
    ColorModeSelectorComponent,
    ExperienceListComponent,
    LanguageListComponent,
    FrameworkListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
