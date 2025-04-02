import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HostService } from '../hosts/host.service';
import { Prompt } from '../hosts/prompt';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule // <-- Added this for mat-spinner
  ]
})
export class GameComponent implements OnInit {
  // Game state
  gameId: string = this.generateRandomId(6);
  currentPrompt: string = 'Loading prompt...';
  targetScore: number = 5;
  isCzar: boolean = false;
  hasSubmitted: boolean = false;
  playerResponse: string = '';

  // Players and responses
  players = [
    { id: '1', name: 'You', score: 0, isCzar: false },
    { id: '2', name: 'Player 2', score: 0, isCzar: true }
  ];
  submissions: string[] = [];

  constructor(private hostService: HostService) {}

  ngOnInit(): void {
    this.loadPrompt();
  }

  loadPrompt(): void {
    this.hostService.getPrompts().subscribe({
      next: (prompts: Prompt[]) => {
        this.currentPrompt = prompts[0]?.text || 'No prompts available';
      },
      error: (err) => {
        console.error('Failed to load prompts:', err);
        this.currentPrompt = 'Error loading prompt';
      }
    });
  }

  submitResponse(): void {
    if (!this.playerResponse.trim()) return;
    
    this.submissions.push(this.playerResponse);
    this.hasSubmitted = true;
    
    // In real app: Send to server via WebSocket
    // this.socketService.submitResponse(this.gameId, this.playerResponse);
  }

  selectWinner(index: number): void {
    // In real app: Send selection to server
    // this.socketService.selectWinner(this.gameId, index);
    
    // Reset for next round
    this.hasSubmitted = false;
    this.playerResponse = '';
    this.submissions = [];
    this.loadPrompt();
  }

  private generateRandomId(length: number): string {
    return Array.from({ length }, () => 
      Math.random().toString(36)[2] || '0'
    ).join('');
  }
}