import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { PacienteService } from '../../services/paciente.services';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,public pacienteService:PacienteService,
    private menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  
  createUser(documento,firstName,lastName,age,weight,height,mail,phone,address){
    if(documento && firstName && lastName && age && weight && height && mail && phone && address){
      this.pacienteService.postPatient(documento,firstName,lastName,age,weight,height,mail,phone,address).then((res)=>{      
      alert("Patient was created");
      this.navCtrl.pop();
    }).catch((error)=>{
      alert("Error to post patient");
      //this.present("Error:","Error to  post Patient in the server")
  });
      //
    }else{
      this.showAlert("Error ","fill all the fields");
    }
  }
  showAlert(title, message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

}
