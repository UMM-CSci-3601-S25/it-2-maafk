import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HostComponent } from './host-list.component';
//import { By } from '@angular/platform-browser';

describe('HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        HostComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should navigate to /prompts when the settings button is clicked', () => {
    const button = fixture.debugElement.query(By.css('[routerLink="/prompts"]')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/prompts');
  });

  it('should navigate to /game/temporary when the create game button is clicked', () => {
    const button = fixture.debugElement.query(By.css('[routerLink="/game/temporary"]')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/game/temporary');
  });
  */
});

