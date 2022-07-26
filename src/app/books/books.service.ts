import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Author, Books } from './books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchBooks(): Observable<Books[]> {
    const url = `${this.baseUrl}/books`
		return this.http.get<Books[]>(url);
	}

  getAuthorById(id: number): Observable<Author> {
    const url = `${this.baseUrl}/authors/${id}`
		return this.http.get<Author>(url);
	}
}
