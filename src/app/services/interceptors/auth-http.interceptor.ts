import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwODI0ODAxNjYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFc3R1ZGlhbnRlIiwianRpIjoiOTdlMmUyMjYtZjc4Ni00YjI5LTliM2ItNjM0NDBiMTY4MzQ2IiwiZXhwIjoxNjAyNjQwODQ4LCJpc3MiOiJ5b3VyZG9tYWluLmNvbSIsImF1ZCI6InlvdXJkb21haW4uY29tIn0.gyKnZjud6fTOAkjL9riKZdTLUmcjSZY5TGG6qdFGU88";
    const authRequest = req.clone({ setHeaders: { authorization: `Bearer ${jwt}` } });
    console.log(jwt);
		return next.handle(authRequest)
			.pipe(
				catchError((err, caught) => {
					if (err.status === 401) {
						this.router.navigate(['/login'], {
							queryParams: {redirectUrl: this.router.routerState.snapshot.url}
						});
					}
					return observableThrowError(err);
				})
			);
	}
}
