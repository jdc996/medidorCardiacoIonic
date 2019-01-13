import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Events } from "ionic-angular";

@Injectable()
export class BluetoothService{
    device:any;
    constructor(public evt:Events){
        evt.subscribe('device',(data)=>{
            this.device=data;
        })
    }
    getDevice(){
        return this.device
    }
}