import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Announcements } from 'src/model/announcements';
import { AnnouncementsImages } from 'src/model/AnnouncementsImages';
import { MFileManagerService } from './m-file-manager.service';

export class ImageDetailsSave {
  id?: number;
  title?: string;
  alt?: string;
  description?: string;
  main?: boolean;
}


@Component({
  selector: 'app-m-file-manager',
  templateUrl: './m-file-manager.component.html',
  styleUrls: ['./m-file-manager.component.scss']
})
export class MFileManagerComponent implements OnInit {


  @Input()
  announcement!: Announcements;
  @Output() announementChange = new EventEmitter<any>();

  uploadedFiles: any[]= [];
  fileManagerDialog!: boolean;
  public fileManagerForm!: FormGroup;
  announcementsImages!: AnnouncementsImages;
  imgdetailssave!: ImageDetailsSave;

  constructor(private messageService: MessageService,
    private mFileManagerService: MFileManagerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.fileManagerForm = new FormGroup({
      announcementImagesTitle: new FormControl('', [Validators.maxLength(60)]),
      announcementImagesAlt: new FormControl('', [Validators.maxLength(30)]),
      announcementImagesMain: new FormControl('', []),
      announcementImagesDescription: new FormControl('', [Validators.maxLength(200)]),
    });
  }

  openFileManagerDialog(file: any): void {
    this.fileManagerForm.reset();
    this.announcementsImages = file;
    this.fileManagerDialog = true;
  }

  uniqTable(data:any, key:any){
    return [...new Map(data.map((x: any) => [key(x),x])).values()]
    }

    onUpload(event: any,id: number) {
      if(this.uploadedFiles.length > 0){
         this.sendImage(id.toString());

         this.uploadedFiles = [];
         this.messageService.add({severity: 'info', summary: 'Plik przesłano', detail: ''});
      }
  }

  imageDetailsUpdate(announcementsImages: AnnouncementsImages) {
    this.fileManagerDialog=false;
    if(announcementsImages.id !== undefined){
      this.imgdetailssave = new ImageDetailsSave();
      this.imgdetailssave.id = announcementsImages.id;
      this.imgdetailssave.alt = announcementsImages.alt;
      this.imgdetailssave.title = announcementsImages.title;
      this.imgdetailssave.description = announcementsImages.description;
      this.imgdetailssave.main = announcementsImages.main;
      this.mFileManagerService.updateImgDetails(this.imgdetailssave).subscribe();


    }
}
onMainChanged(main: boolean){
  if(this.announcementsImages.main === true){
    this.announcement.announcementsImagesCollection.forEach(val => {
      if(val.id !== this.announcementsImages.id )
      val.main = false});
  }
}
  onFileChanged(event: any) {
    for(let file of event.target.files) {
      if(file.type.startsWith('image/')){
      let announIm: AnnouncementsImages = new AnnouncementsImages();
      announIm.source = file;
      announIm.main = false;
      this.uploadedFiles.push(announIm);
      }
      else
      this.messageService.add({severity: 'error', summary: 'Błędny format!', detail: 'Tylko plik graficzne.'});
  }
  this.uploadedFiles = this.uniqTable(this.uploadedFiles, (it: { source: any; }) => it.source.name)
  event.target.value = '';
  }

  sendImage(id: string){
    const formData = new FormData();
    let mainImg = false;
    this.uploadedFiles.forEach((file) => {

      formData.append('files[]', file.source);
      formData.append('alt[]', file.alt);
      formData.append('title[]', file.title);
      formData.append('description[]', file.description);

      if(mainImg)
        file.main = false;

      formData.append('main[]', file.main);

      if(file.main == true)
      mainImg == true;

      if(file.main === true){
        this.announcement.announcementsImagesCollection.forEach(val => val.main = false);
      }
   /*
      let annoImg: AnnouncementsImages = new AnnouncementsImages;
      var reader = new FileReader();
        reader.readAsDataURL(file.source);
        reader.onload = () => {
        annoImg.source = reader.result;
        annoImg.source = annoImg.source.split(',')[1];
        this.announcement.announcementsImagesCollection.push(annoImg);
    };

*/
    });
    formData.append("announcementId", id);
    formData.append("reportProgress", "true");
    let getImages: any[] = [];
    this.mFileManagerService.sendAnnouncementImage(formData).subscribe( data => {
      this.announcement.announcementsImagesCollection.push(...data);
    });
// alert(getImages.length);
  }

  deleteUpload(inputFieldUpload: any, fileInput: any) {
    this.uploadedFiles = this.uploadedFiles.filter(file => file.source.name != inputFieldUpload.source.name);
    fileInput.value = '';
    }

    removeAnnouncementImg(idImage: number){
      this.mFileManagerService.removeAnnouncementImage(idImage).subscribe(data => {
        this.announcement.announcementsImagesCollection = this.announcement.announcementsImagesCollection.filter(idi => idi.id !== data.id);
      });

      this.messageService.add({severity: 'info', summary: 'Plik usunięto', detail: ''});
    }

    deleteSelectedImg(idImage: number): void {
      this.mFileManagerService.removeAnnouncementImage(idImage).subscribe(data => {
        this.announcement.announcementsImagesCollection = this.announcement.announcementsImagesCollection.filter(idi => idi.id !== data.id);
        this.announementChange.emit(this.announcement);
      });

      this.messageService.add({severity: 'info', summary: 'Plik usunięto', detail: ''});
    }
}
