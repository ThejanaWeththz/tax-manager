import { Routes } from '@angular/router';
import { TaxRecordListComponent } from './tax-record-list/tax-record-list.component';
import { TaxRecordFormComponent } from './tax-record-form/tax-record-form.component';

export const routes: Routes = [
    { path: '', component: TaxRecordListComponent },
    { path: 'form', component: TaxRecordFormComponent },
    { path: 'form/:id', component: TaxRecordFormComponent },
];
