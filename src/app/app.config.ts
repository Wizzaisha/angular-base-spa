import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { environment } from '../environments/environment.development';
import StylePreset from './shared/utils/style-presets/style-preset';
import { apiUrlInterceptor } from './shared/interceptors/api-url.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: StylePreset,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideEffects(),
    provideHttpClient(withFetch(), withInterceptors([apiUrlInterceptor])),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !environment.production,
      autoPause: true,
    }),
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
};
