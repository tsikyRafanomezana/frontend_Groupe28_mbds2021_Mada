import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../assignments/Etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http:HttpClient) { }

  uri = "https://back-groupe28-madagascar-mbds.herokuapp.com/api/etudiants";

  getEtudiants():Observable<Etudiant[]> {
    console.log("Dans le service de gestion des matières...")
    //return of(this.assignments);
    return this.http.get<Etudiant[]>(this.uri);
  }

}
