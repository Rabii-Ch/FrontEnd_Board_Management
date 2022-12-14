import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards', component: CardsListComponent },
  { path: 'card/add', component: AddCardComponent },
  { path: 'card/:id', component: CardDetailsComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'user/add', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: UpdateUserComponent },
 
  // { path: '**', redirectTo: 'cards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }