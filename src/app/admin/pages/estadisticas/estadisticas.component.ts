import { Component, OnInit } from '@angular/core';
import { GetCollectionsService } from 'src/app/services/get-collections.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
public totalPresupuestos:number=0;
public totalClientes:number=0;
public totalValue:number=0;
  constructor(private _presupuestos:GetCollectionsService) { }

  ngOnInit(): void {
    this.loadStatics()
  }

  async loadStatics(){
    const presupuestos= await this._presupuestos.getPresupuestos();
    const clientes= await this._presupuestos.getClients();
    console.log(presupuestos);
     this.totalPresupuestos=presupuestos.length;
     this.totalClientes=clientes.length;
     this.totalValue= presupuestos.map(item=>item.total).reduce((prev,curr)=>prev+curr,0)
  }
}
