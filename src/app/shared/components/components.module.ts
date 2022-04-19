import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentComponent } from './agent/agent.component';
import { GroupComponent } from './group/group.component';
import { SinkComponent } from './sink/sink.component';
import { DatasetComponent } from './dataset/dataset.component';
import { PolicyComponent } from './policy/policy.component';



@NgModule({
  declarations: [LoginComponent, AgentComponent, GroupComponent, SinkComponent, DatasetComponent, PolicyComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
