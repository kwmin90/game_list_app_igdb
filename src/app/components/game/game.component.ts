import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item.model';
import { IgdbService } from '../../services/igdb.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  item: any;
  platforms: any;
  genres: any;
  urlParam = "initial val";

  constructor(private route: ActivatedRoute, private igdb: IgdbService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.urlParam = params.get("id");
      this.getGameById(this.urlParam);
    });
  }

  getGameById(query) {
    this.igdb.getGameById(query).then(data =>{
      this.item = data;
      this.platforms = [...this.item[0].platforms];
      this.genres = [...this.item[0].genres];
    });
  }

  storeInLocalStorage(id) {
    let allPlatforms = {...this.item[0].platforms};
    if (id) {
      let item: Item = {
        id: this.item[0].id,
        cover: {
          id: this.item[0].cover.id,
          url: this.item[0].cover.url
        },
        name: this.item[0].name,
        platforms: allPlatforms,
        summary: this.item[0].summary
      };
      if (localStorage.getItem('gameList') == null) {
        let gameList: any = [];
        gameList.push(item);
        localStorage.setItem('gameList', JSON.stringify(gameList));
      } else {
        let gameList: any = JSON.parse(localStorage.getItem('gameList'));
        let index: number = -1;
        for (var i = 0; i < gameList.length; i++) {
          let item: Item = gameList[i];
          if (item.id == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          gameList.push(item);
          localStorage.setItem('gameList', JSON.stringify(gameList));
        }
      }
    }
  }
}
