import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Game } from './game';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly gameUrl: string = `${environment.apiUrl}games`;

  constructor(private httpClient: HttpClient) { }

  getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>(`${this.gameUrl}/${id}`);
  }

  addGame(newGame: Partial<Game>): Observable<string> {

    return this.httpClient.post<{id: string}>(this.gameUrl, newGame).pipe(map(response => response.id));
  }
  
  addPlayer(gameId: string, newPlayer: string): Observable<Game> {
    return this.httpClient.put<Game>(`${this.gameUrl}/${gameId}/${newPlayer}`, null);
  }
}