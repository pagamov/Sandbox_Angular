import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.styles.css'],
  templateUrl: './app.component.html'
})

export class AppComponent {
  text = {
    home: 'Home',
    login: 'Login',
    sign: 'Sign'
  };
}
