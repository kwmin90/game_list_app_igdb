import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IgdbService } from '../../services/igdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = "initial val";
  items: any[];
  p: number = 1;


  constructor(private route: ActivatedRoute, private igdb: IgdbService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get("name");
      this.searchGames(this.query);
      this.p = 1;
    });
  }

  searchGames(query) {
    this.igdb.searchGamesByName(query).then(data =>{
      this.items = data;
    });
  }
}
