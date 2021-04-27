import { Injectable } from '@angular/core';
import { Rejestry } from 'src/model/rejestry';
import { AuthenticationService } from 'src/services/auth.service';
import { UsersModule } from '../auth-users/users/users.module';
import { RejestryService } from './rejestry.service';


export class RejestrySave {

private rejestr: Rejestry = new Rejestry();

  constructor(
    private authenticationService: AuthenticationService,
    private rejestryService: RejestryService
  ) {
  }

  logRejestr(akcja: string, obiekt: string, uwagi: string | null): void {
    if (this.authenticationService.getDecodeToken()) {
    this.rejestr.akcja = akcja;
    this.rejestr.obiekt = obiekt;
    this.rejestr.uwagi = uwagi;
    this.rejestr.uzytkownik = this.authenticationService.getDecodeToken().sub;
    this.rejestryService.addRejestr(this.rejestr).subscribe(dt => {
    });
  }
  }
}
