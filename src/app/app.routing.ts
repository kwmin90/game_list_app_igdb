import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent},
    { path: 'game/:id', component: GameComponent },
    { path: 'search/:name', component: SearchComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
