import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game/game.service';
import { WebSocketService } from '../game/web-socket.service';
import { Game } from '../game/game';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);
  private webSocketService = inject(WebSocketService);

  gameId: string;
  currentPrompt: string = '';
  currentRound: number = 1;
  submissions: { text: string, player: string }[] = [];
  players: { name: string, score: number }[] = [];

  constructor() {
    this.gameId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadGame();
    this.setupWebSocket();
  }

  loadGame(): void {
    this.gameService.getGameById(this.gameId).subscribe({
      next: (game: Game) => {
        this.currentPrompt = game.prompts?.[0] || '';
        this.submissions = game.responses || [];
        this.players = game.players.map(name => ({
          name,
          score: game.scores?.find(s => s.player === name)?.score || 0
        }));
        this.currentRound = game.currentRound;
      },
      error: err => console.error('Failed to load game:', err)
    });
  }

  setupWebSocket(): void {
    this.webSocketService.getMessage().subscribe((message: any) => {
      if (message.gameId === this.gameId) {
        if (message.type === 'NEW_RESPONSE') {
          this.submissions.push(message.response);
        }
      }
    });
  }

  selectHostWinner(index: number): void {
    const winner = this.submissions[index];
    this.webSocketService.sendMessage({
      type: 'SELECT_WINNER',
      gameId: this.gameId,
      winner: winner.player,
      winningResponse: winner.text
    });

    // Update scores locally for display if needed
    this.players = this.players.map(p => ({
      ...p,
      score: p.name === winner.player ? p.score + 1 : p.score
    }));

    // Reset state for next round
    this.submissions = [];
    this.loadGame(); // or trigger NEW_ROUND message via WebSocket
  }
}
