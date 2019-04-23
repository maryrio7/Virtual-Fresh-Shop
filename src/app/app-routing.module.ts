import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ProductosComponent} from './components/productos/productos.component';
import { CatalogoComponent } from './components/productos/catalogo/catalogo.component';
import { VistaCarritoComponent } from './components/productos/vista-carrito/vista-carrito.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UsuarioService } from './services/usuario.service';
import {PedidosComponent} from './components/pedidos/pedidos.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '' , component: CatalogoComponent},
  {path: 'admin-productos', component: ProductosComponent},
  {path: 'cart', component: VistaCarritoComponent, canActivate:[UsuarioService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pedidos', component: PedidosComponent, canActivate:[UsuarioService]},
  {path: 'contacto', component: ContactoComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }


