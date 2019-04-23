import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { formatDate } from '@angular/common';
import { SesionService } from './sesion.service';
import { Pedido } from '../models/pedido';
import { Carrito } from '../models/carrito';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogoComponent } from '../components/pedidos/dialogo/dialogo.component';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  
  listaPedidos :AngularFireList<any>;
  listaFiltrada :AngularFireList<any>;
  constructor(private firebase :AngularFireDatabase,
    private sesion :SesionService,
    private dialog :MatDialog) { 
      this.listaPedidos=this.getPedidos();
    }

  getPedidos(){
    return this.listaPedidos = this.firebase.list("pedidos");
  }
  nuevoPedido(nombre, direccion,telefono) {
    this.listaPedidos.push({
      nombre_prod :this.sesion.getNombres(),
      precio_prod :this.sesion.getPrecios(),
      id_prod :this.sesion.getCart(),
      fecha :formatDate(new Date(),"dd/MM/yyyy HH:mm","en"),
      estado :"Pendiente",
      email_usuario :localStorage.getItem('email'),
      nombre_usuario :nombre,
      telefono_usuario :telefono,
      direccion_usuario :direccion
    });
  }

  editarPedido(pedido :Pedido, nuevo_estado :string) {
    this.listaPedidos.update(pedido.$id, {
      nombre_prod :pedido.nombre_prod,
      precio_prod :pedido.precio_prod,
      id_prod :pedido.id_prod,
      fecha :pedido.fecha,
      estado :nuevo_estado,
      email_usuario :pedido.email_usuario,
      nombre_usuario :pedido.nombre_usuario,
      telefono_usuario :pedido.telefono_usuario,
      direccion_usuario :pedido.direccion_usuario
    });
  }

  importeTotal(precios :string) :number{
    var array1 = precios.split(",");
    var total = 0;
    for(var i=0; i<array1.length-1; i++){
      total += Number(array1[i]);
    }
    return total;
  }

  listaProductos(pedido :Pedido) :Carrito[]{
    var array1 = pedido.id_prod.split(",");
    var array2 = pedido.precio_prod.split(",");
    var array3 = pedido.nombre_prod.split(",");
    var arrayLista :Carrito[]= []; 
    var contador = 0;
    for(var i=0; i<array1.length-1; i++){
      var encontrado=false;
      for(var k=0; k<arrayLista.length; k++){
        if(arrayLista[k].$id == array1[i]){
          arrayLista[k].cantidad ++;
          encontrado = true;
        }
      }

      if(!encontrado){
        arrayLista[contador] = {
          $id :array1[i],
          nombre : array3[i],
          cantidad :1,
          precio :Number(array2[i])
        }
        contador++;
      }
    }
    return arrayLista;
  }

  openDialog(pedido :Pedido) :void{
    let dialogRef =  this.dialog.open(DialogoComponent, {
      data: {
        precio: this.importeTotal(pedido.precio_prod),
        lista: this.listaProductos(pedido),
        nombre: pedido.nombre_usuario,
        direccion: pedido.direccion_usuario,
        telefono: pedido.telefono_usuario,
        fecha: pedido.fecha,
        estado: pedido.estado,
        id :pedido.$id
      }
    });
    
  }



 

}
