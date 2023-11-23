import {Injectable} from "@angular/core";
import {PokemonService} from "../services/pokemon.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FavoritePokemonModel} from "../model/favorite-pokemon.model";
import {openSnackBar} from "../util/snackbar/snackbar";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PokemonMaster {

  private _pokemon: any;

  constructor(
    private _pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {
  }

  get snackbar() {
    return this._snackBar;
  }

  get pokemon() {
    return this._pokemon;
  }

  set pokemon(value: any) {
    this._pokemon = value;
  }

  getPokemons(): Promise<any> {
    return this._pokemonService.get().then((res) => {
        if (res) {
          return res;
        } else {
          console.log(res);
        }
      }
    ).catch((err) => console.log("error peticion: ", err))
  }

  getPokonsList(parameters: HttpParams) {
    return this._pokemonService.getPokemons(parameters).then((response) => {
      if (response.exitoso) {
        return response.data.list;
      } else {
        openSnackBar(this._snackBar, response.messages);
        return null;
      }
    })
  }

  getPokemonsById(index: any) {
    return this._pokemonService.getByIndex(index).then((res) => {
        if (res) {
          return res;
        } else {
          console.log(res);
        }
      }
    ).catch((err) => console.log("error peticion: ", err))
  }

  addFavorites(_favorites: FavoritePokemonModel[]) {
    return this._pokemonService.addFavorites(_favorites).then((res) => {
      if (res.exitoso) {
        return res.data.data;
      } else {
        openSnackBar(this._snackBar, res.messages);
        return null;
      }
    }).catch((err) => console.log("error peticion: ", err))
  }

}
