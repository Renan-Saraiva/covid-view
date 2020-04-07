import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './pages/country/country.component';
import { WorldComponent } from './pages/world/world.component';


const routes: Routes = [
  { path: '', redirectTo: '/world', pathMatch: 'full' },
  { path: 'world', component: WorldComponent },
  { path: 'country/:country', component: CountryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
