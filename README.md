# frontend_Groupe28_mbds2021_Mada
Projet Angular Groupe 28 Mbds Madagascar

## Démarrage et fonctionnement du projet dans un autre ordinateur 
    Après avoir téléchargé le projet,ouvrez :
	 le  dossier pour le front et faites npm install , puis faites ng serve
	
    Membres du groupe 28 : 
    . RAFANOMEZANA Tahiry Bakolitsiky n°15
	. RATSIMANDAVANA Rantotiana Riantsoa  n°51
        

## Fonctionnalités
    Les fonctionnalités sont:
        .Login : création de collection Utilisateur dans MongoDB, 
				 en validant que le user/password est correct
	.Gestion des utilisateurs : 
		il y a deux types d'utilisateur : admin ou nonAdmin
		L'administrateur seul peut :
			-Ajouter un nouvel assignment 
			-Modifier un assignment
			-Supprimer un assignment
			-Donner  des notes et remarques pour les assignments 
	
	.Gestion des assignments:
		-Ajout de nouvelles propriétés au modèle des Assignments:
			-Etudiant
			-Matière
			-Prof
			-Note
			-Remarque
		-Liste des assignments rendus et non rendus
		-Amélioration de l'affichage des Assignments
		-Supprimer un assignment
		-Ajout un assignment
		-Modification d'un assignment
		
	.Hébergement sur Heroku.com
	
	.Ajout de collection d'élèves, de profs et de matières

## Lien du site du projet sur heroku :

https://front-groupe28-madagascar-mbds.herokuapp.com/

### compte admin:
pseudo: Tsiky/ mdp: admin
#### compte non admin : 
pseudo : Ranto / mdp : user
		
## Documentations :

http://www.lsis.org/elmouelhia/courses/angular/coursAngularPart11.pdf 
https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
https://material.angular.io/components/tabs/overview
https://material.angular.io/components/stepper/overview
