import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MainService } from '../main.service';
import { Sound } from '@app/core/models/sound.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selected-sound',
  templateUrl: './selected-sound.component.html',
  styleUrls: ['./selected-sound.component.scss'],
})
export class SelectedSoundComponent implements OnInit, OnDestroy {
  selectedSound: Sound | null = null;
  private soundSub$: Subscription | null = null;
  private songSub$: Subscription | null = null;
  private songDuration$: Subscription | null = null;
  private currentTime$: Subscription | null = null;
  private changingTime$: Subscription | null = null;
  song: HTMLAudioElement | null = null;
  songDuration: number = 1;
  currentTime: string = '0:00';
  changingTime: string = '0:00';

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.soundSub$ = this.mainService.selectedSound$.subscribe((sound) => {
      this.selectedSound = sound;
    });
    this.songSub$ = this.mainService.song$.subscribe((song) => {
      this.song = song;
    });
    this.songDuration$ = this.mainService.songDuration$.subscribe((value) => {
      this.songDuration = value;
      console.log(this.songDuration);
    });
    this.currentTime$ = this.mainService.currentTime$.subscribe((value) => {
      this.currentTime = value;
    });
    this.changingTime$ = this.mainService.changingTime$.subscribe((value) => {
      this.changingTime = value;
    });
  }

  ngOnDestroy(): void {
    this.soundSub$?.unsubscribe();
    this.songSub$?.unsubscribe();
    this.songDuration$?.unsubscribe();
    this.currentTime$?.unsubscribe();
    this.changingTime$?.unsubscribe();
  }

  onPlayHandler() {
    this.mainService.playSong();
  }

  onPrevHandler() {
    this.mainService.previousSong();
  }

  onNextHandler() {
    this.mainService.nextSong();
  }

  volumeHandler(value: any) {
    this.mainService.setVolume(value);
  }

  durationHandler(value: any) {
    this.mainService.setDuration(value);
  }
}
