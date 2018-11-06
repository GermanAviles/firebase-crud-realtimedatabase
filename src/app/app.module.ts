import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//---------------Firebase-----------------------
//Modulo que utiliza el archivo de configuración del archivo "enviroment.ts"
import { AngularFireModule } from 'angularfire2';
//Modulo que permite usar la DB de firebase conectado con angular
import { AngularFireDatabaseModule } from 'angularfire2/database';
//cargamos el archivo de configuración para conectar con mi appfirebase
import { environment } from '../environments/environment';

//---------------Components---------------------
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';

//---------------Routing---------------------
import { appRouting } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireDatabaseModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
