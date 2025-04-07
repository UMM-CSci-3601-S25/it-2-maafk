
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, RouterOutlet]
})
export class AppComponent {
  title = 'humanity against appels';
}