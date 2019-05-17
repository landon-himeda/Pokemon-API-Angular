import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getPokemon();
  }
  getPokemon() {
    let bulbObservable = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbObservable.subscribe((data) => {
      var abilitiesArr = [];
      var abilitiesString = "";
      // console.log(data)
      for (let i=0; i< data.abilities.length; i++) {
        abilitiesArr.push(data.abilities[i].ability.name);
      }
      // console.log(abilitiesArr)
      for (let i=0; i< abilitiesArr.length -1; i++) {
        abilitiesString += `${abilitiesArr[i]}, `;
      }
      abilitiesString += `and ${abilitiesArr[abilitiesArr.length - 1]}`
      console.log(`${data.name}'s abilities are ${abilitiesString}.`);

      for (let ability of data.abilities) {
        // console.log(ability.ability.url)
        let tempObservable = this._http.get(ability.ability.url);
        tempObservable.subscribe((data) => {
          console.log(`${data.name} is used by ${data.pokemon.length - 1} other Pokemon.`)
        })
      }
    });
  }
}
