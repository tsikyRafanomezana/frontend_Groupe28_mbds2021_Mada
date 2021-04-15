import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Utilisateur } from '../utilisateur/utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;
  
  constructor(private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService) {}
  //uri = "https://apinodetsirytoky.herokuapp.com/api/utilisateur";
  uri = "http://localhost:8010/api/utilisateur/login";

  logIn(pseudo, mdp) {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;

    // if (login === 'admin') this.admin = true;
    // this.loggedIn = true;
    console.log('login = ' +pseudo );
    console.log('password = ' +mdp );
    let user = {
      "pseudo" : pseudo,
      "mdp" : mdp
    };
    return this.http.post(this.uri, user);
  }

  createSession(utilisateur){
    this.storage.set("utilisateur",utilisateur);
  }
  destroySession(utilisateur){
    this.storage.remove("utilisateur");
  }

  logOut() {
    this.destroySession("utilisateur");
    //this.loggedIn = false;
    this.admin = false;
  }

  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }


}
