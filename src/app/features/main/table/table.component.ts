import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sound } from '@app/core/models/sound.model';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'filename'];
  dataSource: Sound[] = [];
  private songSub$: Subscription | null = null;
  selectedSound: Sound | null = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.dataSource = this.mainService.soundsData;
    this.songSub$ = this.mainService.selectedSound$.subscribe((sound) => {
      this.selectedSound = sound;
    });
  }

  ngOnDestroy(): void {
    this.songSub$?.unsubscribe();
  }

  onSelectSound(sound: Sound) {
    this.selectedSound = sound;
    this.mainService.onSelectSound(sound);
  }
}
