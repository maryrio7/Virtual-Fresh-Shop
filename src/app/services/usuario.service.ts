import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { ToastrService } from 'ngx-toastr';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router,
     private toastr :ToastrService, private sesion :SesionService) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('email',this.user.email);
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('email',null);
      }
    })
  }

  doRegister(email, pw){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, pw)
      .then(res => {
        resolve(res);
        this.router.navigate(['/']);
      }, err => reject(err))
    })
  }

  user :User;

  async  login(email:  string, password:  string) {
    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('email',this.user.email);
        this.router.navigate(['/']);

    } catch (e) {
        this.toastr.error("Datos incorrectos");
    }
  }
  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('email');
  }
  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
  get isAdmin() :boolean {
    if(localStorage.getItem('email') == "admin@admin.com"){
      return true;
    } 
    else return false;
  }

  //funcion para activar rutas si el usuario esta logged
  canActivate(route :ActivatedRouteSnapshot, state :RouterStateSnapshot){
    if (this.isLoggedIn) return true;
    else return false;
  }
  
  getEmail() :string{
    return localStorage.getItem("email");
  }

}
