import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {PokemonMaster} from "../pokemon.master";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {openSnackBar} from "../../util/snackbar/snackbar";

@Component({
  selector: 'app-pokemon-table-component',
  templateUrl: './pokemon-table.component.html',
  styles: [`

    table {
      width: 100%;
    }

    .row-is-clicked {
      font-weight: bold;
      background-color: #F39374 !important;
    }

    .row-select:hover {
      cursor: pointer;
      background-color: #F39374 !important;
    }
  `]
})
export class PokemonTableComponent implements OnInit, AfterViewInit {
  favorites: any[] = [];
  pokemonList: any[] = [];
  pokemonSelected: any;
  rowSelected: any;
  displayedColumns: string[] = ['id', 'img', 'name', 'experience', 'weight', 'actions'];
  dataSource = new MatTableDataSource<any>(this.pokemonList);
  pokemonInput = new FormControl();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @Output() size: EventEmitter<any> = new EventEmitter<any>();
  @Output() pokemonsToSave: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(
    private _pokemonMaster: PokemonMaster,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getMasters();
  }

  async getMasters() {
    await this.getPokemons();
  }

  async getPokemons() {
    this._pokemonMaster.getPokemons().then((res) => {
      if (res) {
        this.getPokemonsById(res);
      }
    });
  }

  async getPokemonsById(response: any) {
    for (let i = 1; i < response.count; i++) {
      this._pokemonMaster.getPokemonsById(i).then((res) => {
        this.buildPokemons(res, i);
      });

    }
  }

  private buildPokemons(res: any, id: number) {
    let pokemon = {
      id: id,
      name: res.name ? res.name : 'Sin identificar',
      img: res.sprites.back_default ? res.sprites.back_default : res.sprites.front_default,
      experience: res.base_experience ? res.base_experience : 0,
      weight: res.weight ? res.weight : 0,
      height: res.height ? res.height : 0,
      isFavorite: 'N',
      actions: [
        {
          type: 'mat-icon-button',
          class: 'mat-focus-indicator mat-icon-button mat-button-base',
          classIcon: 'icon-size-4 text-teal-500',
          icon: 'stars',
          action: () => this.getPokemonToFavorites(pokemon),
          tooltip: 'Favorito',
          disabled: false,
          shown: true,
        },
        {
          type: 'mat-icon-button',
          class: 'mat-focus-indicator mat-icon-button mat-button-base',
          classIcon: 'icon-size-4 text-teal-500',
          icon: 'search',
          action: () => this.toViewDetail(pokemon),
          tooltip: 'Detalles',
          disabled: false,
          shown: true,
        }
      ]
    }
    this.pokemonList.push(pokemon)
    this.dataSource = new MatTableDataSource<any>(this.pokemonList);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    console.log('input: ', this.pokemonInput.value)
    this.dataSource.filter = this.pokemonInput.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPokemonToFavorites(pokemon: { img: any; name: any; weight: any; id: number; experience: any; actions: { shown: boolean; classIcon: string; icon: string; tooltip: string; action: () => any; disabled: boolean; type: string; class: string }[]; isFavorite: string }) {
    let currentLenght = this.favorites.length;
    let index = this.favorites.findIndex(f => f.id === pokemon.id)
    if (index < 0) {
      this.favorites.push(pokemon);
      this.size.emit(this.favorites.length - currentLenght);
      this.pokemonsToSave.emit(this.favorites);
    } else {
      openSnackBar(this._pokemonMaster.snackbar, 'POKEMON YA FUE ELEGIDO');
      return;
    }
  }


  private toViewDetail(pokemon: { img: any; name: any; weight: any; id: number; experience: any; actions: ({ shown: boolean; classIcon: string; icon: string; tooltip: string; action: () => void; disabled: boolean; type: string; class: string } | { shown: boolean; classIcon: string; icon: string; tooltip: string; action: () => any; disabled: boolean; type: string; class: string })[]; isFavorite: string }) {
    this.rowSelected = pokemon;
    this.router.navigate(['view', this.rowSelected.id]);
    this._pokemonMaster.pokemon = this.rowSelected;
  }
}
