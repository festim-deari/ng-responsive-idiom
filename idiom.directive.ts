import { Directive, ElementRef, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[idiom]'
})
export class IdiomDirective implements AfterViewInit, OnDestroy {

  @Input() phone = "";
  @Input() tablet = "";
  @Input() laptop = "";
  @Input() pc = "";
  @Input() classOnPhone = "";
  @Input() classOnTablet = "";
  @Input() classOnLaptop = "";
  @Input() classOnPc = "";
  subscription: Subscription;
  originalStyle = "";
  originalClass = "";
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.originalStyle = (<HTMLElement>this.el.nativeElement).style.cssText;
    this.originalClass = <string>(<any>(<HTMLElement>this.el.nativeElement).classList).value + " ";

    if (window.matchMedia("(max-width: 768px)").matches) {
      (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.phone;
      (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnPhone + " ";
    } else if (window.matchMedia("(min-width: 769px) and (max-width: 992px)").matches) {
      (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.tablet;
      (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnTablet + " ";
    } else if (window.matchMedia("(min-width:993px) and (max-width: 1200px)").matches) {
      (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.laptop;
      (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnLaptop + " ";
    } else if (window.matchMedia("(min-width:1201px)").matches) {
      (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.pc;
      (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnPc + " ";
    }
    const ev = fromEvent(window, 'resize');
    this.subscription = ev.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
      .subscribe(e => {
        if (window.matchMedia("(max-width: 768px)").matches) {
          (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.phone;
          (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnPhone + " ";
        } else if (window.matchMedia("(min-width: 769px) and (max-width: 992px)").matches) {
          (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.tablet;
          (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnTablet + " ";
        } else if (window.matchMedia("(min-width:993px) and (max-width: 1200px)").matches) {
          (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.laptop;
          (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass  + this.classOnLaptop + " ";
        } else if (window.matchMedia("(min-width:1201px)").matches) {
          (<HTMLElement>this.el.nativeElement).style.cssText = this.originalStyle + this.pc;
          (<any>(<HTMLElement>this.el.nativeElement).classList).value = this.originalClass + this.classOnPc + " ";
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
