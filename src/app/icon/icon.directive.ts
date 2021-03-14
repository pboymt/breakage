import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'codicon, [codicon]'
})
export class IconDirective {

  @Input('codicon')
  icon: string;

  @HostBinding('class')
  get eleClass(): string {
    return `codicon codicon-${this.icon}`;
  }

  constructor() { }

}
