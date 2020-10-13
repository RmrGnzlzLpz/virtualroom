import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InicializarDatosDeEntidadesComponent } from './components/inicializar-datos-de-entidades/inicializar-datos-de-entidades.component';
import { APP_ROUTES } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './services/interceptors/auth-http.interceptor';
import { InicializarDatosDeEntidadServiceService } from './services/inicializar-datos-de-entidad-service.service';

@NgModule({
  declarations: [
    AppComponent,
    InicializarDatosDeEntidadesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule
  ],
  providers: [
    InicializarDatosDeEntidadServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
