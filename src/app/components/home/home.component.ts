import { Component, OnInit } from '@angular/core';
import { IgdbService } from '../../services/igdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  defaultItems: any[];
  listExists = false;
  
  defaultGamesList: number[] = [115, 114283, 1443, 76816, 40477, 26845, 24220, 7323, 
    37777, 1164, 9740, 9498, 11169, 2449, 359, 384, 389, 1121, 19441, 1520, 19131, 23441, 115989, 23865];

  items: any[] = JSON.parse(localStorage.getItem('gameList'));
  p: number = 1;

  constructor(private igdb: IgdbService) { }

  ngOnInit() {
    this.checkIfListExists();
  }

  checkIfListExists(){
    if(this.items==null){
      this.listExists = false;
      this.searchInitial(this.defaultGamesList);
    }else{
      this.listExists = true;
    }
  }
  searchInitial(query){
    this.igdb.getAllGames(query).then(data =>{
      this.defaultItems = data;
    });
  }
}
