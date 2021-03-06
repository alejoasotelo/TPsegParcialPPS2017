import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModalCursos } from '../modificacion-modal-cursos/modificacion-modal-cursos';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { AltaModal } from '../alta-modal/alta-modal';
import { AltaModalCursos } from '../alta-modal-cursos/alta-modal-cursos';


@Component({
  selector: 'page-grilla-curso',
  templateUrl: 'grilla-curso.html',
})
export class GrillaCurso {

    Cursos;
    Cur : Array<any> =[];
    comisiones;
    profesores=null;
    UssP=[];
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth ,public navParams: NavParams, public viewCtrl: ViewController ,private http: Http, public modalCtrl: ModalController) {
    this.CargaGrilla();
    this.TraerProfesores();
    

  }


  
      TraerProfesores()
      {
          this.profesores=null;
          this.UssP=[];
            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.profesores = quote;

            for(let us of this.profesores)
              {
                if(us['tipo_usuario'] == "Profesor")
                {
                  this.UssP.push(us);
                }
              }
              console.info(this.UssP);

            });

      }


      CargaGrilla()
    {
          console.info("entro");
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

    Modificar(id_curso, descripcion, comision,id_usuario)
    {
      console.info(id_curso, descripcion, comision,id_usuario);
   
        let curs = {
            id_curso: id_curso,
            comision: comision,
            descripcion: descripcion,
            id_usuario:id_usuario
      
        };
        let modal = this.modalCtrl.create(ModificacionModalCursos, curs);
        modal.onDidDismiss(data=>{
          this.CargaGrilla();
        });
        modal.present();
        
    }

    Alta()
    {
      
        let modal = this.modalCtrl.create(AltaModalCursos);
        modal.onDidDismiss(data=>{
          this.CargaGrilla();
        });
        modal.present();
        
    } 

    Eliminar(id_curso, desc_curso)
    {
      console.info(desc_curso);
              let alert = this.alertCtrl.create({
              title: 'Eliminacion de Curso',
              message: 'Confirma eliminar Curso: '+ desc_curso,
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancelar clicked');
                  }
                },
                {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Aceptar clicked');
                    this.http.post("http://tppps2.hol.es/ws1/cursos/eliminar", {
                           id_curso: id_curso
            
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                           this.CargaGrilla();
                    });
                  
                  }
                }
              ]
            });
            alert.present();
             
    }


}
