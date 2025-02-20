import { Routes } from '@angular/router';
import {RegistrationStatsComponent} from './registration-stats/registration-stats.component'
import {StatsComponent} from './Registration/stats/stats.component'
export const routes: Routes = [
    {
        path:'Report',
        component:RegistrationStatsComponent
    },
    {
        path:'',
        component:StatsComponent
    }
];
