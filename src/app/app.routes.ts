import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { AddCardComponent } from './core/addCard/addCard.component';
import { ManageCardsComponent } from './core/manageCards/manageCards.component';
import { ReviewCardsComponent } from './core/reviewCards/reviewCards.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Joshu'
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
    }
];
