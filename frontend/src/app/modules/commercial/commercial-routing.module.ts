import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {ListComponent} from './views/list/list.component';
import {ListResolverService} from './route-guards/list-resolver.service';


const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      redirectTo: 'list'
    },
    {
      path: 'list/:externe',
      component: ListComponent,
      resolve: {
        categories: ListResolverService,
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule {
}
