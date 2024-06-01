import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { AddCardComponent } from './core/routes/addCard/addCard.component';
import { ManageCardsComponent } from './core/routes/manageCards/manageCards.component';
import { ReviewCardsComponent } from './core/routes/reviewCards/reviewCards.component';
import { LoginComponent } from './core/login/login.component';
import { CardDetailsComponent } from './core/routes/cardDetails/cardDetails.component';
import { EditCardComponent } from './core/routes/editCard/editCard.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Joshu'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Log In'
    },
    {
        path: 'addCard',
        component: AddCardComponent,
        title: 'Add a new Card'
    },
    {
        path: 'manageCards',
        component: ManageCardsComponent,
        title: 'Manage your Cards'
    },
    {
        path: 'reviewCards',
        component: ReviewCardsComponent,
        title: 'Review your Cards'
    },
    {
        path: 'card/:cardID',
        component: CardDetailsComponent,
        title: 'Review your Cards'
    },
    {
        path: 'editCard/:cardID',
        component: EditCardComponent,
        title: 'Review your Cards'
    }
];
