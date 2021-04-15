import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../matieres/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  matiere:Matiere[];

  constructor(private http:HttpClient) { }

  uri = "https://back-groupe28-madagascar-mbds.herokuapp.com/api/matieres";

  getMatieres():Observable<Matiere[]> {
    console.log("Dans le service de gestion des matières...")
    //return of(this.assignments);
    return this.http.get<Matiere[]>(this.uri);
  }

  getMatiereAsPromise():Promise<Matiere[]> {
    console.log("Dans le service de gestion des matières...")
    //return of(this.assignments);
    return this.http.get<Matiere[]>(this.uri).toPromise();
  }

  getMatieresPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(this.uri+"?page="+page + "&limit="+limit);
  }
}
