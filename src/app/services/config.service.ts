import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config';
import { TouchSequence } from 'selenium-webdriver';


@Injectable()
export class ConfigService {

  private configUri = './assets/config/config.json';  
  private config: Config;

  constructor(private httpClient: HttpClient) { }

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
