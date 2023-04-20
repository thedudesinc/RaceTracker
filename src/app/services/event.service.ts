import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventInput, EventOutput } from './models/event.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService {
  baseUrl = environment.baseUrl + '/events';

  constructor(private http: HttpClient) {
    super();
  }

  create(event: EventInput): Observable<EventOutput> {
    return this.http.post<EventOutput>(this.baseUrl, event, { headers: this.getHeaders() });
  }

}
