import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit , OnDestroy {
  subscribeTimer
  timeLeft = 20
  interval
  accessCode
  constructor(
    public dialogRef:MatDialogRef<PaymentSuccessComponent>,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.accessCode = this.route.snapshot.queryParams.accessCode
    this.startTimer()
  }
  ngOnDestroy(): void {
    this.close()
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {

        if(this.accessCode){
          this.router.navigate([''])
        }
        else{
          this.router.navigate(['dashboard'])

        }
        this.close()
      }
    },1000)
  }
  close(){
    clearInterval(this.interval);

    if(this.dialogRef){
      this.dialogRef.close()
    }

  }

}
