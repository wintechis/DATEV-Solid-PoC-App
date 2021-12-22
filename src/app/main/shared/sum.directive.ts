import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSum]',
})
export class SumDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.innerText;
    const value = parseFloat(text.replace("+", ""));

    if (value > 0) {
      this.renderer.setStyle(this.el.nativeElement, "color", '#6EC82A');
      this.el.nativeElement.innerText = `+${text}`;
    } else if (value < 0) {
      this.renderer.setStyle(this.el.nativeElement, "color", 'rgba(230, 73, 45, 0.6)');
    }
  }
}
