import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../../../core/models/categoria';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css'
})
export class ModalCategoriaComponent implements OnInit{
  categoriaForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';

  constructor(private _formBuilder: FormBuilder, private _categoriaService: CategoriaService,
    private _snackBar: MatSnackBar, private modalActual: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private obCategoria: Categoria
  ){
    if(this.obCategoria != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    this.categoriaForm = this.initForm();
    if(this.obCategoria != null){
      this.setDatos(this.obCategoria);
    }
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      nombre_categoria: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion_categoria: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  setDatos(categoria: Categoria){
    this.categoriaForm.patchValue({
      id_categoria: categoria.id_categoria,
      nombre_categoria: categoria.nombre_categoria,
      descripcion_categoria: categoria.descripcion_categoria
    });
  }

  guardarCategoria(){
    const _categoria: Categoria = {
      id_categoria: this.obCategoria == null ? 0 : this.obCategoria.id_categoria,
      nombre_categoria: this.categoriaForm.value.nombre_categoria,
      descripcion_categoria: this.categoriaForm.value.descripcion_categoria
    }
    if(this.obCategoria == null){
      this._categoriaService.createCategoria(_categoria).subscribe({
        next: () => {
          this._snackBar.open('Categoría creada con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al crear la categoría', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }else{
      this._categoriaService.updateCategoria(_categoria).subscribe({
        next: () => {
          this._snackBar.open('Categoría actualizada con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al actualizar la categoría', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }
}
