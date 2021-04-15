import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/matieres/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { EtudiantService } from 'src/app/shared/etudiant.service';
import { MatiereService } from 'src/app/shared/matiere.service';
import { Assignment } from '../assignment.model';
import { Etudiant } from '../Etudiant.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;
  note=0;
  remarque='';
  matiere: Matiere[];
  isLinear = false;
  firstFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  matiereFormGroup:FormGroup;
  etudiantFormGroup: FormGroup;
  etudiant: Etudiant[];

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,private matiereService: MatiereService,
              private _formBuilder: FormBuilder,private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.getListMatieres();
    this.getListEtudiants();

    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required]
    });
    this.dateFormGroup = this._formBuilder.group({
      dateDeRendu: ['', Validators.required]
    });
    this.matiereFormGroup = this._formBuilder.group({
      matiere: ['', Validators.required]
    });
    this.etudiantFormGroup = this._formBuilder.group({
      etudiant: ['', Validators.required]
    });

  }
  getListMatieres(){
    this.matiereService.getMatieres().subscribe((data)=>{
        console.log("Data Matière")
        console.log(data)
        this.matiere = data;
        console.log('matiere' +this.matiere[0].nom);
    });
  }
  getListEtudiants(){
    this.etudiantService.getEtudiants().subscribe((data)=>{
      console.log("Data etudiants")
      console.log(data)
      this.etudiant = data;
      console.log('etudiant' +this.etudiant[0].nomEtudiant);
  });
  }

  onSubmit(event) {
    console.log('nakatooooo');
    if((!this.firstFormGroup.controls['nom'].value) || (! this.dateFormGroup.controls['dateDeRendu'].value) || (! this.matiereFormGroup.controls['matiere'].value) || (! this.etudiantFormGroup.controls['etudiant'].value) ) return;

    var splitted = this.matiereFormGroup.controls['matiere'].value.split(","); 
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.firstFormGroup.controls['nom'].value;
    nouvelAssignment.dateDeRendu = this.dateFormGroup.controls['dateDeRendu'].value;
    nouvelAssignment.rendu = false;
    nouvelAssignment.etudiant = this.etudiantFormGroup.controls['etudiant'].value;
    nouvelAssignment.matiere = splitted[0];
    nouvelAssignment.prof =splitted[1];
    nouvelAssignment.note=0;
    nouvelAssignment.remarque = "";

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

            this.firstFormGroup.reset();
            this.dateFormGroup.reset();
            this.matiereFormGroup.reset();
            // et on navigue vers la page d'accueil qui affiche la liste
            this.router.navigate(["/home"]);
      });
  }

}
