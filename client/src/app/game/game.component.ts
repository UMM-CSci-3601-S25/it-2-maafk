import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from './response';
import { map } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { HostService } from '../hosts/host.service';
import { Prompt } from '../hosts/prompt';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './game.service';
import { WebSocketService } from './web-socket.service';
import { MatListModule } from '@angular/material/list';
import { Game } from './game';





@Component({
  selector: 'app-game-component',
  templateUrl: 'game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    NgFor,
    MatFormFieldModule,
    RouterLink,
    MatListModule
  ]
})

export class GameComponent implements OnInit {

  webSocketService = inject(WebSocketService);
  gameService = inject(GameService);
  route = inject(ActivatedRoute);
  game = signal<Game | null>(null);
  gameId: string = this.route.snapshot.params['id'];
  players: { name: string, score: number }[] = [];
  questionPrompt: string = '';
  answer: string = '';

  error = signal({ help: '', httpResponse: '', message: '' });

  readonly hostUrl: string = `${environment.apiUrl}prompts`;
  prompts: string[] = [];

  constructor(private hostService: HostService , private httpClient: HttpClient) {
  }
  ngOnInit(): void {
    this.hostService.getPrompts().subscribe((data: Prompt[]) => {
      this.prompts = data.map(prompt => prompt.text); // Adjust according to your prompt structure
    });
  }
  generateRandomID(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  getResponse(): Observable<Response[]> {
    return this.httpClient.get<Response[]>(this.hostUrl);
  }

  addResponse(newResponse: Partial<Response>): Observable<string> {
    return this.httpClient.post<{id: string}>(this.hostUrl, newResponse).pipe(map(response => response.id));
  }
}

