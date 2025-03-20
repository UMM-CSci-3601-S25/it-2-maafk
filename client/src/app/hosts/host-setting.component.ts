import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { HostService } from './host.service';
@Component({
  selector: 'app-host-settings',
  templateUrl: './host-setting.component.html',
  styleUrls: ['./host-setting.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatIcon,
    MatSliderModule,
    MatListModule,
    RouterLink,

  ]
})
export class HostSettingsComponent {



  // Define a signal to hold the host prompt, initially undefined
  //hostPrompt = signal<string | undefined>(undefined);


  // Define a form group for adding a prompt with validation rules
  addPromptForm = new FormGroup({
    text: new FormControl('', Validators.compose([
      Validators.required, // Prompt is required
      Validators.minLength(2), // Minimum length of 3 characters
      Validators.maxLength(200) // Maximum length of 200 characters
    ]))
  });



  // Define validation messages for the prompt form control
  readonly addPromptValidationMessages = {
    text: [
      { type: 'required', message: 'Prompt text is required' },
      { type: 'minlength', message: 'Prompt must be at least 2 characters'},
      { type: 'maxlength', message: 'Prompt text cannot be more than 200 characters long' }
    ]
  };



  // Inject dependencies: MatSnackBar for displaying messages and Router for navigation
  constructor(
    private hostService: HostService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }



  // Check if a form control has an error and has been touched or is dirty
  formControlHasError(controlName: string): boolean {
    return this.addPromptForm.get(controlName).invalid &&
      (this.addPromptForm.get(controlName).dirty || this.addPromptForm.get(controlName).touched);
  }




  // Get the error message for a specific form control based on validation rules
  getErrorMessage(controlName: keyof typeof this.addPromptValidationMessages): string {
    for (const { type, message } of this.addPromptValidationMessages[controlName]) {
      if (this.addPromptForm.get(controlName).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }


  // Handle form submission
  submitPrompt() {
    console.log(this.addPromptForm.value);
    this.hostService.addPrompt(this.addPromptForm.value).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Prompt added with ID: ${newId} and text: ${this.addPromptForm.value.text}`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/prompts/']);
      },

      error: error => {
        this.snackBar.open(
          `Error adding prompt: ${error.message}`,
          'OK',
          { duration: 5000 }
        );
      },


    });
  }

}
