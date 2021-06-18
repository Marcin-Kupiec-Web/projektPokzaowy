import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Announcements } from 'src/model/announcements';
import { AnnouncementsService } from './announcements.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/services/auth.service';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AnnouncementsComponent implements OnInit {

  announcementsList!: Announcements[];
  public announcementForm!: FormGroup;
  sortField!: string;
  sortOrder!: number;
  sortOptions!: SelectItem[];
  sortKey = '';
  announcementDialog!: boolean;
  announcement: Announcements = new Announcements();
  submitted!: boolean;
  loading!: boolean;
  constructor(private announcementsService: AnnouncementsService,
              private translateService: TranslateService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService,
              private config: PrimeNGConfig) { }

  ngOnInit(): void {
    this.announcementsService.findAll().subscribe(data => {
      setTimeout(() => {this.announcementsList = data; }, 250);
});

    this.announcementForm = new FormGroup({
      announcementTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      announcementDescription: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    });

    this.sortOptions = [
      {label: 'Data malejąco', value: '!date'},
      {label: 'Data rosnąco', value: 'date'},
      {label: 'Tytuł malejąco', value: '!date'},
      {label: 'Tytuł rosnąco', value: 'date'}
  ];
    this.translateLang('pl');
}
translateLang(lang: string): void {
  this.translateService.use(lang);
  this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  onSortChange(event: { value: any; }): void {
    const value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}


openNew(): void {
  this.announcementForm.reset();
  this.announcement = new Announcements();
  this.submitted = false;
  this.announcementDialog = true;
}

saveAnnouncement(): void {
  this.submitted = true;

  if (this.announcement.title.trim() && this.announcement.description) {
      if (this.announcement.id) {
        this.updateAnnouncement();
        this.announcementsList[this.findIndexById(this.announcement.id)] = this.announcement;
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Uaktualniono ogłoszenie.', life: 3000});
      } else {
        this.addAnnouncement();
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Utworzono ogłoszenie.', life: 3000});
      }
      this.announcementDialog = false;
      this.announcement = new Announcements();
  }
}

updateAnnouncement(): void {
  if (this.announcement.title && this.announcement.description) {
      this.loading = true;
      this.announcementsService.updateAnnouncement(this.announcement).subscribe(data => {
        this.announcementsList = [...this.announcementsList];
        this.loading = false;
          });
  }
}

addAnnouncement(): void {
  if (this.announcement.title && this.announcement.description) {
    this.announcementsService.addAnnouncement(this.announcement).subscribe(data => {
      this.announcementsList.push(data);
      this.announcementsList = [...this.announcementsList];
    });
}
}

editAnnouncement(anno: Announcements): void {
  this.announcement = {...anno};
  this.announcementDialog = true;
}

deleteAnnouncement(anno: Announcements): void {
  this.confirmationService.confirm({
      message: 'Usuniesz ogłoszenie: ' + anno.title + '?',
      header: 'Komunikat',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.announcementRemove(anno);
          this.announcement = new Announcements();
      }
  });
}

announcementRemove(anno: Announcements): void {
  this.loading = true;
  this.announcementsService.removeAnnouncement(anno).subscribe(data => {
    this.loading = false;
    this.announcementsList = this.announcementsList.filter(val => val.id !== anno.id);
    this.messageService.add({severity: 'success', summary: 'Usunięto', detail: 'Ogłoszenie usunięto.', life: 3000});
  }, error => {
    this.loading = false;
    this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Nie można usunąć!', life: 3000});
  });
}

findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.announcementsList.length; i++) {
      if (this.announcementsList[i].id === id) {
          index = i;
          break;
      }
  }
  return index;
}

hasRole(rola: string[]): boolean {
  return this.authenticationService.hasRole(rola);
  }
}
