import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Announcements } from 'src/model/announcements';
import { AnnouncementsService } from './announcements.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/services/auth.service';
import { ViewportScroller, Location } from '@angular/common';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { iphost } from 'src/app/global-viable';
import { GrupaService } from '../zarzadzanie/grupy/grupy.service';
import { Grupa } from 'src/model/grupa';
import { filter, pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AnnouncementsComponent implements OnInit, AfterViewChecked, OnDestroy {

  @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event: any) {
        this.firstVisit = false;
}

  announcementsList!: Announcements[];
  public announcementForm!: FormGroup;
  sortField!: string;
  sortOrder!: number;
  sortOptions!: SelectItem[];
  sortKey: string | null = '';
  firstVisit = true;
  announcementDialog!: boolean;
  announcement: any = {};
  submitted!: boolean;
  loading!: boolean;
  fragment: string;
  gridOrList = 'grid';
  usersAuthentic!: any;
  findWord: any;
  groups!: Grupa[];
  subscribt!: Subscription;
  constructor(private announcementsService: AnnouncementsService,
              private translateService: TranslateService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService,
              private grupaService: GrupaService,
              private viewportScroller: ViewportScroller,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private config: PrimeNGConfig) {
                this.fragment = this.route.snapshot.fragment;
                this.translateLang('pl');

                this.subscribt = this.router.events
                .pipe(filter((e: any) => e instanceof RoutesRecognized),
                  pairwise()
                ).subscribe((e: any) => {
                  let url: string = e[0].urlAfterRedirects;

                  if(url.indexOf('announcement') < 0 ){ // url !== 'announcemets && url !== announcement-detail then remove sessionStor
                    sessionStorage.removeItem('findWord');
                    sessionStorage.removeItem('sortValue');
                    sessionStorage.removeItem('sortKey');
                  }

            });


              }
  ngOnDestroy(): void {
    this.subscribt.unsubscribe();
  }


    ngAfterViewChecked(): void {
      this.route.fragment.subscribe((fragment: string)=>{
            if(fragment!==null && fragment!==undefined && this.firstVisit){
            this.viewportScroller.scrollToAnchor(fragment);
            window.scrollBy(0,-50);
          //  window.scrollBy({ top: -50, behavior: 'smooth' });
            this.location.replaceState('/announcements');
          }
      })
  }

  ngOnInit(): void {
    this.findWord = sessionStorage.getItem('findWord');

    if(sessionStorage.getItem('findWord')){
    this.announcementsService.findByWord(this.findWord).subscribe(data => {
      setTimeout(() => {this.announcementsList = data; }, 250);
    });}
    else
    this.announcementsService.findAll().subscribe(data => {
      setTimeout(() => {this.announcementsList = data; }, 250);
    });

    this.announcementForm = new FormGroup({
      announcementTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      announcementDescription: new FormControl('', [Validators.required, Validators.minLength(1)]),
      announcementGroupCollection: new FormControl('')
    });

    this.sortOptions = [
      {label: 'Data malejąco', value: '!date'},
      {label: 'Data rosnąco', value: 'date'},
      {label: 'Tytuł malejąco', value: '!title'},
      {label: 'Tytuł rosnąco', value: 'title'}
    ];

    if(sessionStorage.getItem('sortValue')) {
      this.onSortChange({value: sessionStorage.getItem('sortValue')})
      this.sortKey =  sessionStorage.getItem('sortKey');
    }


    if(this.authenticationService.loggedIn){
      this.authenticationService.getUserAuthentic().subscribe(val => {
        this.usersAuthentic = val;
      })

      this.grupaService.findAll().subscribe(data => {
        this.groups = data;
      });
  }

}

  findAnnoByWord(){

    if(this.findWord != undefined && this.findWord.trim().length > 0){
      sessionStorage.setItem('findWord',this.findWord);
    this.announcementsService.findByWord(this.findWord).subscribe(data => {
      setTimeout(() => {this.announcementsList = data; }, 250);
    });}
    else{
    delete sessionStorage.findWord;
    this.announcementsService.findAll().subscribe(data => {
      setTimeout(() => {this.announcementsList = data; }, 250);
    });
  }

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

    sessionStorage.setItem('sortValue',value);
    if(this.sortKey)
    sessionStorage.setItem('sortKey',this.sortKey);

}

  changeFilter(event: any){
    sessionStorage.setItem('filterValue',event.target.value);
  }

  openNew(): void {
    this.announcementForm.reset();
    this.announcement = {};
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
        // this.announcementDialog = false;
        // this.announcement = new Announcements();
    }
  }

  updateAnnouncement(): void {
    if (this.announcement.title && this.announcement.description) {
        this.loading = true;
        this.announcementsService.updateAnnouncement(this.announcement).subscribe(data => {
         this.announcementsList = [... this.announcementsList];
          this.loading = false;
            });
    }
  }

  addAnnouncement(): void {
    if (this.announcement.title && this.announcement.description) {
      this.announcementsService.addAnnouncement(this.announcement).subscribe(data => {
        this.announcement = data;
        this.announcementsList = [... this.announcementsList, data];
      });

  }
  }

  editAnnouncement(anno: Announcements): void {
     this.announcementForm.reset();
    this.announcement = {};
    this.announcement.id = anno.id;
    this.announcement.announcementsImagesCollection = anno.announcementsImagesCollection;
    this.announcement.date = anno.date;
    this.announcement.description = anno.description;
    this.announcement.title = anno.title;
    this.announcement.user = anno.user;

    this.announcement.groupCollection = anno.groupCollection;

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

  announcementChange(event: any){
    this.announcementsList[this.findIndexById(event.id)] = event;
    this.announcementsList = [... this.announcementsList];
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
    hasPrivileges(privilege: string[]): boolean {
      return this.authenticationService.hasPrivilege(privilege);
      }
    levelPrivileges(gt: any, lt:any){
      return this.authenticationService.levelPrivilege(this.usersAuthentic.roleCollection,gt,lt);
      }
  getUrlAnnouncement(id: number){
    return iphost+"/systemApp/restControllerAppAnnouncements/updateAnnouncements"
  }

  private handleImageRetrievalError(err: Error) {
    console.error(err);
  }

  checkUser(iduserAnnouncement: number): boolean{
    if(this.authenticationService.loggedIn)
    return (iduserAnnouncement === this.usersAuthentic.id || this.levelPrivileges(null, 3)) && this.hasPrivileges(['WRITE_PRIVILEGE'])
    return false
  }


/*
  private createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
      }, false);

      reader.readAsDataURL(image);
    }
  }

  public getImage(id: number) {
    this.announcementsService.fetchAnnouncementImage(id)
    .subscribe(image => this.createImage(image),
    err => this.handleImageRetrievalError(err));
  }

*/


}
