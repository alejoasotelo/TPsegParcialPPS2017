import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Alumno page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-alumno',
  templateUrl: 'alumno.html',
})
export class Alumno {

    private usuarioLogueado;
    private encuestas = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        console.log('this.usuarioLogueado');
        this.usuarioLogueado = navParams.data;
        console.log(this.usuarioLogueado);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Alumno');
    }

}
