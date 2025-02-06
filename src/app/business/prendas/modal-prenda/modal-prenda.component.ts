import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrendaService } from '../../../core/services/prenda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prenda } from '../../../core/models/prenda';
import { Categoria } from '../../../core/models/categoria';
import { Marca } from '../../../core/models/marca';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'; 

@Component({
  selector: 'app-modal-prenda',
  templateUrl: './modal-prenda.component.html',
  styleUrl: './modal-prenda.component.css'
})
export class ModalPrendaComponent implements OnInit{
  prendaForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';
  listaCategorias: Categoria [] = [];
  listaMarcas: Marca [] = [];
  imageURL: string = {} as string;
  nombreImagen: string = '';
  loading = false;

  constructor(private _formBuilder: FormBuilder, private _prendaService: PrendaService,
    private _snackBar: MatSnackBar, private modalActual: MatDialogRef<ModalPrendaComponent>,
    private _categoriaService: CategoriaService, private _marcaService: MarcaService,
    private storage: Storage, @Inject(MAT_DIALOG_DATA) private obPrenda: Prenda
  ){
    if(this.obPrenda != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
      this.getImage(obPrenda.img_prenda);
      this.nombreImagen = obPrenda.img_prenda;
    }
  }
  
  ngOnInit(): void {
    this.prendaForm = this.initForm();
    this.getCategorias();
    this.getMarcas();
    if(this.obPrenda != null){
      this.setDatos(this.obPrenda);
    }
  }

  getCategorias(){
    this._categoriaService.getCategorias(0, 10000).subscribe({
      next: (data) => {
        this.listaCategorias = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las categorias', '', {
          duration: 2000
        });
      }
    });
  }

  getMarcas(){
    this._marcaService.getMarcas(0, 10000).subscribe({
      next: (data) => {
        this.listaMarcas = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las marcas', '', {
          duration: 2000
        });
      }
    });
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      id_categoria: ['', [Validators.required]],
      id_marca: ['', [Validators.required]],
      nombre_prenda: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcion_prenda: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      talla_prenda: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      color_prenda: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      precio_prenda: ['', [Validators.required, Validators.min(1)]],
    });
  }

  setDatos(prenda: Prenda){
    this.prendaForm.patchValue({
      id_prenda: prenda.id_prenda,
      id_categoria: prenda.id_categoria,
      id_marca: prenda.id_marca,
      nombre_prenda: prenda.nombre_prenda,
      descripcion_prenda: prenda.descripcion_prenda,
      talla_prenda: prenda.talla_prenda,
      color_prenda: prenda.color_prenda,
      precio_prenda: prenda.precio_prenda,
    });
  }
  
  uploadImage(event: any){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = event.target.files[0];
      const imgRef = ref(this.storage, `prendas/${file.name}`);
      this.imageURL = '';
      this.nombreImagen = '';
      this.loading = true;
      uploadBytes(imgRef, file)
      .then(() => {
        this.nombreImagen = file.name;
        this.getImage(file.name);
        this.loading = false;
      })
      .catch(() => {
        this._snackBar.open('Error al subir la imagen', '', {
          duration: 2000
        });
        this.loading = false;
      });
    }else{
      this._snackBar.open('No hay imagen seleccionada', '', {
        duration: 2000
      });
    }
  }

  getImage(imageName: string){
    this.loading = true;
    const imgRef = ref(this.storage, `prendas/${imageName}`);
    getDownloadURL(imgRef)
    .then((url) =>{
      this.imageURL = '';
      this.imageURL = url;
      this.loading = false;
    })
    .catch((error) =>{
      console.log(error);
      this._snackBar.open('Error al cargar la imagen', '', {
        duration: 2000
      });
      this.loading = false;
    });
  }

  guardarPrenda(){
    const _prenda: Prenda = {
      id_prenda: this.obPrenda == null ? 0 : this.obPrenda.id_prenda,
      id_categoria: this.prendaForm.value.id_categoria,
      id_marca: this.prendaForm.value.id_marca,
      nombre_prenda: this.prendaForm.value.nombre_prenda,
      descripcion_prenda: this.prendaForm.value.descripcion_prenda,
      talla_prenda: this.prendaForm.value.talla_prenda,
      color_prenda: this.prendaForm.value.color_prenda,
      precio_prenda: this.prendaForm.value.precio_prenda,
      img_prenda: this.nombreImagen
    };

    if(this.obPrenda == null){
      this._prendaService.createPrenda(_prenda).subscribe({
        next: (res) =>{
          if(res){
            this._snackBar.open('Prenda guardada correctamente', '', {
              duration: 1500,
            });
          }else{
            this._snackBar.open('No se pudo guardar la prenda', '', {
              duration: 2000,
            });
          }
          
          this.modalActual.close('true');
        },
        error: () =>{
          this._snackBar.open('Error al guardar la prenda', '', {
            duration: 2000,
          });
        }
      });
    }else{
      this._prendaService.updatePrenda(_prenda).subscribe({
        next: (res) =>{
          if(res){
            this._snackBar.open('Prenda actualizada correctamente', '', {
              duration: 2000,
            });
          }else{
            this._snackBar.open('No se pudo actualizar la prenda', '', {
              duration: 2000,
            });
          }
          
          this.modalActual.close('true');
        },
        error: () =>{
          this._snackBar.open('Error al actualizar la prenda', '', {
            duration: 2000,
          });
        }
      });
    }
  }
}
