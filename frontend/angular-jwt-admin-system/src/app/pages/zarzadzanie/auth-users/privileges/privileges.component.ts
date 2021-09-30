import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrivilegesService } from './privileges.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Privilege } from 'src/model/privilege';
import { AuthenticationService } from 'src/services/auth.service';


@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss', '../../../../app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PrivilegesComponent implements OnInit, AfterViewChecked {
  privileges!: Privilege[];
  privilege: Privilege = new Privilege();
  selectedPrivileges: Privilege[] = [];
  privilegeDialog!: boolean;
  submitted!: boolean;
  loading = true;
  search!: string | null;
  public privilegeForm!: FormGroup;


  constructor(private privilegesService: PrivilegesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private translateService: TranslateService,
              private config: PrimeNGConfig,
              private readonly changeDetectorRef: ChangeDetectorRef
              ) { }
  ngAfterViewChecked(): void {}
  ngOnInit(): void {
        this.privilegesService.findAll().subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        this.privileges = data;
        this.loading = false;
   }, error => {this.loading = false; });
        this.privilegeForm = new FormGroup({
    privilegeName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)])
   });

        this.translateLang('pl');
  }

  editPrivilege(privilege: Privilege): void {
    this.privilege = {...privilege};
    this.privilegeDialog = true;
  }

  deletePrivilege(privilege: Privilege): void {
    this.confirmationService.confirm({
        message: 'Usuniesz uprawnienie: ' + privilege.name + '?',
        header: 'Komunikat',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.privilegeRemove(privilege);
            this.privilege = new Privilege();
        }
    });
  }

  deleteSelectedPrivileges(): void {
    this.confirmationService.confirm({
        message: 'Uwaga, usuwasz uprawnienie/a !',
        header: 'Komunikat',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            for (const row of this.selectedPrivileges) {
              this.privilegeRemove(row);
          }
        }
    });
  }

  savePrivilege(): void {
    this.submitted = true;

    if (this.privilege.name.trim()) {
        if (this.privilege.id) {
          this.updatePrivilege(this.privilege);
          this.privileges[this.findIndexById(this.privilege.id)] = this.privilege;
          this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Uaktualniono uprawnienie.', life: 3000});
        } else {
          this.addPrivilege(this.privilege);
          this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Utworzono uprawnienie.', life: 3000});
        }

        this.privilegeDialog = false;
        this.privilege = new Privilege();
    }
  }

  addPrivilege(privilege: Privilege): void {
    if (privilege.name) {
        this.loading = true;
        this.privilegesService.addPrivilege(privilege).subscribe(data => {
         this.privileges.push(data);
         //this.privileges = [...this.privileges];
         this.loading = false;
       });
   }
 }

  updatePrivilege(privilege: Privilege): void {
    if (privilege.name) {
               this.loading = true;
               this.privilegesService.updatePrivilege(privilege).subscribe(data => {
                this.loading = false;
            });
    }
}

  privilegeRemove(privilege: Privilege): void {
      this.loading = true;
      this.privilegesService.removePrivlege(privilege).subscribe(data => {
        this.loading = false;
        this.privileges = this.privileges.filter(val => val !== privilege);
        this.selectedPrivileges = this.selectedPrivileges.filter(val => val !== privilege);
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Usunięto uprawnienie: ' + privilege.name, life: 3000});
      }, error => {
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Uprawnienie: ' + privilege.name + ' jest Używane!',
         life: 3000});
      });
}

openNew(): void {
    this.privilegeForm.reset();
    this.privilege = new Privilege();
    this.submitted = false;
    this.privilegeDialog = true;
  }

clear(table: Table): void {
    this.search = null;
    this.selectedPrivileges = [];
    table.filterGlobal(this.search, 'contains');
    table.clear();
  }

findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.privileges.length; i++) {
        if (this.privileges[i].id === id) {
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
