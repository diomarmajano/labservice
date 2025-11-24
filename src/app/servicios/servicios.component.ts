import { Component, OnInit } from '@angular/core';
import { JsonService } from '../services/json.servicios';
/**
 * @description
 * Este componente Muestra los servicios registrados en la aplicación.
 */
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers:[JsonService]
})
export class ServiciosComponent implements OnInit {
  servicios:any;
  
    constructor(private jsonService: JsonService) {}
  
    ngOnInit(): void {
        this.jsonService.getJsonData().subscribe(data=>{
          this.servicios=data;
        })
    }

}
