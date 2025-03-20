import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Host_Settings } from './host-settings';
import { Prompt } from './prompt';
// import { get } from 'http';

/**
 * Service that provides the interface for getting information
 * about `Hosts` from the server.
 */
@Injectable({
  providedIn: 'root'
})
export class HostService {

  // The URL for the hosts part of the server API.
  readonly hostUrl: string = `${environment.apiUrl}prompts`;

  constructor(private httpClient: HttpClient) {
  }


  getRounds(): Observable<Host_Settings[]> {
    return this.httpClient.get<Host_Settings[]>(this.hostUrl);
  }

  getPrompts(): Observable<Prompt[]> {
    return this.httpClient.get<Prompt[]>(this.hostUrl);
  }


  addPrompt(newPrompt: Partial<Prompt>): Observable<string> {
    return this.httpClient.post<{id: string}>(this.hostUrl, newPrompt).pipe(map(response => response.id));
  }
}
