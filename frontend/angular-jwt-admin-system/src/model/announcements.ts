import { User } from './user';

export class  Announcements {
    id!: number;
    title!: string;
    date!: Date;
    description!: string;
    user!: User;
}
