import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { RapidAPI } from '../models/config';

@Injectable()
export class RapidApiInterceptor implements HttpInterceptor {

  private rapidAPIConfig: RapidAPI;

  constructor(private configService:ConfigService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({
      setHeaders : this.configService.getConfig().rapidAPI.headers
    });

    return next.handle(request);
  }
}
