import { Component, ViewChild  } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
import { MedidorCardiacoPage } from '../pages/medidor-cardiaco/medidor-cardiaco';
import { ObtenerDiagnosticoPage } from '../pages/obtener-diagnostico/obtener-diagnostico';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    backgroundMode:BackgroundMode, 
    ) {
    platform.ready().then(() => {
      
      

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      backgroundMode.enable();
      backgroundMode.excludeFromTaskList();
      backgroundMode.overrideBackButton();
      
      

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Medidor cardiaco', component: MedidorCardiacoPage },
        { title: 'Obtener Diagnostico', component: ObtenerDiagnosticoPage}
      ];
      
      
      /*cordova.plugins.PowerManagement.dim(function() {
        console.log('Wakelock acquired');
      }, function() {
        console.log('Failed to acquire wakelock');
      });
      cordova.plugins.PowerManagement.setReleaseOnPause(false, function() {
        console.log('setReleaseOnPause successfully');
      }, function() {
        console.log('Failed to set');
      });
      */
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component);
    
  }
}

