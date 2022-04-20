import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfacesModule } from './interfaces/interfaces.module';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InterfacesModule,
    ServicesModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class SharedModule { }
