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
  templateUrl: './host-setting.component.html',
  styleUrl: './host-setting.component.scss'
})
export class HostComponent {

  addGameForm = new FormGroup({
    joincode: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ])),
    playerName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ])),
    prompt: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ])),
    // currentRound: new FormControl('', Validators.compose([
    //   Validators.required,
    //   Validators.minLength(2),
    //   Validators.maxLength(100),
    // ])),
    
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
    prompt: [
      {type: 'required', message: 'Prompt is required'},
      {type: 'minlength', message: 'Prompt must be at least 2 characters long'},
      {type: 'maxlength', message: 'Prompt cannot be more than 100 characters long'},
    ],
    // currentRound: [
    //   {type: 'required', message: 'Prompt is required'},
    //   {type: 'minlength', message: 'Prompt must be at least 2 characters long'},
    //   {type: 'maxlength', message: 'Prompt cannot be more than 100 characters long'},
    // ],
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
   
    this.gameService.addGame({joincode: this.addGameForm.value.joincode, players: [`${this.addGameForm.value.playerName}`], prompts: [`${this.addGameForm.value.prompt}`]}).subscribe({
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
