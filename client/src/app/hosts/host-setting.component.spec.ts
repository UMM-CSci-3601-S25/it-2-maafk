import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostComponent } from './host-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', ['addGame']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HostComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterTestingModule,
        NoopAnimationsModule // Fix: Prevents animation-related errors
      ],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.addGameForm.valid).toBeFalse();
  });

  it('should have a valid form when correctly filled', () => {
    component.addGameForm.setValue({
      joincode: 'ABC123',
      playerName: 'Test Player',
      prompt: 'Sample prompt'
    });
    expect(component.addGameForm.valid).toBeTrue();
  });

  it('should show validation error if required fields are missing', () => {
    const joincodeControl = component.addGameForm.get('joincode');
    joincodeControl.setValue('');
    fixture.detectChanges();
    expect(joincodeControl.valid).toBeFalse();
  });

  it('should call addGame on submit and navigate correctly', () => {
    component.addGameForm.setValue({
      joincode: 'ABC123',
      playerName: 'Test Player',
      prompt: 'Sample prompt'
    });

    const mockResponse = 'test123'; // Ensuring the observable returns just a string
    gameServiceSpy.addGame.and.returnValue(of(mockResponse));

    component.submitForm();

    expect(gameServiceSpy.addGame).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/games/', mockResponse]);
  });
});

