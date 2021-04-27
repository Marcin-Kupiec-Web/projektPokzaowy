import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthenticationService } from 'src/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sideNawItems!: MenuItem[];
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.sideNawItems = [
      {
          label: 'Administracja',
          icon: 'pi pi-pw pi-cog',
          items: [{
                  label: 'Dostęp',
                  icon: 'pi pi-fw pi-lock',
                  items: [
                      {label: 'Użytkownicy', icon: 'pi pi-fw pi-user-plus', url: '/#/users'},
                      {label: 'Role', icon: 'pi pi-fw pi-eye', url: '/#/roles'},
                      {label: 'Uprawnienia', icon: 'pi pi-fw pi-star', url: '/#/privileges'},
                      {label: 'Grupy', icon: 'pi pi-fw pi-users', url: '/#/groups'}
                  ]
              },
              {label: 'Rejestry', icon: 'pi pi-fw pi-clock', url: '/#/rejestry'},
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
  hasRole(rola: string): boolean {
    return this.authenticationService.hasRole(rola);
    }
}
