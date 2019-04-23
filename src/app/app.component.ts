import { Component } from '@angular/core';
import { environment} from "src/environments/environment";
import { SesionService } from "src/app/services/sesion.service";
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Proyecto-DAW';
  env = environment;
  
  constructor(private sesion :SesionService,
    private authService :UsuarioService){
  }

}
