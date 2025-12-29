import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // if you have routes, otherwise remove
import { provideHttpClient } from '@angular/common/http';  // ADD THIS

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // ADD THIS LINE
  ]
};