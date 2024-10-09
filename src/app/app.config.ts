import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin'
import { routes } from './app.routes';
import { GroceryState } from '../store/states/grocery.state';
import { BucketState } from '../store/bucket.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([GroceryState, BucketState], withNgxsReduxDevtoolsPlugin())]
};


