import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import 'hammerjs';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';


// Firebase
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

// Componentes
import { ProductosComponent } from './components/productos/productos.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/productos/producto/producto.component';

// Servicios
import { ProductoService } from "./services/producto.service";
import { CatalogoComponent } from './components/productos/catalogo/catalogo.component';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';

// MatTable
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressBarModule, MatDialogModule} from '@angular/material';

import { SesionService } from './services/sesion.service';
import { VistaCarritoComponent } from './components/productos/vista-carrito/vista-carrito.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PedidosUsuarioComponent } from './components/pedidos/pedidos-usuario/pedidos-usuario.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosAdminComponent } from './components/pedidos/pedidos-admin/pedidos-admin.component';
import { DialogoComponent } from './components/pedidos/dialogo/dialogo.component';
import { ContactoComponent } from './components/contacto/contacto.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ListaProductosComponent,
    ProductoComponent,
    CatalogoComponent,
    VistaCarritoComponent,
    RegisterComponent,
    LoginComponent,
    PedidosUsuarioComponent,
    PedidosComponent,
    PedidosAdminComponent,
    DialogoComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(), 
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule, MatPaginatorModule, MatSortModule,  MatProgressBarModule, MatDialogModule, 
    StorageServiceModule,
    AngularFireAuthModule
  ],
  providers: [
    ProductoService,
    SesionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogoComponent]
})
export class AppModule { }
