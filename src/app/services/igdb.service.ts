import { Injectable } from '@angular/core';
import apicalypse from 'apicalypse';

const requestOptions = {
  queryMethod: "body",
  method: "post",
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/',
  headers: {
    Accept: "application/json",
    "user-key": 'YOUR USER KEY FROM igdb.com/api',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: "json"
};

@Injectable({
  providedIn: 'root'
})
export class IgdbService {

  public async getGameById(query) {
    try {
      const response = await apicalypse(requestOptions)
        .fields(['name', 'cover.url', 'summary', 'platforms.name', 'genres.name'])
        .where(`id = ${query}`)
        .request('games/');
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
  public async searchGamesByName(query) {
    try {
      const response = await apicalypse(requestOptions)
        .fields(['name', 'cover.url', 'summary', 'platforms.name', 'genres.name'])
        .limit(50)
        .search(query)
        .where('cover.url!=null & summary!=null & platforms!=null & genres!=null')
        .request('games/');
      return response.data.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error(err);
    }
  }
  public async getAllGames(query) {
    const newOptions = { ...requestOptions, queryMethod: 'url', method: 'get' };
    try {
      const response = await apicalypse(newOptions)
        .request(`games/${query}?fields=name,cover.url,summary,platforms.name,genres.name&limit=50`);
      return response.data.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error(err);
    }
  }
}
