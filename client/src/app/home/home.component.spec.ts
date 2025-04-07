// import { TestBed, waitForAsync } from '@angular/core/testing';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';
// import { HomeComponent } from './home.component';
// import { By } from '@angular/platform-browser';

// describe('HomeComponent', () => {
//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         BrowserAnimationsModule,
//         RouterModule.forRoot([]),
//         MatToolbarModule,
//         MatIconModule,
//         MatSidenavModule,
//         MatCardModule,
//         MatListModule,
//         HomeComponent
//       ],
//     }).compileComponents();
//   }));

//   it('should create home', () => {
//     const fixture = TestBed.createComponent(HomeComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it("should have as title 'Humanity Against Appels'", () => {
//     const fixture = TestBed.createComponent(HomeComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('Humanity Against Appels');
//   });

//   it('should have a button to join a game', () => {
//     const fixture = TestBed.createComponent(HomeComponent);
//     fixture.detectChanges();
//     const joinButton = fixture.debugElement.query(By.css('[routerLink="/player"]'));
//     expect(joinButton).toBeTruthy();
//     expect(joinButton.nativeElement.textContent).toContain('Join a game');
//   });

//  it('should have a button to host a game', () => {
//    const fixture = TestBed.createComponent(HomeComponent);
//    fixture.detectChanges();
//    const hostButton = fixture.debugElement.query(By.css('[routerLink="/host"]'));
//    expect(hostButton).toBeTruthy();
//    expect(hostButton.nativeElement.textContent).toContain('Host a game');
//  });
// });

// //   it('should navigate to /host when the host button is clicked', () => {
// //     const fixture = TestBed.createComponent(HomeComponent);
// //     fixture.detectChanges();
// //     const hostButton = fixture.debugElement.query(By.css('[routerLink="/host"]'));
// //     hostButton.triggerEventHandler('click', null);
// //     fixture.detectChanges();
// //     const routerLinkInstance = hostButton.injector.get(RouterLinkWithHref);
// //     expect(routerLinkInstance.routerLink).toBe('/host');
// //   });

// //   it('should navigate to /player when the join button is clicked', () => {
// //     const fixture = TestBed.createComponent(HomeComponent);
// //     fixture.detectChanges();
// //     const joinButton = fixture.debugElement.query(By.css('[routerLink="/player"]'));
// //     joinButton.triggerEventHandler('click', null);
// //     fixture.detectChanges();
// //     const routerLinkInstance = joinButton.injector.get(RouterLinkWithHref);
// //     expect(routerLinkInstance.routerLink).toBe('/player');
// //   });

// //   it('should have a floating action button to go back', () => {
// //     const fixture = TestBed.createComponent(HomeComponent);
// //     fixture.detectChanges();
// //     const backButton = fixture.debugElement.query(By.css('.add-user-fab'));
// //     expect(backButton).toBeTruthy();
// //   });

// //   it('should have a mat-icon inside the floating action button', () => {
// //     const fixture = TestBed.createComponent(HomeComponent);
// //     fixture.detectChanges();
// //     const backButtonIcon = fixture.debugElement.query(By.css('.add-user-fab mat-icon'));
// //     expect(backButtonIcon).toBeTruthy();
// //     expect(backButtonIcon.nativeElement.textContent).toContain('subdirectory_arrow_left');
// //   });
// // });
