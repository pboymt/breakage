import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TranslationService } from './services/translation.service';


@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit, OnDestroy {

  @ViewChild('resize')
  resize: ElementRef;

  showTranslation = false;
  listener: Subscription;

  get originalText(): string {
    return this.translation.originalText;
  }

  get resultText(): string {
    return this.translation.resultText;
  }

  constructor(
    private ele: ElementRef,
    private router: Router,
    private translation: TranslationService,
    private events: EventManager
  ) { }

  ngOnInit(): void {
    console.log(this.ele);
    this.listener = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url)
    )
      .subscribe((s) => {
        if (s.startsWith('/doc')) {
          this.showTranslation = true;
        } else {
          this.showTranslation = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.listener instanceof Subscription) {
      this.listener.unsubscribe();
    }
  }

  onResizeEnd(e: ResizeEvent): void {
    (this.resize.nativeElement as HTMLDivElement).style.width = `${e.rectangle.width}px`;
    window.dispatchEvent(new Event('resize'));
  }


}
