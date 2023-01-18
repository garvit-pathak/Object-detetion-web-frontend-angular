import { OverlayRef } from '@angular/cdk/overlay';

export class MyOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
