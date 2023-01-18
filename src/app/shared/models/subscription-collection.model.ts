import { Subscription, Subject } from 'rxjs';
export const serialUnsubscriber = (...subs: Subscription[]) => subs.filter(sub => sub instanceof Subscription && typeof sub.unsubscribe === 'function')
.forEach(sub => sub.unsubscribe());

export interface SubscriptionCollectionInterface {
  [key: string]: Subscription;
}



export class SubscriptionCollection{
  subs: SubscriptionCollectionInterface = {};
  destroy$ = new Subject();


  unsubscriber(): void{
    serialUnsubscriber(...Object.values(this.subs));
    this.destroy$.next();  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream

  }
}
