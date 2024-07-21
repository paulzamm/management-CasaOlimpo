import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../../core/models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent {
  constructor(private formBuilder:FormBuilder){}

  clientesForm!: FormGroup;

  displayedColumns: string[] = ['id', 'cedula', 'nombre', 'apellido', 'correo', 'direccion', 'ciudad', 'acciones'];
  dataSource = dataClientes;
  

  ngOnInit(): void {
    this.clientesForm = this.initForm();    
  }

  onSubmit(){

  }
  
  onSetValue(){
  
  }

  initForm():FormGroup{
    return this.formBuilder.group({

    });
  }
}

const dataClientes: Cliente[] = [
  
];
