import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Rejestry } from 'src/model/rejestry';
import { AuthenticationService } from 'src/services/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  private rejestr: Rejestry = new Rejestry();

  signin!: FormGroup;

  constructor(private primengConfig: PrimeNGConfig,
              private router: Router,
              private authenticationService: AuthenticationService,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.primengConfig.ripple = true;
    this.signin = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }


    // ---------------------------------- click zaloguj --------------------------------
  onLogin(): void {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((data) => {
        this.logRejestr();
        this.router.navigate(['/start']);
      }, () => {this.authenticationService.logout();
      });
}
// ----------------------------------- zapisanie w rejestrach ------------------------
logRejestr(): void {
  this.rejestr.akcja = 'logowanie';
  this.rejestr.obiekt = 'użytkownik';
}

}
