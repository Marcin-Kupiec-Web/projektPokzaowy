import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { RoleService } from './role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Role } from 'src/model/role';
import { Privilege } from 'src/model/privilege';
import { AuthenticationService } from 'src/services/auth.service';

export interface RestData {
  rlm: Role[];
  plm: Privilege[];
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss', '../../../../app.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class RoleComponent implements OnInit, AfterViewChecked  {
  roles!: Role[];
  restData!: RestData | any;
  selectedRoles: Role[] = [];
  privilegesSave!: Privilege[];
  rola = new Role();
  rolaDialog!: boolean;
  submitted!: boolean;
  loading = true;
  search!: string | null;
  public rolaForm!: FormGroup;

  constructor(private roleService: RoleService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private translateService: TranslateService,
              private config: PrimeNGConfig,
              private authenticationService: AuthenticationService,
              private readonly changeDetectorRef: ChangeDetectorRef
              ) {}

        ngAfterViewChecked(): void {
                this.changeDetectorRef.detectChanges();
              }

        ngOnInit(): void {
          this.roleService.findAll().subscribe(data => {
          this.restData = data;
          // tslint:disable-next-line:no-string-literal
          this.roles = this.restData['rlm'];
          // tslint:disable-next-line:no-string-literal
          this.privilegesSave = this.restData['plm'];
          this.loading = false;
       }, error => {this.loading = false; });

          this.rolaForm = new FormGroup({
        rolaName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        rolaPrvilege: new FormControl('', [Validators.required]),
        rolaPoziomUpr: new FormControl('', [Validators.required]),
       });

          this.translateLang('pl');
    }


    editRola(rola: Role): void {
      this.rola = {...rola};
      this.rolaDialog = true;
    }

  deleteRola(rola: Role): void {
      this.confirmationService.confirm({
          message: 'Usuniesz rolę: ' + rola.name + '?',
          header: 'Komunikat',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.roleRemove(rola);
              this.rola = new Role();
          }
      });
    }

    deleteSelectedRoles(): void {
      this.confirmationService.confirm({
          message: 'Uwaga, usuwasz role!',
          header: 'Komunikat',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              for (const row of this.selectedRoles) {
                this.roleRemove(row);
            }
          }
      });
    }

    saveRola(): void {
      this.submitted = true;

      if (this.rola.name.trim() && this.rola.privileges && this.rola.poziomUprawnien) {
          if (this.rola.id) {
            this.updateRola(this.rola);
            this.roles[this.findIndexById(this.rola.id)] = this.rola;
            this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Uaktualniono rolę.', life: 3000});
          } else {
            this.addRola(this.rola);
            this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Utworzono rolę.', life: 3000});
          }

          this.rolaDialog = false;
          this.rola = new Role();
      }
    }

     addRola(rola: Role): void {
       if (rola.name && rola.poziomUprawnien && rola.privileges) {
          this.loading = true;
          this.roleService.addRola(rola).subscribe(data => {
            this.roles.push(data);
            this.roles = [...this.roles];
            this.loading = false;
          });
      }
    }

    updateRola(rola: Role): void {
      if (rola.name) {
                 this.loading = true;
                 this.roleService.updateRola(rola).subscribe(data => {
                  rola.privilegesString = data.privilegesString ;
                  this.loading = false;
              });
      }
    }

    roleRemove(rola: Role): void {
      this.loading = true;
      this.roleService.removeRola(rola).subscribe(data => {
        this.loading = false;
        this.roles = this.roles.filter(val => val !== rola);
        this.selectedRoles = this.selectedRoles.filter(val => val !== rola);
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Usunięto rolę: ' + rola.name, life: 3000});
      }, error => {
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Rola: ' + rola.name + ' jest Używana!',
         life: 3000});
      });
    }

    openNew(): void {
      this.rolaForm.reset();
      this.rola = new Role();
      this.submitted = false;
      this.rolaDialog = true;
    }

    clear(table: Table): void {
    this.search = null;
    this.selectedRoles = [];
    table.filterGlobal(this.search, 'contains');
    table.clear();
    }

    findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.roles.length; i++) {
          if (this.roles[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }

  translateLang(lang: string): void {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}



