import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AgentComponent } from './shared/components/agent/agent.component';
import { GroupComponent } from './shared/components/group/group.component';
import { PolicyComponent } from './shared/components/policy/policy.component';
import { SinkComponent } from './shared/components/sink/sink.component';
import { DatasetComponent } from './shared/components/dataset/dataset.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: './token',
  },
  {
    path: 'token',
    component: LoginComponent,
  },
  {
    path: 'agent',
    component: AgentComponent,
  },
  {
    path: 'group',
    component: GroupComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'sink',
    component: SinkComponent,
  },
  {
    path: 'dataset',
    component: DatasetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
