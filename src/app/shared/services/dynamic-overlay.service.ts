import { LoaderComponent } from './../components/loader/loader.component';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayKeyboardDispatcher,
  OverlayPositionBuilder,
  ScrollStrategyOptions,
  OverlayRef
} from '@angular/cdk/overlay';
import {
  ComponentFactoryResolver,
  Inject,
  Injector,
  NgZone,
  Renderer2,
  RendererFactory2,
  Injectable,
  ElementRef
} from '@angular/core';
import { DynamicOverlayContainer } from './dynamic-overlay-container.service';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { MyOverlayRef } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DynamicOverlay extends Overlay {
  private readonly _dynamicOverlayContainer: DynamicOverlayContainer;
  private renderer: Renderer2;

  constructor(
    scrollStrategies: ScrollStrategyOptions,
    _overlayContainer: DynamicOverlayContainer,
    _componentFactoryResolver: ComponentFactoryResolver,
    _positionBuilder: OverlayPositionBuilder,
    _keyboardDispatcher: OverlayKeyboardDispatcher,
    _injector: Injector,
    _ngZone: NgZone,
    @Inject(DOCUMENT) _document: any,
    _directionality: Directionality,
    rendererFactory: RendererFactory2
  ) {
    super(
      scrollStrategies,
      _overlayContainer,
      _componentFactoryResolver,
      _positionBuilder,
      _keyboardDispatcher,
      _injector,
      _ngZone,
      _document,
      _directionality
    );
    this.renderer = rendererFactory.createRenderer(null, null);

    this._dynamicOverlayContainer = _overlayContainer;
  }


  open(el : ElementRef){
    const overlayRef = this.createWithDefaultConfig(el.nativeElement);
    const dialogRef = new MyOverlayRef(overlayRef);
    overlayRef.attach(new ComponentPortal(LoaderComponent));

    return dialogRef;
  }

  private setContainerElement(containerElement: HTMLElement): void {
    this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
    this._dynamicOverlayContainer.setContainerElement(containerElement);
  }

  public createWithDefaultConfig(containerElement: HTMLElement): OverlayRef {
    this.setContainerElement(containerElement);
    return super.create({
      positionStrategy: this.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true
    });
  }
}
