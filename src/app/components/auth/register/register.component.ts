import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService :UsuarioService,
    private toastr :ToastrService) { }

  ngOnInit() {
  }

  tryRegister(email, pw, cpw){
    if (pw == cpw){
      this.authService.doRegister(email, pw)
      .then(res => {
        this.toastr.success("Registrado!");
        
      }, err => {
        this.toastr.error("Error al registrarse");
        
      })
    }
    else this.toastr.error("Las contraseñas no coinciden");
  }

}
