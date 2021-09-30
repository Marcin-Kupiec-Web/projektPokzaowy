import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcements } from 'src/model/announcements';
import { AnnouncementsImages } from 'src/model/AnnouncementsImages';
import { AnnouncementsService } from '../announcements.service';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{


  constructor(private activatedRoute: ActivatedRoute,
              private announcementsService: AnnouncementsService,
              private router: Router,
              private detailsService: DetailsService) { }

  idAnnouncement!: number;
  announcement: Announcements = new Announcements();
  images!: any[];
  isVisible = false;
  currentIndexImage!: number;
  countAllImages!: number;
  currentSlideSrc!: any;

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.idAnnouncement = params['id'];
      window.scrollTo(0,0);
    },)

    this.announcementsService.findById(this.idAnnouncement).subscribe( (data) =>
        {this.announcement = data;
          this.images = data.announcementsImagesCollection;
          this.images.forEach(val => val.source = 'data:image/png;base64,'+val.source)
          this.countAllImages = this.images.length;
    }
    )
  }


  goBack():void{
    this.router.navigate(['/announcements'], {fragment: this.idAnnouncement.toString()});
  }

  showModal(index: number): void {

    if(this.images[index]){
    this.currentIndexImage = index;
    this.isVisible = true;
    this.currentSlideSrc = this.images[index];

    }
  }

  currentSlide(index: number){
    this.currentSlideSrc = this.images[index];
    this.currentIndexImage = index;
  }
  plusSlides(index: number){
    let tempSlideIndex = this.currentIndexImage+index;
   if(this.images[tempSlideIndex])
   this.currentIndexImage = tempSlideIndex;
   else
   this.currentIndexImage = 0;
   this.currentSlideSrc = this.images[this.currentIndexImage];
  }

  minusSlides(index: number){
    let tempSlideIndex = this.currentIndexImage+index;
   if(this.images[tempSlideIndex])
   this.currentIndexImage = tempSlideIndex;
   else
   this.currentIndexImage = this.countAllImages-1;
   this.currentSlideSrc = this.images[this.currentIndexImage];
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
