
import { Injectable } from "@angular/core";

import { Http,Headers, RequestOptions  } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { HttpClient } from "@angular/common/http";
import { Events, AlertController } from "ionic-angular";
import { isPresent } from "ionic-angular/umd/util/util";
import { LocalNotifications } from "@ionic-native/local-notifications";

const urlDir="http://54.207.255.227:4040";
@Injectable()
export class PacienteService {
    cordova: any;
    documento:string;
    requestOpt:any;
    alertPresented:any;
    constructor(public http: Http,public httpClient:HttpClient,private HTTP:HTTP,public events:Events,
        public alertCtr:AlertController,
        public localNotifications:LocalNotifications){
        this.alertPresented=false;
        this.setHeaders();
        this.events.subscribe('documento',data=>{
            this.documento=data;
         });
    }
    
    setHeaders(){
    var headers = new Headers(); 
    headers.append('Access-Control-Allow-Origin', '*');
    
    headers.append('Content-Type', 'application/json' );    
    this.requestOpt = new RequestOptions({ headers: headers });
    
    }

    makeDiagnosis(documento){
        
        let headersnative= {
            'Content-Type': 'application/json'
        }
        //se usa el HTTP nativo para evitar el Cors error
        //si se quiere usar el http de angular se llama al requestOpt para debugear desde el explorador
        console.log(this.requestOpt)
        this.HTTP.get(
        urlDir+'/makeDiagnosis',
        {"document":documento},
        headersnative)
        
    }
    

    getDiagnosis(documento){
        return this.http.get(urlDir+'/getDiagnosis?document='+documento);
    }
    getDocument(){
        return this.documento;
    }


    getPatients(){      
       this.http.get(urlDir+'/getpatients').map(res => res.json).subscribe(data => {
           console.log(data);
       });  
    }

    getPatient(documento){           
        this.events.publish('documento',documento);
       return this.http.get(urlDir+'/getPatients?document='+documento)
     }

    postPatient(documento,firstName,lastName,age,weight,height,mail,phone,address){
        let headersnative= {
            'Content-Type': 'application/json'
        }
        return this.HTTP.post(
            urlDir+'/postPatient',
        {"document":documento,
        "firstname":firstName,
        "lastname":lastName,
        "age":age,
        "weight":weight,
        "height":height,
        "mail":mail,
        "phone":phone,
        "address":address},
        headersnative)
    }

    postMeasurement(documento,valor,fecha){
        var headers = new Headers(); 
        headers.append('Allow-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json' );
        let headersnative= {
            'Content-Type': 'application/json'
        }
        //se usa el HTTP nativo para evitar el Cors error
        //si se quiere usar el http de angular se llama al requestOpt para debugear desde el explorador
        console.log(this.requestOpt)
        this.HTTP.post(
            urlDir+'/postMeasurement',
        {"document":documento,"value":valor,"time":1,"date":fecha},
        headersnative).catch((error)=>{
            //alert("Error to post measurements");
            this.present("Error:","Error to  post measurements in the server")
        })
    }

    present(title, subTitle) {
        let vm = this
        if(!vm.alertPresented) {
          vm.alertPresented = true
          vm.localNotifications.schedule({
            text:"Error to  post measurements in the server"
          })
          vm.alertCtr.create({
            title: title,
            subTitle: subTitle,
            buttons: [{
              text: 'OK',
              handler: () => {
                vm.alertPresented = false
              }
            }],
          }).present();
        }
      }
}   