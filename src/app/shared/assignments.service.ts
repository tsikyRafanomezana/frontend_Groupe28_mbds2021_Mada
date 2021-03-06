import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { assignmentsGeneres } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  // uri = "http://localhost:8010/api/assignments";
  // url1 = "http://localhost:8010/api/assignmentsRendu";
  // url2  = "http://localhost:8010/api/assignmentsNonRendu";
  uri = "https://back-groupe28-madagascar-mbds.herokuapp.com/api/assignments";
  url1 = "https://back-groupe28-madagascar-mbds.herokuapp.com/api/assignmentsRendu";
  url2 = "https://back-groupe28-madagascar-mbds.herokuapp.com/api/assignmentsNonRendu";

  getAssignments():Observable<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+"?page="+page + "&limit="+limit);
  }

  getAssignmentsPagineRendu(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.url1+"?page="+page + "&limit="+limit);
  }
  getAssignmentsPagineNonRendu(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.url2+"?page="+page + "&limit="+limit);
  }
  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise():Promise<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  
  getAssignment(id:number):Observable<Assignment> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + "/" +id)
    .pipe(
      // traitement 1
      map(a => {
        a.nom += " MODIFIE PAR MAP";
        return a;
      }),
      tap(a => {
        console.log("TRACE DANS TAP : j'ai re??u " + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a ??chou?? ' + error.message);

      return of(result as T);
    };
  }

  generateId():number {
    return Math.round(Math.random()*100000);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    console.log('Avant ajout assignment');
    assignment.id = this.generateId();
    //this.loggingService.log(assignment.nom, " a ??t?? ajout??");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajout?? !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // besoin de ne rien faire puisque l'assignment pass?? en param??tre
    // est d??j?? un ??l??ment du tableau

    //let index = this.assignments.indexOf(assignment);

    //console.log("updateAssignment l'assignment pass?? en param est ?? la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, " a ??t?? modifi??");

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, " a ??t?? supprim??");

    return this.http.delete(this.uri + "/" + assignment._id);

  }

  peuplerBD() {
    assignmentsGeneres.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      //nouvelAssignment.etudiant = a.etudiant.$oid;


      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }

  // autre version qui permet de r??cup??rer un subscribe une fois que tous les inserts
  // ont ??t?? effectu??s
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment = [];

    assignmentsGeneres.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      /*nouvelAssignment.etudiant = a.etudiant[0].id;
      nouvelAssignment.matiere = a.matiere[0]._id;
      nouvelAssignment.prof = a.prof[0]._id;
      nouvelAssignment.note =a.note;
      nouvelAssignment.remarque=a.remarque*/

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }
}
