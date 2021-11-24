import { Component, OnInit, ViewChild, Inject, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { UsersService } from './users.service';
import { GrupaService } from '../../grupy/grupy.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Grupa } from 'src/model/grupa';
import { User } from 'src/model/user';
import { Role } from 'src/model/role';
import { AuthenticationService } from 'src/services/auth.service';
import { RejestrySave } from '../../rejestry/rejestry-save';
import { RejestryService } from '../../rejestry/rejestry.service';

export interface RestData {
  usersList: User[];
  rlm: Role[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../../../app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit, AfterViewChecked {
  groups!: Grupa[];
  users!: User[];
  user!: User;
  selectedUsers: User[] = [];
  roles: Role[] = [];
  restData: RestData | any;
  userDialog!: boolean;
  submitted!: boolean;
  loading = true;
  search!: string | null;
  displayBasic!: boolean;
  stateOptions: any[];
  public userForm!: FormGroup;
  private rejestrySave!: RejestrySave;

  constructor(private userService: UsersService, private grupaService: GrupaService,
              private messageService: MessageService, private confirmationService: ConfirmationService,
              private translateService: TranslateService, private config: PrimeNGConfig,
              private authenticationService: AuthenticationService,
              private rejestryService: RejestryService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
                this.stateOptions = [{label: 'blokada', value: false}, {label: 'aktywny', value: true}];
                this.rejestrySave = new RejestrySave(this.authenticationService, this.rejestryService);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
            this.translateLang('pl');
            this.userService.findAll().subscribe(data => {
              this.restData = data;
              // tslint:disable-next-line:no-string-literal
              this.users = this.restData['usersList'];
              // tslint:disable-next-line:no-string-literal
              this.roles = this.restData['rlm'];
              this.loading = false;

          }, error => {this.loading = false; });

            this.grupaService.findAll().subscribe(data => {
                    this.groups = data;
                  });

            this.userForm = new FormGroup({
                    nameUser: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
                    passUser: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
                    groupUser: new FormControl('', [Validators.required]),
                    roleUser: new FormControl('', [Validators.required]),
                    enableUser: new FormControl('', [Validators.required]),
                   });
}

  translateLang(lang: string): void {
      this.translateService.use(lang);
      this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    }

  editUser(user: User): void {
      this.user = {...user};
      this.userDialog = true;
      this.userForm.get('nameUser')?.setValue(this.user.username);
      this.userForm.get('groupUser')?.setValue(this.user.grupa);
      this.userForm.get('roleUser')?.setValue(this.user.roleCollection);
      this.userForm.get('enableUser')?.setValue(this.user.enabled);
    }

  saveUser(): void {
      this.submitted = true;
      this.user.enabled = this.userForm.value.enableUser;
      this.user.password = this.userForm.value.passUser;
      this.user.grupa = this.userForm.value.groupUser;
      this.user.roleCollection = this.userForm.value.roleUser;
      this.user.username = this.userForm.value.nameUser;

      if (this.user.username.trim() && this.user.password && this.user.roleCollection && this.user.grupa) {
        let findUser: User | undefined;
        if (this.user.id){
          findUser = this.users.find(us => us.username === this.user.username && us.id !== this.user.id);
        } else {
          findUser = this.users.find(us => us.username === this.user.username);
        }
        if (findUser === undefined){
          if (this.user.id) {
            this.updateUser(this.user);
            this.users[this.findIndexById(this.user.id)] = this.user;
          } else {
            this.addUser(this.user);
          }
      } else {
        if (this.user.id !== undefined){
        let us: User | any;
        this.userService.findById(this.user.id).subscribe(data => {
          us = data;
          this.user.username = us.username;
          this.loading = false;
          this.userDialog = true;
        }); }
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Użytkownik o podanej nazwie istnieje!', life: 3000});
}
    }
  }


deleteUser(user: User): void {
      this.confirmationService.confirm({
          message: 'Usuniesz użytkownika: ' + user.username + '?',
          header: 'Komunikat',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.removeUser(user);
              this.users = this.users.filter(val => val.id !== user.id);
              this.user = new User();
              this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Usunięto użytkownika.', life: 3000});
          }
      });
    }

deleteSelectedUsers(): void {
    this.confirmationService.confirm({
      message: 'Uwaga, usuwamy użytkownika?',
      header: 'Komunikat',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.users = this.users.filter(val => !this.selectedUsers.includes(val));

          for (const row of this.selectedUsers) {
            this.removeUser(row);
        }
          this.selectedUsers.length = 0;
          this.messageService.add({severity: 'success', summary: 'Usunięto', detail: 'Użytkowik usunięty.', life: 3000});
      }
  });
}


updateUser(user: User): void {

    this.loading = true;
    this.userService.updateUser(user).subscribe(data => {
                      user.roleCollectionToString = data.roleCollectionToString;
                      this.loading = false;
                      this.userDialog = false;
                      this.rejestrySave.logRejestr('aktualizacja', user.username + ' id: ' + user.id, null);
                      this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Uaktualniono dane.', life: 3000});
                      this.user = new User();
                    });
}

addUser(user: User): void {
        if (user.username && user.grupa && user.password && user.roleCollection) {
              this.loading = true;
              this.userService.addUser(user).subscribe(data => {
              this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Utworzono urzytkownika.', life: 3000});
              this.rejestrySave.logRejestr('zapis', user.username + ' id: ' + data.id, 'pierwsza rejestracja');
              this.userDialog = false;
              this.users.push(data);
              this.loading = false;
              this.users = [...this.users];
              this.user = new User();
              });

      }
}

 removeUser(user: User): void {
        this.loading = true;
        this.userService.removeUser(user).subscribe(data => {
          this.loading = false;
          this.rejestrySave.logRejestr('usunięcie', user.username + ' id: ' + user.id, null);
        });
}


  openNew(): void {
      this.userForm.reset();
      this.user = new User();
      this.submitted = false;
      this.userDialog = true;
    }

  clear(table: Table): void {
      this.search = null;
      this.selectedUsers.length = 0;
      table.clear();
    }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

}

