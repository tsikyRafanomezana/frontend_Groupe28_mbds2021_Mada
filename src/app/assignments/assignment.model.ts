import { Matiere } from "../matieres/matiere.model";
import { Etudiant } from "./Etudiant.model";
import { Prof } from "./Prof.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  etudiant: Etudiant;
  matiere: Matiere;
  prof: Prof;
  note:number;
  remarque:string;
}
