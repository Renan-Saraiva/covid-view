import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Config } from '../models/config';

@Injectable()
export class ConfigService {

  private httpClient: HttpClient;
  private configUri = './assets/config/config.json';  
  private config: Config;

  constructor(private handler: HttpBackend) 
  {
    this.httpClient = new HttpClient(handler);
  }

  public loadConfigJSON(): Promise<any> {
    return this.httpClient.get<Config>(this.configUri)
      .toPromise()
      .then(config => {
        this.config = config;
      });
  }

  public getConfig(): Config {
    return this.config;
  }
  
}
