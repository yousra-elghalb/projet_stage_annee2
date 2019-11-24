import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {ListComponent} from './views/list/list.component';
import {DepensesResolverService} from './route-guards/depenses-resolver.service';


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
        categories: DepensesResolverService
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepenseRoutingModule {
}
