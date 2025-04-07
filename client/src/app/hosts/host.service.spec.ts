// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HostService } from './host.service';
// import { environment } from '../../environments/environment';
// //import { Host_Settings } from './host-settings';
// import { Prompt } from './prompt';

// describe('HostService', () => {
//   let service: HostService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [HostService]
//     });
//     service = TestBed.inject(HostService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//   /*
//   it('should retrieve rounds from the API via GET', () => {
//     const dummyRounds: Host_Settings[] = [
//       { id: '1', name: 'Round 1' },
//       { id: '2', name: 'Round 2' }
//     ];

//     service.getRounds().subscribe(rounds => {
//       expect(rounds.length).toBe(2);
//       expect(rounds).toEqual(dummyRounds);
//     });

//     const request = httpMock.expectOne(`${environment.apiUrl}prompts`);
//     expect(request.request.method).toBe('GET');
//     request.flush(dummyRounds);
//   });

//   it('should retrieve prompts from the API via GET', () => {
//     const dummyPrompts: Prompt[] = [
//       { id: '1', text: 'Prompt 1' },
//       { id: '2', text: 'Prompt 2' }
//     ];

//     service.getPrompts().subscribe(prompts => {
//       expect(prompts.length).toBe(2);
//       expect(prompts).toEqual(dummyPrompts);
//     });

//     const request = httpMock.expectOne(`${environment.apiUrl}prompts`);
//     expect(request.request.method).toBe('GET');
//     request.flush(dummyPrompts);
//   });
//   */
//   it('should add a new prompt and return its id', () => {
//     const newPrompt: Partial<Prompt> = { text: 'New Prompt' };
//     const response = { id: '123' };

//     service.addPrompt(newPrompt).subscribe(id => {
//       expect(id).toBe('123');
//     });

//     const request = httpMock.expectOne(`${environment.apiUrl}prompts`);
//     expect(request.request.method).toBe('POST');
//     request.flush(response);
//   });
// });
