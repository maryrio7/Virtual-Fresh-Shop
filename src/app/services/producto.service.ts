import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Producto } from "../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  listaProductos :AngularFireList<any>;
  seleccionarProducto :Producto = new Producto();

  constructor( private firebase :AngularFireDatabase) { }

  getProductos(){
    return this.listaProductos = this.firebase.list("productos");
  }

  nuevoProducto(producto  :Producto, link :string) {
    this.listaProductos.push({
      nombre_producto :producto.nombre_producto,
      descripcion :producto.descripcion,
      precio :producto.precio,
      stock :producto.stock,
      categoria :producto.categoria,
      imagen :producto.imagen,
      url: link,
      cantidad :0
    });
    
  }

  editarProducto(producto :Producto, link :string) {
    this.listaProductos.update(producto.$id, {
      nombre_producto :producto.nombre_producto,
      descripcion :producto.descripcion,
      precio :producto.precio,
      stock :producto.stock,
      categoria :producto.categoria,
      imagen :producto.imagen,
      url: link,
      cantidad :0
    });
  }

  eliminarProducto($id :string) {
    this.listaProductos.remove($id);
  }
  

  
}
