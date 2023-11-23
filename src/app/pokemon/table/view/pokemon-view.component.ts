import {Component, OnInit} from "@angular/core";
import {PokemonMaster} from "../../pokemon.master";
import {ThemePalette} from "@angular/material/core";
import {Router} from "@angular/router";

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-pokemon-view-component',
  templateUrl: './pokemon-view.component.html',
  styles: [`
    .example-card {
      max-width: 400px;
    }

    .example-header-image {
      background-size: cover;
    }

    mat-chip {
      max-width: 100px;
    }
  `]
})
export class PokemonViewComponent implements OnInit {

  pokemonSelected: any;
  pokemonFound: any;

  constructor(
    private _pokemonMaster: PokemonMaster,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getMasters();
  }

  private getMasters() {
    this.pokemonSelected = this._pokemonMaster.pokemon;
    this._pokemonMaster.getPokemonsById(this.pokemonSelected.id).then(res => res ? this.pokemonFound = res : this.pokemonFound = null);
  }

  return() {
    this.router.navigate(['']);
  }
}

