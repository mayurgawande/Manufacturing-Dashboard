import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/core/service/error.service';


@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss']
})
export class ErrorHandlingComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private errorSubscription!: Subscription;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorSubscription = this.errorService.getError().subscribe(message=> {
      this.errorMessage = message;
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  closeError(): void {
    this.errorMessage = null;
  }
}
