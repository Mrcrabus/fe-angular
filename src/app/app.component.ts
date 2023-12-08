import {Component, OnInit} from '@angular/core';
import {TokenService} from './services/token.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private readonly tokenService: TokenService) {
  }

  public ngOnInit(): void {
    if(this.tokenService.AccessToken) {
      this.tokenService.refreshTokens().subscribe();
    }
  }


}
