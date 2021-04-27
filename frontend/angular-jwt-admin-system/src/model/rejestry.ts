import { Data } from '@angular/router';

export class Rejestry {
    id!: number;
    akcja!: string;
    obiekt!: string;
    uzytkownik!: string;
    data!: Data;
    uwagi!: string | null;
}
