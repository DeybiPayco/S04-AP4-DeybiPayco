import { Component } from '@angular/core';

interface Videojuego {
  id: number;
  nombre: string;
  plataforma: string;
  anio: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false // Asegúrate de que esto coincida con tu AppModule
})
export class AppComponent {
  // Arreglo en memoria
  listaVideojuegos: Videojuego[] = [
    { id: 1, nombre: 'Zelda', plataforma: 'Nintendo Switch', anio: 2017 },
    { id: 2, nombre: 'Halo', plataforma: 'Xbox', anio: 2001 }
  ];

  // Objeto para el formulario
  nuevoVideojuego: Videojuego = { id: 0, nombre: '', plataforma: '', anio: 2024 };
  editando: boolean = false;

  // Función para Agregar o Guardar edición
  agregarVideojuego() {
    // Validación básica: evitar campos vacíos
    if (this.nuevoVideojuego.nombre === '' || this.nuevoVideojuego.plataforma === '') {
      alert("Por favor completa los campos");
      return;
    }

    if (this.editando) {
      // LÓGICA PARA ACTUALIZAR: Buscamos el índice y reemplazamos el objeto
      const index = this.listaVideojuegos.findIndex(v => v.id === this.nuevoVideojuego.id);
      if (index !== -1) {
        this.listaVideojuegos[index] = { ...this.nuevoVideojuego };
      }
      this.editando = false;
    } else {
      // LÓGICA PARA CREAR: Generamos un ID nuevo
      this.nuevoVideojuego.id = this.listaVideojuegos.length > 0 
        ? Math.max(...this.listaVideojuegos.map(v => v.id)) + 1 
        : 1;
      this.listaVideojuegos.push({ ...this.nuevoVideojuego });
    }

    // Limpiar formulario después de la acción
    this.limpiarFormulario();
  }

  // Función para Eliminar
  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este videojuego?')) {
      this.listaVideojuegos = this.listaVideojuegos.filter(v => v.id !== id);
    }
  }

  // Función para Seleccionar y Editar
  seleccionar(v: Videojuego) {
    // IMPORTANTE: Usamos {...v} para crear una COPIA y no editar la tabla en tiempo real
    this.nuevoVideojuego = { ...v };
    this.editando = true;
  }

  limpiarFormulario() {
    this.nuevoVideojuego = { id: 0, nombre: '', plataforma: '', anio: 2024 };
    this.editando = false;
  }
}