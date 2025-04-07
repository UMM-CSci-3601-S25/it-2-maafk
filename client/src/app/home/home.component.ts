

@Component({
  selector: 'app-home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
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
    MatGridListModule

  ]
})

export class HomeComponent {
  title = 'Humanity Against Appels';
}

