import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSum]',
})
export class SumDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.innerText;
    const value = parseFloat(text);

    console.log(value);
    if (value > 0) {
      this.el.nativeElement.style.color = '#6EC82A';
      this.el.nativeElement.innerText = `+${text}`;
    } else if (value < 0) {
      this.el.nativeElement.style.color = 'rgba(230, 73, 45, 0.6)';
    }
  }
}
