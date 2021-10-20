import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  baseEndpoint: string,
  baseEndpointBook: string,
  baseEndpointVideo: SVGStringList,
  apyKey: string;
  apyKeyGoogle: string
}

export const ENVIRONMENT = new InjectionToken<Environment>('environment');
