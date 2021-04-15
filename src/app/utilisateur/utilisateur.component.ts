import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UtilisateurService } from '../shared/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  pseudo ='';
  mdp='';
  hide = true;

  constructor(private utilisateurService:UtilisateurService,private authService: AuthService,
              private router:Router,) { }

  ngOnInit(): void {
  }

  testerLogin(event){
    //this.utilisateurService.getUtilisateur();
    console.log('Nakato utilisteur component....');
    this.authService.logIn(this.pseudo,this.mdp)
      .subscribe(reponse => {
        console.log(reponse);
        console.log('Manao test');
      if(reponse==null){
        console.log('Mot de passe diso');
      }
      if(reponse!=null){
        this.authService.createSession(reponse);
        this.router.navigate(["/home"]);
      }
    });
    console.log('vitaaaaa');
  }
}
