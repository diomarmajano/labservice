import { Component, OnInit } from '@angular/core';
import { JsonService } from '../services/json.service';



@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers:[JsonService]
})
export class BalanceComponent implements OnInit{
  balances:any;

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
      this.jsonService.getJsonData().subscribe(data=>{
        this.balances=data;
      })
  }
}
