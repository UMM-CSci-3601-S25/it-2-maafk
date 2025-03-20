import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from './player.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-player-list-component',
  templateUrl: 'player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  providers: [],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatGridListModule,
  ],
})
export class AddPlayerComponent {




  // Define a signal to hold the player player, initially undefined
  //playerPlayer = signal<string | undefined>(undefined);


  // Define a form group for adding a player with validation rules
  addPlayerForm = new FormGroup({
    name: new FormControl('', Validators.compose([
      Validators.required, // Player is required
      Validators.minLength(2), // Minimum length of 3 characters
      Validators.maxLength(200) // Maximum length of 200 characters
    ]))
  });



  // Define validation messages for the player form control
  readonly addPlayerValidationMessages = {
    name: [
      { type: 'required', message: 'Player name is required' },
      { type: 'minlength', message: 'Player must be at least 2 characters'},
      { type: 'maxlength', message: 'Player name cannot be more than 200 characters long' }
    ]
  };



  // Inject dependencies: MatSnackBar for displaying messages and Router for navigation
  constructor(
    private playerService: PlayerService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }



  // Check if a form control has an error and has been touched or is dirty
  formControlHasError(controlName: string): boolean {
    return this.addPlayerForm.get(controlName).invalid &&
      (this.addPlayerForm.get(controlName).dirty || this.addPlayerForm.get(controlName).touched);
  }




  // Get the error message for a specific form control based on validation rules
  getErrorMessage(controlName: keyof typeof this.addPlayerValidationMessages): string {
    for (const { type, message } of this.addPlayerValidationMessages[controlName]) {
      if (this.addPlayerForm.get(controlName).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }


  // Handle form submission
  submitPlayer() {
    console.log(this.addPlayerForm.value);
    this.playerService.addPlayer(this.addPlayerForm.value).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Player added with ID: ${newId} and name: ${this.addPlayerForm.value.name}`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/players/']);
      },

      error: error => {
        this.snackBar.open(
          `Error adding player: ${error.message}`,
          'OK',
          { duration: 5000 }
        );
      },


    });
  }







}
