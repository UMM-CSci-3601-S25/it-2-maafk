import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameService } from './game.service';
import { WebSocketService } from './web-socket.service';
import { Game } from './game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private webSocketService = inject(WebSocketService);
  private gameService = inject(GameService);
  private route = inject(ActivatedRoute);

  gameId: string;
  currentPrompt: string = '';
  currentRound : number = 1;
  currentCzar: string = '';
  currentPlayerName: string = 'You';
  players: { name: string, score: number, isCzar: boolean }[] = [];
  submissions: {text: string, player: string}[] = [];  playerResponse: string = '';
  isCzar: boolean = false;
  hasSubmitted: boolean = false;
  targetScore: number = 5;

  constructor() {
    this.gameId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadGame();
    this.setupWebSocket();
  }

  loadGame(): void {
    this.gameService.getGameById(this.gameId).subscribe({
      next: (game) => {
        this.currentPrompt = game.prompts?.[0] || '';
        this.currentCzar = game.currentCzar || '';
        this.players = game.players?.map(name => ({ 
          name, 
          score: game.scores?.find(s => s.player === name)?.score || 0,
          isCzar: name === game.currentCzar
        })) || [];
        this.isCzar = this.currentPlayerName === this.currentCzar;
      },
      error: (err) => console.error('Error loading game:', err)
    });
  }

  setupWebSocket(): void {
    this.webSocketService.getMessage().subscribe((message: any) => {
      if (message.gameId === this.gameId) {
        switch (message.type) {
          case 'ADD_PLAYER':
            this.players.push({ 
              name: message.playerName, 
              score: 0,
              isCzar: this.checkIfCzar(message.playerName)
            });
            break;
          case 'ADD_PROMPT':
            this.currentPrompt = message.prompt;
            break;
          case 'NEW_RESPONSE':
            this.submissions.push(
              message.response);
            break;
          case 'SELECT_WINNER':
            this.updateScore(message.winnerIndex);
            break;

            case 'NEW_ROUND':
              this.currentRound++;
              this.currentPrompt = message.prompt;
              this.hasSubmitted = false;
              this.playerResponse = '';
              this.submissions = [];
              break;
            
        }
      }
    });
  }

  submitResponse(): void {
    if (this.playerResponse.trim()) {
      const playerName = 'You'; // Replace with actual player name from your auth/service
      this.gameService.addResponse(this.gameId, playerName, this.playerResponse).subscribe({
        next: () => {
          this.hasSubmitted = true;
          this.webSocketService.sendMessage({
            type: 'NEW_RESPONSE',
            gameId: this.gameId,
            response: this.playerResponse,
            player: playerName
          });
        },
        error: (err) => console.error('Error submitting response:', err)
      });
    }
  }
  

  selectWinner(winnerIndex: number): void {
    const winner = this.submissions[winnerIndex].player;
    
    this.webSocketService.sendMessage({
      type: 'SELECT_WINNER',
      gameId: this.gameId,
      winner: winner,
      winningResponse: this.submissions[winnerIndex].text
    });
  
    // Update local state immediately
    this.players = this.players.map(player => ({
      ...player,
      score: player.name === winner ? player.score + 1 : player.score
    }));
    
    this.nextRound();
  }
  

  private updateScore(winnerIndex: number): void {
    this.players[winnerIndex].score++;
    if (this.players[winnerIndex].score >= this.targetScore) {
      // Handle game win condition
    }
    this.nextRound();
  }

  private nextRound(): void {
    this.hasSubmitted = false;
    this.playerResponse = '';
    this.submissions = [];
    this.rotateCzar();
  }

  private rotateCzar(): void {
    this.players.forEach((player, index) => {
      player.isCzar = index === (this.players.findIndex(p => p.isCzar) + 1 % this.players.length);
    });
    this.isCzar = this.currentPlayerName === this.currentCzar;
  }

  private checkIfCzar(playerName: string): boolean {
    
    return false; // Temporary placeholder
  }
}
      
