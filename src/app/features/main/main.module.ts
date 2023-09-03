import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { SelectedSoundComponent } from './selected-sound/selected-sound.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainComponent, TableComponent, SelectedSoundComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    CommonModule,
  ],
})
export class MainModule {}
