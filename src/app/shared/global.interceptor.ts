import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) this.router.navigate(['login']);
      this.loadingService.isLoadingVisible.next(false);
      return of(error);
    }));
  }
}
