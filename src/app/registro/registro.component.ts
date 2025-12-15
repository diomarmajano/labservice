import { Component } from '@angular/core';
import { JsonService } from '../services/json.servicios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

    modoFormulario: 'crear' | 'editar' | 'eliminar' = 'crear';
    usuarioSeleccionadoId: number | null = null;
    usuarioSeleccionado: any = null;

  servicios: any[] = []; 
   nuevoUsuario = {
      rut: '',
      nombre: '',
      rol: '',
      departamento: ''
    };
    usuarioForm: any = {
  id: null,
  rut: '',
  nombre: '',
  rol: '',
  departamento: ''
};
    
      constructor(private jsonService: JsonService) {}
    
      ngOnInit(): void {
      this.cargarUsuarios(); 
    }
  
    cargarUsuarios() {
      this.jsonService.getJsonData().subscribe(data => {
        this.servicios = data._embedded.userList;
      });
    }
    cargarUsuarioSeleccionado() {
  const usuario = this.servicios.find(u => u.id == this.usuarioSeleccionadoId);

  if (usuario) {
    this.usuarioForm = { ...usuario };
  }
}

  
       guardarProfesional() {
      this.jsonService.create(this.nuevoUsuario).subscribe(() => {
        this.cargarUsuarios(); // refresca la lista
        this.nuevoUsuario = {
          rut: '',
          nombre: '',
          rol: '',
          departamento: ''
        };
      });
    }

    abrirFormulario(modo: 'crear' | 'editar' | 'eliminar') {
  this.modoFormulario = modo;

  if (modo !== 'crear' && this.usuarioSeleccionado) {
    this.usuarioForm = { ...this.usuarioSeleccionado };
  }

  if (modo === 'crear') {
    this.usuarioForm = {
      id: null,
      rut: '',
      nombre: '',
      rol: '',
      departamento: ''
    };
  }
}


accionFormulario() {
  if (this.modoFormulario === 'crear') {
    this.jsonService.create(this.usuarioForm)
      .subscribe(() => this.cargarUsuarios());
  }

  if (this.modoFormulario === 'editar') {
    this.jsonService.actualizarUsuario(this.usuarioForm)
      .subscribe(() => this.cargarUsuarios());
  }

  if (this.modoFormulario === 'eliminar') {
    this.jsonService.eliminarUsuario(this.usuarioForm.id)
      .subscribe(() => this.cargarUsuarios());
  }
}

}
