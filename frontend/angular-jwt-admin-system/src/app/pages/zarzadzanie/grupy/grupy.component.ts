import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GrupaService } from './grupy.service';
import { Grupa } from 'src/model/grupa';
import { AuthenticationService } from 'src/services/auth.service';


@Component({
  selector: 'app-zaklady',
  templateUrl: './grupy.component.html',
  styleUrls: ['./grupy.component.scss', '../../../app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GrupyComponent implements OnInit {
  groups!: Grupa[];
  group: Grupa = new Grupa();
  selectedGroups: Grupa[] = [];
  groupDialog!: boolean;
  submitted!: boolean;
  loading = true;
  search!: string | null;
  public groupForm!: FormGroup;

  constructor(private grupaService: GrupaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private translateService: TranslateService,
              private config: PrimeNGConfig,
              private authenticationService: AuthenticationService) {
                this.authenticationService.redirectIfforbidenPage();
               }

  ngOnInit(): void {
      this.grupaService.findAll().subscribe(data => {
        this.groups = data;
        this.loading = false;
  }, error => {this.loading = false; });

      this.groupForm = new FormGroup({
        groupName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
        groupShortName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
        groupDescription: new FormControl(''),
      });

      this.translateLang('pl');
}

editGroup(group: Grupa): void {
  this.group = {...group};
  this.groupDialog = true;
}

deleteGroup(group: Grupa): void {
  this.confirmationService.confirm({
      message: 'Usuniesz grupę: ' + group.name + '?',
      header: 'Komunikat',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.groupRemove(group);
          this.group = new Grupa();
      }
  });
}

deleteSelectedGroups(): void {
  this.confirmationService.confirm({
      message: 'Uwaga, usuwasz grupę/y!',
      header: 'Komunikat',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          for (const row of this.selectedGroups) {
            this.groupRemove(row);
        }
      }
  });
}

saveGroup(): void {
  this.submitted = true;

  if (this.group.name.trim() && this.group.shortName) {
      if (this.group.id) {
        this.updateGroup(this.group);
        this.groups[this.findIndexById(this.group.id)] = this.group;
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Uaktualniono grupę.', life: 3000});
      } else {
        this.addGroup(this.group);
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Utworzono grupę.', life: 3000});
      }
      this.groups = [...this.groups];
      this.groupDialog = false;
      this.group = new Grupa();
  }
}


  addGroup(grupa: Grupa): void {
      if (grupa.name && grupa.shortName) {
        this.loading = true;
        this.grupaService.addGrupa(grupa).subscribe(data => {
          this.groups.push(data);
          this.loading = false;
        });
    }
  }

  updateGroup(grupa: Grupa): void {
    if (grupa.name && grupa.shortName) {
        this.loading = true;
        this.grupaService.updateGrupa(grupa).subscribe(data => {
          this.loading = false;
            });
    }
  }


groupRemove(grupa: Grupa): void {
  this.loading = true;
  this.grupaService.removeGrupa(grupa).subscribe(data => {
    this.loading = false;
    this.groups = this.groups.filter(val => val.id !== grupa.id);
    this.selectedGroups = this.selectedGroups.filter(val => val.id !== grupa.id);
    this.messageService.add({severity: 'success', summary: 'Usunięto', detail: 'Grupa usunięta.', life: 3000});
  }, error => {
    this.loading = false;
    this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Grupa jest przypisana do użytkownika!', life: 3000});
  });
}



openNew(): void {
  this.groupForm.reset();
  this.group = new Grupa();
  this.submitted = false;
  this.groupDialog = true;
}

clear(table: Table): void {
  this.search = null;
  this.selectedGroups.length = 0;
  table.clear();
}

findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
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
