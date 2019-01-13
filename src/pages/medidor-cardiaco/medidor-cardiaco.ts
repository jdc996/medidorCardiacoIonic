import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { EscanerBluetoothPage } from '../escaner-bluetooth/escaner-bluetooth';
import * as moment from 'moment-timezone';
import { PacienteService } from '../../services/paciente.services';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BluetoothService } from '../../services/bluetooth.service';
import { LocalNotifications } from '@ionic-native/local-notifications';




const HeartRate = "180d";
const characteristic="2a37";
const timeInterval=2000;


/**
 * Generated class for the MedidorCardiacoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medidor-cardiaco',
  templateUrl: 'medidor-cardiaco.html',
})
export class MedidorCardiacoPage {

  devices: any[] = [];
  statusMessage: string;
  documento:string="";
  documentoCopy:string="";
  device:any={};
  peripheral: any = {};
  time=new Date();
  medicionCardiaca : String;
  momentjs: any = moment;
  isEnabled:boolean=false;
  isConnected:boolean=false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private alertCtrl: AlertController,
    public pacienteService:PacienteService,
    private backGroundMode: BackgroundMode,
    public evt:Events,
    public bluetoothService:BluetoothService,
    public localNotifications:LocalNotifications,
    
    ) {
    
    this.backGroundMode.enable();
    //this.backGroundMode.excludeFromTaskList();
    this.backGroundMode.overrideBackButton();
    this.documento=this.pacienteService.getDocument();
    console.log(this.documento);
    //this.device =navParams.get("device");
    this.device=this.bluetoothService.getDevice();
    //this.setStatus('Connecting to ' + this.device.name || this.device.id);
    //alert("documento: "+this.documentoCopy + " device: "+this.device)
  } 
  
  enableDiseable(){
    if(this.device){
      this.isEnabled=true;
    }else{
      this.isEnabled=false;
    }
  }
  startTimer() {
    
    //this.backGroundMode.on("activate").subscribe(()=>{
    setInterval( () => {
      if(this.medicionCardiaca.length=== 0 && this.medicionCardiaca){}else{
        console.log("entro"+this.backGroundMode.isActive());  
        console.log("timer: "+this.medicionCardiaca);
        let fechaHora= moment().format("YYYY-MM-DDt02:HH:mm.ss").toLocaleString();
        console.log("fecha: "+fechaHora)
        this.pacienteService.postMeasurement(this.documento,this.medicionCardiaca,fechaHora);

        }
      }, 2000);
    }//)//,(error:any)=>{
      //console.log("error :"+error);
    //}
    //}
  setIsConnect(device){
    if(device){
      this.ngZone.run(() => {
        this.ble.isConnected(device.id).then(
          ()=>{this.isConnected=true;},
          ()=>{this.isConnected=false;}
        );  
      });

   }
  }


  conectar2(){
    let fechatz=moment().tz('America/Bogota').format("YYYY-MM-DDt02:HH:mm.ss").toLocaleString()
    this.pacienteService.postMeasurement("1018488736","45",fechatz);

  }
  conectar(){
  
    this.ble.connect(this.device.id).subscribe(
    peripheral => this.onConnected(peripheral),
    peripheral => this.disconectError()
    )
  }

  disconnectBtn(){
    this.ble.disconnect(this.device.id).then(()=>
      this.disconectError()
    );
    this.setIsConnect(this.device);
  }

  disconectError(){
    if(this.backGroundMode.isActive()){
      this.localNotifications.schedule({
        text:"The peripheral was unexpectedly disconnected"
      })
    }
    this.setIsConnect(this.device);
    this.setStatus('Disconnected')
    this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
  }
  onConnected(peripheral) {
    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
    // Update the UI with the current state of the switch characteristic
    //alert("p.id: "+this.peripheral.id)
    this.showAlert("Succesful conection: ","connected to "+ this.peripheral.id)
    console.log(JSON.stringify(peripheral));
    var id:string=this.device.id;
    var value=new Uint8Array(1);
    value[0]=0x01;
    this.backGroundMode.enable();
    console.log(this.backGroundMode.isActive());
    console.log(this.backGroundMode.isEnabled());
    //this.startTimer();
    this.setIsConnect(this.device);
      
      this.ble.startNotification(this.peripheral.id,'180D','2A37').subscribe(buffer=>{
        let data = new Uint8Array(buffer);
        console.log('switch characteristic start ' + data);
        console.log('switch characteristic start[] ' + data[0]);
        this.setMedicion(data[1].toString()); 
        
        let fechaHora= moment().format("YYYY-MM-DDt02:HH:mm.ss").toLocaleString();
        console.log("fecha: "+fechaHora)
        this.pacienteService.postMeasurement(this.documento,this.medicionCardiaca,fechaHora);
        //console.log("Medicion Cardiaca :"+ this.medicionCardiaca)
      },(error=>{
        console.log("## ERROR start notification ##" + error);
      }));
    
    /*this.startTimer();
    
    //this.ble.read(this.peripheral.id, '180D', '2A37').then(data=>{
    //   console.log("Read"+new Uint8Array(data[0]));
    //   console.log("## READ ##" + JSON.stringify(data[0]));
    //}, function (error) {
    //   console.log("## ERROR READ ##" + error);
    //});

    this.ble.startNotification(this.peripheral.id,'180D','2A37').subscribe(buffer=>{
      let data = new Uint8Array(buffer);
      console.log('switch characteristic start ' + data);
      console.log('switch characteristic start[] ' + data[0]);
      this.medicionCardiaca=data[1].toString();
      
      
      //console.log("Medicion Cardiaca :"+ this.medicionCardiaca)

    },(error=>{
      console.log("## ERROR start notification ##" + error);
    }));
    

    //this.ble.read(this.device.id, '180D', '2A37').then(
      
    //  buffer => {
    //    alert("entro a read");
    //    let data = new Uint8Array(buffer);
    //    alert('switch characteristic ' + data[0]);
    //    this.ngZone.run(() => {
    //       alert( data[0] !== 0);
    //    });
    //  }
    //)
    //
    */
  }
    setMedicion(data){
      this.ngZone.run(() => {
        this.medicionCardiaca = data;
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
    setStatus(message) {
      console.log(message);
      this.ngZone.run(() => {
        this.statusMessage = message;
      });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MedidorCardiacoPage');
    console.log("moment tz : "+moment().tz('America/Bogota').format("YYYY-MM-DDt01:HH:mm.sss").toLocaleString());
    
    //timer();
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    console.log(this.documento);
    this.enableDiseable();
    this.setIsConnect(this.device);
    //timer();
  }
  ionViewDidLeave(){
    if(this.device){
      this.disconnectBtn();
    }
  }

  selectDevice(){
    this.navCtrl.push(EscanerBluetoothPage,{documento:this.documento});
  }
  
  

}
