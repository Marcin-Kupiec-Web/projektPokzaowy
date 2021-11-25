import { Component, OnInit, ViewChild } from '@angular/core';
import { RejestryService } from './rejestry.service';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Rejestry } from 'src/model/rejestry';
import { AuthenticationService } from 'src/services/auth.service';
@Component({
  selector: 'app-rejestry',
  templateUrl: './rejestry.component.html',
  styleUrls: ['./rejestry.component.scss']
})
export class RejestryComponent implements OnInit {
  rejestry!: Rejestry[];
loading = true;
  search!: string | null;

  constructor(private rejestryService: RejestryService,
              private translateService: TranslateService,
              private config: PrimeNGConfig,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.translateLang('pl');
    this.rejestryService.findAll().subscribe(data => {
      this.rejestry = data;
      setTimeout(() =>{
        this.loading = false;
      },300);
    }, error => {this.loading = false; });

  }

  clear(table: Table): void {
    this.search = null;
    table.clear();
    table.filterGlobal(this.search, 'contains');
  }
    translateLang(lang: string): void {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
