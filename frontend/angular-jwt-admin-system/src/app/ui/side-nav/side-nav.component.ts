import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthenticationService } from 'src/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sideNawItems!: MenuItem[];
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.sideNawItems = [
      {
          label: 'Administracja',
          icon: 'pi pi-pw pi-cog',
          expanded: this.checkActiveState(['/users', '/roles', '/privileges', '/groups', '/rejestry']),
          items: [{
                  label: 'Dostęp',
                  icon: 'pi pi-fw pi-lock',
                  expanded: this.checkActiveState(['/users', '/roles', '/privileges', '/groups']),
                  items: [
                      {label: 'Użytkownicy',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['users']},
                      {label: 'Role',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['roles']},
                      {label: 'Uprawnienia',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['privileges']},
                      {label: 'Grupy',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['groups']}
                  ]
              },
              {label: 'Rejestry',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['rejestry']},
              {separator: true},
              {label: 'Wyloguj', icon: 'pi pi-fw pi-times', url: '/#/login'}
          ]
      },
      {
          label: 'Help',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents',
                  icon: 'pi pi-pi pi-bars'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-pi pi-search',
                  items: [
                      {
                          label: 'Text',
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'User',
                          icon: 'pi pi-fw pi-file',
                      }
              ]}
          ]
      }
  ];
  }
  hasRole(rola: string[]): boolean {
    return this.authenticationService.hasRole(rola);
    }

    checkActiveState(givenLink: string[]): boolean {
        for (const i in givenLink){
        if (this.router.url.indexOf(givenLink[i]) > -1) {
          return true;
        }
    }
        return false;
}
}
