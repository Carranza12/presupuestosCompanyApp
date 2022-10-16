import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { SubheaderComponent } from './components/subheader/subheader.component';

//ANGULAR MATERIAL TOOLS
import {MatDialogModule} from '@angular/material/dialog';
import { AddPresupuestoComponent } from './components/modals/add-presupuesto/add-presupuesto.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { DetailPresupuestoComponent } from './components/modals/detail-presupuesto/detail-presupuesto.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { AddClientComponent } from './components/modals/add-client/add-client.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditProfileComponent } from './components/modals/edit-profile/edit-profile.component';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AsideComponent,
    HeaderComponent,
    SubheaderComponent,
    AddPresupuestoComponent,
    DetailPresupuestoComponent,
    AddClientComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule

  ],
  exports:[
    AsideComponent,
    HeaderComponent,
    SubheaderComponent,
    AddPresupuestoComponent,
    DetailPresupuestoComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    AddClientComponent,
    EditProfileComponent,
    MatExpansionModule
  ],
  providers:[
    MatDialogModule,
  ]
})
export class SharedModule { }
