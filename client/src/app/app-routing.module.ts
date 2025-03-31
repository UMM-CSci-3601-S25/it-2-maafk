import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './hosts/host-list.component';
import { AddPlayerComponent } from './players/player-list.component';
import { HostSettingsComponent } from './hosts/host-setting.component';
import { GameComponent } from './game/game.component';
import { JoinComponent } from './join/join.component';


// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'host', component: HostComponent, title: 'Host'},
  {path: 'player', component: AddPlayerComponent, title: 'Player'},
  {path: 'prompts', component: HostSettingsComponent, title: 'Host Settings'},
  {path: 'host/settings', component: HostSettingsComponent, title: 'Host Settings'},

  {path: 'games', component: HomeComponent},
  {path: 'games/join', component: JoinComponent, title: "PRAGmatic"},
  {path: 'games/new', component: HostComponent, title: "PRAGmatic"},
  {path: 'games/:id', component: GameComponent, title: "Game"},

  {path: 'game', component: GameComponent, title: 'Game'},
  {path: 'game/temporary', component: GameComponent, title: 'Temporary Game'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

