import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, AlertController } from 'ionic-angular';
import { MedidorCardiacoPage } from '../medidor-cardiaco/medidor-cardiaco';
import { PacienteService } from '../../services/paciente.services';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  paciente: any="";
  isEnabled:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pacienteService: PacienteService, public evt:Events,
    private menu: MenuController,
    public alertCtrl:AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage'); 
  }
  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }
  enableDiseable(documento){
    if(documento!==''){
      this.isEnabled=true;
    }else{
      this.isEnabled=false;
    }
  }
  ingreso(){
    this.navCtrl.push(MedidorCardiacoPage);  
}

loguear(){
  
  this.navCtrl.push(LoginPage);
  
}
  signIn(documento){
    console.log(documento);
    this.evt.subscribe('documento',(documento)=>{
      console.log("documento: "+ documento);
    });

    this.pacienteService.getPatient(documento).subscribe((data)=>{
      this.paciente = data.json();
      if(this.paciente && this.paciente.length=== 0){
        return alert("Documento invalido")
      }else{
        console.log(documento);
        this.navCtrl.push(MedidorCardiacoPage);    
      }
    
    },(error)=>{
      //alert("Error Loging In:" + error)
      this.showAlert("Error Loggin","Error to loggin in "+error)
    });
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
