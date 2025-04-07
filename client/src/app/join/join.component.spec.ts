import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinComponent } from './join.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../game/game.service';
import { WebSocketService } from '../game/web-socket.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let webSocketSpy: jasmine.SpyObj<WebSocketService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj('GameService', ['addPlayer']);
    webSocketSpy = jasmine.createSpyObj('WebSocketService', ['sendMessage']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        JoinComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterTestingModule,
        NoopAnimationsModule // Fixes animation-related test issues
      ],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: WebSocketService, useValue: webSocketSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.joinGameForm.valid).toBeFalse();
  });

  it('should have a valid form when correctly filled', () => {
    component.joinGameForm.setValue({
      gameId: 'A1B2C3D4E5F6789012345678',
      playerName: 'Test Player'
    });
    expect(component.joinGameForm.valid).toBeTrue();
  });

  it('should show validation error if required fields are missing', () => {
    const gameIdControl = component.joinGameForm.get('gameId');
    gameIdControl.setValue('');
    fixture.detectChanges();
    expect(gameIdControl.valid).toBeFalse();
  });

  it('should call addPlayer on submit and navigate correctly', () => {
    component.joinGameForm.setValue({
      gameId: 'A1B2C3D4E5F6789012345678',
      playerName: 'Test Player'
    });

    gameServiceSpy.addPlayer.and.returnValue(of(null)); // Simulating successful response

    component.submitForm();

    expect(gameServiceSpy.addPlayer).toHaveBeenCalled();
    expect(webSocketSpy.sendMessage).toHaveBeenCalledWith({
      type: 'ADD_PLAYER',
      gameId: 'A1B2C3D4E5F6789012345678',
      playerName: 'Test Player'
    });

    // Fixed assertion to match actual navigation call
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/games/${component.joinGameForm.value.gameId}`]);
  });
});
