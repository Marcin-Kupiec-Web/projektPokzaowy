import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthenticationService } from 'src/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, AfterViewInit {
  sideNawItems!: MenuItem[];
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  ngAfterViewInit(): void {
    this.activeMenu();
  }

  ngOnInit(): void {

    this.sideNawItems = [
      {
        label: 'Start',
        icon: 'pi pi-pw pi-home',
        routerLink: ['/start'],
      },
      {
          label: 'Administracja',
          icon: 'pi pi-pw pi-cog',
          expanded: this.checkActiveState(['/users', '/roles', '/privileges', '/groups', '/rejestry']),
          items: [{
                  label: 'Dostęp',
                  icon: 'pi pi-fw pi-lock',
                  expanded: this.checkActiveState(['/users', '/roles', '/privileges', '/groups']),
                  items: [
                      {label: 'Użytkownicy ',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/users'],
                        id: 'users'
                      },
                      {label: 'Role',
                        icon: 'pi pi-fw pi-eye',
                        id: 'roles',
                        routerLink: ['roles']
                      },
                      {label: 'Uprawnienia',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['privileges'],
                        id: 'privileges'
                      },
                      {label: 'Grupy',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['groups'],
                        id: 'groups'
                      },
                  ]
              },
              {label: 'Rejestry',
                icon: 'pi pi-fw pi-clock',
                routerLink: ['rejestry'],
                id: 'rejestry'
              }

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
                      },
              ]}
          ]

      },
      {label: 'Wyloguj',
      icon: 'pi pi-fw pi-times',
      url: '/#/login',
      styleClass: 'ble'}
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

activeMenu() {
  this.routerActiveLink("actives", "p-menuitem-link")
this.router.events.subscribe(() =>{
  this.routerActiveLink("actives", "p-menuitem-link")
})

  }

 routerActiveLink(classActiv: string, cla: string){
  let menuitem = document.getElementsByClassName(cla);
  for (let i = 0; i < menuitem.length; i++) {
    menuitem[i].classList.remove(classActiv);
  }
  document.getElementById(this.router.url.substr(1))?.classList.add(classActiv);
 }
}
