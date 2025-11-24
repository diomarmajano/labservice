import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Input, OnInit } from '@angular/core';

/**
 * @description
 * Este componente representa la barra de navegación de la aplicación.
 * Permite al usuario navegar a diferentes secciones.
 * y es utilizaod en todas las páginas de la aplicación.
 */

/**
 * @usageNotes
 * Este componente se utiliza en la mayoría de las páginas de la aplicación, puede incluirlo con el selector `<app-nav></app-nav>`.
 * Se puede personalizar el título y subtítulo a través de las propiedades `titulo` y `subtitulo`.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() titulo: string = 'Bienvenido a la App de Servicios';
  @Input() subtitulo?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']);
  }
}
