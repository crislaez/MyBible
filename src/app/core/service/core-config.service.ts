import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT, Environment } from '../models/tokens'


export enum EndpointType {
  api = '/api/',
}

export interface CoreConfig {
  langs: string[];
}

@Injectable({
  providedIn: 'root'

})
export class CoreConfigService {
  protected _config: CoreConfig;

  constructor(@Inject(ENVIRONMENT) private _env: Environment) { }


  importConfig(coreConfigRaw: any): void {
    this._config = {
      langs: coreConfigRaw.Languages
    } as CoreConfig;
  }

  getEnv(): Environment {
    return this._env;
  };

  getImageBaseEndpoint(): string{
    return `${this._env}`;
  };

  getKey(): string{
    return this._env.apyKey
  };

  getKeyVideo(): string{
    return this._env.apyKeyGoogle
  };

  getEndpoint(): string {
    return `${this._env.baseEndpoint}`;
  };

  getEndpointVideo(): string {
    return `${this._env.baseEndpointVideo}`;
  };


}
