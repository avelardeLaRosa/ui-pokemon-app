import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {PokemonMaster} from "./pokemon.master";
import {PokemonService} from "../services/pokemon.service";
import {FavoritePokemonModel} from "../model/favorite-pokemon.model";
import {openSnackBar} from "../util/snackbar/snackbar";

@Component({
  selector: 'app-pokemon-component',
  templateUrl: './pokemon.component.html'
})
export class PokemonComponent implements OnInit, AfterViewInit {

  favoritesSize = 0;
  pokemonListToSave: FavoritePokemonModel[] = [];

  constructor(
    private _pokemonMaster: PokemonMaster,
    private _pokemonService: PokemonService
  ) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getMasters();
  }

  async getMasters() {

  }

  getFavoritezSize(event: any) {
    this.favoritesSize += event;
  }

  getPokemonsToSave(event: any[]) {
    this.pokemonListToSave = event.map((pokemon) => {
      let pokemonToSave = new FavoritePokemonModel();
      pokemonToSave.serviceId = pokemon.id;
      pokemonToSave.name = pokemon.name;
      pokemonToSave.img = pokemon.img;
      pokemonToSave.experience = pokemon.experience;
      pokemonToSave.weight = pokemon.weight;
      pokemonToSave.height = pokemon.height;
      pokemonToSave.isFavorite = pokemon.isFavorite;
      return pokemonToSave
    })

  }

  saveFavorites() {
    if (this.favoritesSize <= 0) {
      openSnackBar(this._pokemonMaster.snackbar, "NO A SELECCIONADO NINGUN POKEMON  ");
      return;
    }
    this._pokemonMaster.addFavorites(this.pokemonListToSave).then((res) => {
      if (res) {
        openSnackBar(this._pokemonMaster.snackbar, "SE AGREGARON FAVORITOS");
      }
    })
  }

  getFavoritePokemons() {
    this._pokemonMaster.getPokonsList(null).then((response) => {
    })

  }
}
