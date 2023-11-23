import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonComponent} from "./pokemon/pokemon.component";
import {PokemonViewComponent} from "./pokemon/table/view/pokemon-view.component";

const routes: Routes = [
  {
    path: '',
    component: PokemonComponent
  },
  {
    path: 'view/:id',
    component: PokemonViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
