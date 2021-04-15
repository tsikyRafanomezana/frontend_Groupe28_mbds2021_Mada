import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../shared/matiere.service';
import { Matiere } from './matiere.model';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {

  matiere:Matiere[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  constructor(private matiereService:MatiereService) { }

  ngOnInit(): void {
    /*this.matiereService.getMatiereAsPromise().then(matieres => {
      this.matiere = matieres;
      console.log("données reçues avec Promise");
    });*/
    this.matiereService.getMatieresPagine(this.page, this.limit)
      .subscribe(data => {
        this.matiere = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");
      });
  }

}
