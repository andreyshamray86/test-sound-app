import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { Sound } from '@app/core/models/sound.model';

@Injectable({ providedIn: 'root' })
export class MainService {
  soundsData: Sound[] = [
    {
      id: 0,
      name: 'Night',
      filename: 'night.mp3',
      url: '../../../assets/night.mp3',
    },
    {
      id: 1,
      name: 'Thunderstorm',
      filename: 'thunderstorm.mp3',
      url: '../../../assets/thunderstorm.mp3',
    },
    {
      id: 2,
      name: 'Forest',
      filename: 'forest.mp3',
      url: '../../../assets/forest.mp3',
    },
    { id: 3, name: 'Sea', filename: 'sea.mp3', url: '../../../assets/sea.mp3' },
  ];

  selectedSound$ = new Subject<Sound>();
  song$ = new Subject<HTMLAudioElement>();
  songDuration$ = new Subject<number>();
  currentTime$ = new Subject<string>();
  changingTime$ = new Subject<string>();
  selectedSound: Sound | null = null;
  playingSong = 0;
  songDuration: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';
  song = new Audio();

  constructor() {
    this.song.ondurationchange = () => {
      const totalSeconds = Math.floor(this.song.duration),
        duration = moment.duration(totalSeconds, 'seconds');
      this.songDuration =
        duration.seconds() < 10
          ? `${Math.floor(duration.asMinutes())}:0${duration.seconds()}`
          : `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
      this.duration = totalSeconds;
      this.songDuration$.next(this.duration);
      this.changingTime$.next(this.songDuration);
    };

    this.song.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.song.currentTime),
        'seconds'
      );
      this.currentTime =
        duration.seconds() < 10
          ? `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}`
          : `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
      this.currentTime$.next(this.currentTime);
    };
  }

  onSelectSound(sound: Sound) {
    this.selectedSound = sound;
    this.selectedSound$.next(sound);
    this.song$.next(this.song);
    this.playSong(sound.id);
  }

  playSong(songIndex?: number) {
    if (songIndex === undefined) {
      if (this.song.paused) {
        if (this.song.readyState === 0) {
          this.playingSong = 0;
          this.selectedSound = this.soundsData[0];
          this.song.src = this.selectedSound.url;
        }
        this.song.play();
      } else {
        this.song.pause();
      }
    } else {
      this.playingSong = songIndex;
      this.selectedSound = this.soundsData[songIndex];
      this.song.src = this.selectedSound.url;
      this.song.play();
    }
  }

  previousSong(): void {
    if (this.playingSong === 0) {
      this.playingSong = this.soundsData.length - 1;
    } else {
      this.playingSong--;
    }
    this.selectedSound$.next(this.soundsData[this.playingSong]);
    this.selectedSound = this.soundsData[this.playingSong];
    this.song.src = this.selectedSound.url;
    this.song.play();
  }

  nextSong(): void {
    if (this.playingSong === this.soundsData.length - 1) {
      this.playingSong = 0;
    } else {
      this.playingSong++;
    }
    this.selectedSound$.next(this.soundsData[this.playingSong]);
    this.selectedSound = this.soundsData[this.playingSong];
    this.song.src = this.selectedSound.url;
    this.song.play();
  }

  setVolume(event: any) {
    this.song.volume = event.target.value / 16;
  }

  setDuration(event: any) {
    this.song.currentTime = event.target.value;
  }
}
