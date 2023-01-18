import { LoaderComponent } from './../components/loader/loader.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MyOverlayRef } from '../models';


interface MyOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}


const DEFAULT_CONFIG: MyOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}
@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private overlay: Overlay
  ) { }


  open(config: MyOverlayConfig = {}): MyOverlayRef {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.createOverlay(dialogConfig)
    // Instantiate remote control
    const dialogRef = new MyOverlayRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(LoaderComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
    // Return remote control
    return dialogRef;

  }
  private createOverlay(config: MyOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: MyOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
