import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()]
});
