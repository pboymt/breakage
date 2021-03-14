import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { DocumentModule } from "./document/document.module";
import { TranslationModule } from './translation/translation.module';
import { MenuModule } from './menu/menu.module';
import { IconModule } from './icon/icon.module';
// import { PdfModule } from './pdf/pdf.module';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { AppReuseStrategy } from './app-routing.strategy';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule, // SharedModule
    HomeModule,   // HomeModule
    DetailModule, // DetailModule
    DocumentModule,
    AppRoutingModule,
    TranslationModule,
    PdfViewerModule,
    MenuModule,
    IconModule,
    // NgxExtendedPdfViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: AppReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
