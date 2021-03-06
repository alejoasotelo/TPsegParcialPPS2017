import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';
/**
 * Generated class for the Administrativo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-administrativo',
  templateUrl: 'administrativo.html',
})
export class Administrativo {

  usuarioLogueado;
  Usuarios=[];
  UssAl=[];
  Cursos=[];
  Cur=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private auth: servicioAuth) {
      this.usuarioLogueado = this.auth.getUserInfo();
      console.info(this.usuarioLogueado);
      this.traerAlumnos();
      this.traerCusos();
      console.info("cursos",this.Cursos);
      console.info("usuarios",this.Usuarios);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Administrativo');

    
  }

  
  traerAlumnos()
  {
            console.info("entro");
          this.Usuarios=null;
          this.UssAl=[];
            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Usuarios = quote;

            for(let us of this.Usuarios)
              {
                if(us['tipo_usuario'] == "Alumno")
                {
                  this.UssAl.push(us);
                }
              }

            });

  }

  traerCusos()
  {
        this.Cursos=null;
          this.Cur=[];
            this.http.get("http://tppps2.hol.es/ws1/cursos")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Cursos = quote;

            for(let us of this.Cursos)
              {
                    this.Cur.push(us); 
              }

            });
  }

}
