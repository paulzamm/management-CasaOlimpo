import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../core/services/marca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from '../../../core/models/marca';

@Component({
  selector: 'app-modal-marca',
  templateUrl: './modal-marca.component.html',
  styleUrl: './modal-marca.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalMarcaComponent implements OnInit{
  marcaForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';

  constructor(private _formBuilder: FormBuilder, private _marcaService: MarcaService,
    private _snackBar: MatSnackBar, private modalActual: MatDialogRef<ModalMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) private obMarca: Marca
  ){
    if(this.obMarca != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    this.marcaForm = this.initForm();
    if(this.obMarca != null){
      this.setDatos(this.obMarca);
    }
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      nombre_marca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion_marca: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  setDatos(marca: Marca){
    this.marcaForm.patchValue({
      id_marca: marca.id_marca,
      nombre_marca: marca.nombre_marca,
      descripcion_marca: marca.descripcion_marca
    });
  }

  guardarMarca(){
    const _marca: Marca = {
      id_marca: this.obMarca == null ? 0 : this.obMarca.id_marca,
      nombre_marca: this.marcaForm.value.nombre_marca,
      descripcion_marca: this.marcaForm.value.descripcion_marca
    }
    if(this.obMarca == null){
      this._marcaService.createMarca(_marca).subscribe({
        next: () => {
          this._snackBar.open('Marca creada con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al crear la marca', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }else{
      this._marcaService.updateMarca(_marca).subscribe({
        next: () => {
          this._snackBar.open('Marca actualizada con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al actualizar la marca', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }
}
