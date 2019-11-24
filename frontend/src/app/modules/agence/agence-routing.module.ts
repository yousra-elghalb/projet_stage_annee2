import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {ListComponent} from './views/list/list.component';
import {AgencesResolverService} from './route-guards/agences-resolver.service';


const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      redirectTo: 'list'
    },
    {
      path: 'list',
      component: ListComponent,
      resolve: {
        categories: AgencesResolverService
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenceRoutingModule {
}
