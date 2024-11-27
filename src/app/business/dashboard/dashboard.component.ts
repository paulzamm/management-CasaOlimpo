import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { CategoriaService } from '../../core/services/categoria.service';
import { PrendaService } from '../../core/services/prenda.service';
import { Categoria } from '../../core/models/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrendaResponse } from '../../core/models/prenda-response';
import { VentaService } from '../../core/services/venta.service';
import { VentaResponse } from '../../core/models/venta-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private charVentas!: Chart;
  private charProductos!: Chart;
  listaCategorias: Categoria[] = [];
  listaPrendas: PrendaResponse[] = [];
  listaVentas: VentaResponse[] = [];
  ventasRecientes: VentaResponse[] = [];
  produtosVendidos: any[] = [];

  total: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private _categoriaService: CategoriaService,
    private _prendaService: PrendaService,
    private _ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.getPrendas();
    this.getVentas();
    this.graficarProductos(['Camisa Adidas', 'Zapato nike', 'CamisaH&M', 'ShortAdidas'], [10, 20, 30, 40]);
  }

  getCategorias() {
    this._categoriaService.getCategorias(0, 10000).subscribe({
      next: (data) => {
        this.listaCategorias = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las categorias', '', {
          duration: 2000,
        });
      },
    });
  }

  getPrendas() {
    this._prendaService.getPrendas(0, 10000).subscribe({
      next: (data) => {
        this.listaPrendas = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las prendas', '', {
          duration: 2000,
        });
      },
    });
  }

  getVentas() {
    this._ventaService.getVentas(0, 10000).subscribe({
      next: (data) => {
        this.listaVentas = data;
        // Filtrar ventas de los últimos 7 días
        const ahora = new Date();
        const hace7Dias = new Date(ahora);
        hace7Dias.setDate(ahora.getDate() - 7);

        this.ventasRecientes = data.filter((venta) => {
          const fechaVenta = new Date(venta.fecha_venta);
          return fechaVenta >= hace7Dias && fechaVenta <= ahora;
        });
        const labelTemp = this.ventasRecientes.map((value) => value.fecha_venta);
        const dataTemp = this.ventasRecientes.map((value) => value.total_venta);
        this.graficarVentas(labelTemp, dataTemp);
      },
      error: () => {
        this._snackBar.open('Error al cargar las ventas', '', {
          duration: 2000,
        });
      },
    });
  }

  totalCategorias(): number {
    return this.listaCategorias.length;
  }

  totalPrendas(): number {
    return this.listaPrendas.length;
  }

  totalVentas(): number {
    return this.listaVentas.length;
  }

  totalIngresos(): number {
    this.total = 0;
    this.listaVentas.forEach((venta) => {
      this.total += venta.total_venta;
    });
    return this.total;
  }
  
  graficarVentas(labelGrafico: any[], dataGrafico: any[]) {
    const dataVentas = {
      labels: labelGrafico,
      datasets: [
        {
          label: 'Venta',
          data: dataGrafico,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.charVentas = new Chart('charVentas', {
      type: 'bar',
      data: dataVentas,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  graficarProductos(labels: string[], data: number[]) {
    const dataProductos = {
      labels: labels,
      datasets: [
        {
          label: 'Productos',
          data: data,
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#FF785B'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#FF5733'],
          hoverBorderColor: 'rgba(234, 236, 244, 1)',
        },
      ],
    };

    this.charProductos = new Chart('charProductos', {
      type: 'doughnut' as ChartType,
      data: dataProductos,
    });
  }
}
