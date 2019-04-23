import { Component, OnInit } from '@angular/core';

import { ProductoService } from "../../../services/producto.service";
import { ToastrService } from "ngx-toastr";

import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';

import * as firebase from "firebase";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  file :File =null;
  metaData = {};
  temporal = null;
  storageRef :firebase.storage.Reference =null;
  constructor(
    public productoService : ProductoService,
    private toastr :ToastrService) { }

  ngOnInit() {
    this.productoService.getProductos();
    this.resetForm();
  }
  uploadTask = null;

  onSubmit(productoForm :NgForm) {
    if (productoForm.value.$id == null) {
      var that = this;
      that.uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        that.temporal = downloadURL;
        that.productoService.nuevoProducto(productoForm.value, that.temporal);
        that.resetForm(productoForm);
      })
      this.toastr.success("Producto añadido!");
    }
    else {
      var that = this;
      that.uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        that.temporal = downloadURL;
        that.productoService.editarProducto(productoForm.value, that.temporal);
        that.resetForm(productoForm);
      })
      this.toastr.success("Producto actualizado correctamente");
    }
  }

  resetForm(productoForm ? :NgForm) {
    if(productoForm != null)
      productoForm.reset();
      this.productoService.seleccionarProducto = new Producto();
  }
  
  onFileSelected(event :any){
    this.file = event.target.files[0];
    this.metaData = {"contentType" :this.file.type};
    this.storageRef = firebase.storage().ref(this.file.name);
    this.uploadTask = this.storageRef.put(this.file, this.metaData);
  }

  

}
