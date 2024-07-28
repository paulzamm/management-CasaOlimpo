import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrendaService } from '../../../core/services/prenda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prenda } from '../../../core/models/prenda';

@Component({
  selector: 'app-modal-prenda',
  templateUrl: './modal-prenda.component.html',
  styleUrl: './modal-prenda.component.css'
})
export class ModalPrendaComponent {
  prendaForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';

  constructor(private _formBuilder: FormBuilder, private _prendaService: PrendaService,
    private _snackBar: MatSnackBar, private modalActual: MatDialogRef<ModalPrendaComponent>,
    @Inject(MAT_DIALOG_DATA) private obPrenda: Prenda
  ){
    if(this.obPrenda != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  
}
