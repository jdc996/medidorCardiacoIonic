import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MedidorCardiacoPage } from '../pages/medidor-cardiaco/medidor-cardiaco';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { PacienteService } from '../services/paciente.services';
import { BLE } from '@ionic-native/ble';
import { EscanerBluetoothPage } from '../pages/escaner-bluetooth/escaner-bluetooth';
import { HTTP } from '@ionic-native/http';
import { ObtenerDiagnosticoPage } from '../pages/obtener-diagnostico/obtener-diagnostico';
import { BluetoothService } from '../services/bluetooth.service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LoginPage } from '../pages/login/login';
import { AppCenterCrashes } from '@ionic-native/app-center-crashes/ngx';
import { BackgroundMode } from '@ionic-native/background-mode';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MedidorCardiacoPage,
    EscanerBluetoothPage,
    ObtenerDiagnosticoPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MedidorCardiacoPage,
    EscanerBluetoothPage,
    ObtenerDiagnosticoPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PacienteService,
    BLE,
    HTTP,
    BackgroundMode,
    BluetoothService,
    LocalNotifications,
    AppCenterCrashes,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
