import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Prof } from '../Prof.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
  nom = '';
  dateDeRendu = null;
  remarque ='';
  note =0;
  prof: Prof;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();

  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      console.log('assignment detail edit avec donné talu ===' +assignment.prof );
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.prof = assignment.prof;
      console.log('lay prof eeee' +this.prof);
    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu) ) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.prof = this.prof;
    this.assignment.note = this.note;
    if(this.assignment.note!=0){
      this.assignment.rendu = true;
    }
    else this.assignment.rendu =false;
    this.assignment.remarque =this.remarque;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
