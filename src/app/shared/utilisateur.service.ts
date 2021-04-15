import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  uri = "https://back-groupe28-madagascar-mbds.herokuapp.com/api/testerLogin";

  getUtilisateur():Observable<Utilisateur> {
    console.log("Tester login.....");
    return this.http.get<Utilisateur>(this.uri);
  }

}
