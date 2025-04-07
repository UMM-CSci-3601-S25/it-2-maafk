// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';
// import { Player } from './player';
// // import { get } from 'http';

// /**
//  * Service that provides the interface for getting information
//  * about `Hosts` from the server.
//  */
// @Injectable({
//   providedIn: 'root'
// })
// export class PlayerService {

//   // The URL for the hosts part of the server API.
//   readonly playerUrl: string = `${environment.apiUrl}prompts`;

//   constructor(private httpClient: HttpClient) {
//   }


//   getPlayer(): Observable<Player[]> {
//     return this.httpClient.get<Player[]>(this.playerUrl);
//   }


//   addPlayer(newPlayer: Partial<Player>): Observable<string> {
//     return this.httpClient.post<{id: string}>(this.playerUrl, newPlayer).pipe(map(response => response.id));
//   }
// }
