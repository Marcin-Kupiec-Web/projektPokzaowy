import { User } from './user';
export class  Grupa {
    id!: number;
    name!: string;
    shortName!: string;
    description!: string;
    user!: User[];
}
