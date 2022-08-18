import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeWidgetDemoModule } from './tree-widget-demo/tree-widget-demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    TreeWidgetDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faEllipsisV
    );
  }

}
