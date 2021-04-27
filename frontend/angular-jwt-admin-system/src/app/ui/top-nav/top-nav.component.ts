import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/auth.service';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
     this.primengConfig.ripple = true;
  }

    logout(): void {
      this.authenticationService.logout();
      this.router.navigate(['/start']);
    }

    hasRole(rola: string): boolean {
      return this.authenticationService.hasRole(rola);
      }
}
