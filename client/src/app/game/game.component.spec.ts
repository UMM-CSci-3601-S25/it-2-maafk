import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HostService } from '../hosts/host.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [
        HttpClientTestingModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule
      ],
      providers: [ HostService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize prompts array', () => {
    expect(component.prompts).toBeDefined();
  });

  it('should generate a random ID of given length', () => {
    const id = component.generateRandomID(8);
    expect(id.length).toBe(8);
  });

  it('should add response when submitResponse is called', () => {
    component.responses['Test Prompt'] = 'Test Response';
    spyOn(console, 'log');

   component.submitResponse('Test Prompt');
    
    expect(console.log).toHaveBeenCalledWith('Response submitted: Test Response');
  });

});
