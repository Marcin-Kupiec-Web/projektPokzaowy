import { AnnouncementsImages } from './AnnouncementsImages';
import { Grupa } from './grupa';
import { User } from './user';

export class  Announcements {
  id!: number;
  title!: string;
  date!: Date;
  description!: string;
  user!: User;
  announcementsImagesCollection!: AnnouncementsImages[];
  groupCollection!: Grupa[];
}
