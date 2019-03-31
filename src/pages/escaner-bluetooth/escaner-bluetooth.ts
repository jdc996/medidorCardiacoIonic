
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { MedidorCardiacoPage } from '../medidor-cardiaco/medidor-cardiaco';
import { BluetoothService } from '../../services/bluetooth.service';

const HEART_RATE_SERVICE='180D';

/**
 * Generated class for the EscanerBluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escaner-bluetooth',
  templateUrl: 'escaner-bluetooth.html',
})
export class EscanerBluetoothPage {
  devices: any[] = [];
  statusMessage: string;
  documento:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    public evt:Events,
    public bluetoothService:BluetoothService) {
    this.documento=navParams.get("documento")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedidorCardiacoPage');
    console.log(this.documento)
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }
  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([HEART_RATE_SERVICE], 15).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
      //alert("device found")
    });
  }
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    //alert(JSON.stringify(device) + ' selected');
    this.evt.publish('device',device);
    this.navCtrl.push(MedidorCardiacoPage,{documento:this.documento,device:device});
    
  }
}
