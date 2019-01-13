import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PacienteService } from '../../services/paciente.services';
import { NgZone } from '@angular/core';

/**
 * Generated class for the ObtenerDiagnosticoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-obtener-diagnostico',
  templateUrl: 'obtener-diagnostico.html',
})
export class ObtenerDiagnosticoPage {

  analisis:string[];
  allDiagnosis:any;
  diagnosis:any;
  document:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public pacienteService:PacienteService,
    private ngZone: NgZone,
    public alertCtrl:AlertController) {
    this.document=pacienteService.getDocument();
    console.log("documento "+this.document);
  }
  setDiagnosis(data){
    this.allDiagnosis = data;
    this.ngZone.run(() => {
      this.diagnosis=this.allDiagnosis[this.allDiagnosis.length-1];
    });
    this.analisis=this.diagnosis.diagnosis.split(",");
    this.analisis.forEach((data,index)=>{
      this.analisis[index]=this.analisis[index].split(":")[1];
    })
    console.log(this.analisis);
  }

  getDiagnostico(){
    this.pacienteService.getDiagnosis(this.document).subscribe((data)=>{
      console.log(data.json());  
      this.setDiagnosis(data.json());
    },(error)=>{
      this.showAlert("Error get diagnosis","Error to get dianosis from the server")
      
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
  makeDiagnostico(){
    this.pacienteService.makeDiagnosis(this.document);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObtenerDiagnosticoPage');
  }
  


}
