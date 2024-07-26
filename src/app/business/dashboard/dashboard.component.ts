import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private charVentas!: Chart;
  private charProductos!: Chart;
  constructor(private auth: AuthService){}


  ngOnInit(): void {
    //Gráfica de ventas
    const labelsVentas = [
      '13/06/2024',
      '14/06/2024',
      '15/06/2024',
      '16/06/2024',
      '17/06/2024',
      '18/06/2024',
      '19/06/2024',
    ];
    const dataVentas = {
      labels: labelsVentas,
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
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

    //Gráfica de productos
    const dataProductos = {
      labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [55, 30, 15, 10],
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
