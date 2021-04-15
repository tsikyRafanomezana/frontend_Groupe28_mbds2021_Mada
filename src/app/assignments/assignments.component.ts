import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments:Assignment[];
  assignmentsRendu:Assignment[];
  assignmentsNonRendu:Assignment[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,private router:Router,private authService: AuthService) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');

    // on utilise le service pour récupérer les
    // assignments à afficher

      //this.getListAssignments();
        this.getListAssignmentsRendu();
        this.getListAssignmentsNonRendu();
      /*
      this.assignmentsService.getAssignmentsAsPromise().then(assignments => {
        this.assignments = assignments;
        console.log("données reçues avec Promise");

      });
    */
      console.log("getAssignments() du service appelé");
  }

  getListAssignments(){
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log(this.assignments);
        console.log("données reçues");
      });
  }

  getListAssignmentsRendu(){
    this.assignmentsService.getAssignmentsPagineRendu(this.page, this.limit)
      .subscribe(data => {
        this.assignmentsRendu = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log(this.assignmentsRendu);
        console.log("données reçues");
      });
  }
  getListAssignmentsNonRendu(){
    this.assignmentsService.getAssignmentsPagineNonRendu(this.page, this.limit)
      .subscribe(data => {
        this.assignmentsNonRendu = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log(this.assignmentsNonRendu);
        console.log("données reçues");
      });
  }
 
  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }

  pageSuivant(){
    //if(!this.hasNextPage) return;
    this.page = this.nextPage;
    this.getListAssignments();
  }
  pagePrecedent(){
    //if(!this.hasPrevPage) return ;
    this.page = this.prevPage;
    this.getListAssignments();
  }
  
  deconnexion(){
    this.authService.logOut();
    this.router.navigate(["/"]);
  }
}
