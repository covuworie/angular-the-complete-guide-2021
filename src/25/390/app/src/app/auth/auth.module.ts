import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
