import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSliderModule} from '@angular/material/slider'
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSliderModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'intranet';
}
