import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-host',
  imports:
    [
      FormsModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent {

  addGameForm = new FormGroup({
    // We allow alphanumeric input and limit the length for name.
    joincode: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      // Long join codes are very inconvenient
      Validators.maxLength(10),
    ])),
    playerName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      // length of the player name must be 2-100 characters
      Validators.maxLength(100),
    ])),
  });

  readonly addGameValidationMessages = {
    joincode: [
      {type: 'required', message: 'Join code is required'},
      {type: 'minlength', message: 'Name must be at least 2 characters long'},
      {type: 'maxlength', message: 'Name cannot be more than 10 characters long'},
    ],
    playerName: [
      {type: 'required', message: 'Player name is required'},
      {type: 'minlength', message: 'Name must be at least 2 characters long'},
      {type: 'maxlength', message: 'Name cannot be more than 100 characters long'},
    ],
    text: [
      { type: 'required', message: 'Prompt text is required' },
      { type: 'minlength', message: 'Prompt must be at least 2 characters'},
      { type: 'maxlength', message: 'Prompt text cannot be more than 200 characters long' }
    ],
  };

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  formControlHasError(controlName: string): boolean {
    return this.addGameForm.get(controlName).invalid &&
      (this.addGameForm.get(controlName).dirty || this.addGameForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.addGameValidationMessages): string {
    for(const {type, message} of this.addGameValidationMessages[name]) {
      if (this.addGameForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  submitForm() {
    this.gameService.addGame({joincode: this.addGameForm.value.joincode, players: [`${this.addGameForm.value.playerName}`], currentRound: 0, prompts: }).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Added game with join code: ${this.addGameForm.value.joincode}`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/games/', newId]);
      },
      error: err => {
        if (err.status === 400) {
          this.snackBar.open(
            `Tried to add and host an illegal new game – Error Code: ${err.status}\nMessage: ${err.message}`,
            'OK',
            { duration: 5000 }
          );
        } else if (err.status === 500) {
          this.snackBar.open(
            `The server failed to process your request to add a new game to host. Is the server up? – Error Code: ${err.status}\nMessage: ${err.message}`,
            'OK',
            { duration: 5000 }
          );
        } else {
          this.snackBar.open(
            `An unexpected error occurred – Error Code: ${err.status}\nMessage: ${err.message}`,
            'OK',
            { duration: 5000 }
          );
        }
      },
    });
  }
}
