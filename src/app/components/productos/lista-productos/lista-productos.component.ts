import { Component, OnInit } from '@angular/core';

import { ProductoService } from "../../../services/producto.service";
import { ToastrService} from "ngx-toastr";

import { Producto } from "../../../models/producto";

import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  listaProductos :Producto[];
  storageRef :firebase.storage.Reference =null;
  constructor(
    private productoService :ProductoService,
    private toastr :ToastrService
  ) { 

  }

  ngOnInit() {
    this.productoService.getProductos()
    .snapshotChanges()
    .subscribe(item => {
      this.listaProductos = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$id"] = element.key;
        this.listaProductos.push(x as Producto);
      })
    })
  }

  onEdit(producto :Producto) {
    
    this.productoService.seleccionarProducto = Object.assign({}, producto);

  }

  onDelete($id :string) {
    if(confirm("¿Seguro que quieres eliminar este producto?")) {
      this.productoService.eliminarProducto($id);
      this.toastr.success("Producto eliminado"); 
    }
  }

  
  

}
