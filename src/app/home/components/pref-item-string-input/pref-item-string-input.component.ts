import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PrefItemStringInput } from '../../../core/services/settings/pref';

@Component({
  selector: 'app-pref-item-string-input',
  templateUrl: './pref-item-string-input.component.html',
  styleUrls: ['./pref-item-string-input.component.scss'],
  animations: [
    trigger('tipHideShow', [
      state('hide', style({
        transform: 'rotate(-180deg) scale(0)'
      })),
      state('show', style({
        transform: 'rotate(0) scale(1)'
      })),
      transition('hide => show', [
        style({
          transform: 'rotate(-180deg) scale(0)'
        }),
        animate('0.2s')
      ]),
      transition('show => hide', [
        animate('0.15s', style({
          transform: 'rotate(180deg) scale(0)'
        }))
      ])
    ])
  ]
})
export class PrefItemStringInputComponent implements OnInit, OnDestroy {

  private focused = false;

  show = false;

  @Input('option')
  option: PrefItemStringInput;

  @HostListener('click')
  onClick(): void {
    if (!this.focused) {
      this.focused = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onParentClick(e: MouseEvent): void {
    if (this.ele.nativeElement.contains(e.target as HTMLElement)) {
      return;
    }
    if (this.focused) {
      this.focused = false;
    }
  }

  @HostBinding('class.focus')
  get prefFocused(): boolean {
    return this.focused;
  }

  value: string;

  @ViewChild('inputText', { static: true })
  input: ElementRef<HTMLInputElement>;

  valueChange$: Observable<Event>;
  valueChange_: Subscription;

  constructor(
    private ele: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    this.value = localStorage.getItem(this.option.key) ?? '';
    this.valueChange$ = fromEvent(this.input.nativeElement, 'keydown');
    this.valueChange$.pipe(
      debounceTime(2000),
    ).subscribe((e) => {
      const ele = e.target as HTMLInputElement;
      console.log(ele.value);
      const newValue = ele.value ?? '';
      try {
        localStorage.setItem(this.option.key, newValue.trim());
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1700);
      } catch (error) {
        // console.log('');
      }
    });
  }

  ngOnDestroy(): void {
    this.valueChange_.unsubscribe();
  }

  onValueChange(v: string): void {
    // this.valueChange$.next(v);
  }



}
