import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FavoritePokemonModel} from "../model/favorite-pokemon.model";
import {ApiResponse} from "../model/ApiResponse";
import {openSnackBar} from "../util/snackbar/snackbar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  pokeService: string = `https://pokeapi.co/api/v2`;
  localService: string = `http://localhost:8080/poke-api/pokemon`;
  getSubscription?: Subscription;

  constructor(private _httpClient: HttpClient, private _snackBar: MatSnackBar) {
  }

  get(): Promise<any> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.get<any>(`${this.pokeService}/pokemon-species`).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (e) => {
          console.log(e.error.message)
        }
      })
    })
  }

  getPokemons(parameters: HttpParams): Promise<ApiResponse<FavoritePokemonModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.get<any>(`${this.localService}`, {params: parameters}).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (e) => {
          console.log(e.error.message)
        }
      })
    })
  }

  getByIndex(index: any) {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.get<any>(`${this.pokeService}/pokemon/` + `${index}`).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (e) => {
          console.log(e.error.message)
        }
      })
    })

  }

  addFavorites(_favorites: FavoritePokemonModel[]): Promise<ApiResponse<FavoritePokemonModel>> {
    return new Promise((resolve) => {
      this.getSubscription = this._httpClient.post<any>(`${this.localService}/favorite`, _favorites).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (e) => {
          console.log('E: ', e);
          openSnackBar(this._snackBar, e.error.messages);
        }
      })
    })
  }

}
