import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private apiUrl = `${environment.imageUrl}/v2/list`;

  constructor(private http: HttpClient) {}

  getPhotos(page: number, perPage: number = 24) {
    const randomDelay = Math.floor(Math.random() * 100) + 200;
    const url = `${this.apiUrl}?page=${page}&limit=${perPage}`;

    return this.http.get<any[]>(url).pipe(delay(randomDelay));
  }
}
