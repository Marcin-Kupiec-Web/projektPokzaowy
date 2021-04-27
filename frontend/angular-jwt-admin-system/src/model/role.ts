import { User } from './user';
import { Privilege } from './privilege';

export class Role {
    id!: number;
    name!: string;
    userCollection!: User[];
    poziomUprawnien!: number;
    privileges!: Privilege[];
    privilegesString!: string;

}
