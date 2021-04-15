import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:8010/api/testerLogin";

  getUtilisateur():Observable<Utilisateur> {
    console.log("Tester login.....");
    return this.http.get<Utilisateur>(this.uri);
  }

}
