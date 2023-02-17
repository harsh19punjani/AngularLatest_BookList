import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  private url =
    'https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep';
  errorMsg: any;

  constructor(private httpClient: HttpClient) {}

  getBookList(): Observable<any> {
    return this.httpClient.get(this.url).pipe(
      catchError((error: any) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
          } else {
              this.errorMsg = this.getServerErrorMessage(error);
          }
        return throwError(error)
      })
  );
  }
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
  
}
