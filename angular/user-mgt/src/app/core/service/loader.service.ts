import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private activeRequests = 0;

  constructor() { }

  // Method to show loader
  showLoader(): void {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.isLoading.next(true);
    }
  }

  // Method to hide loader
  hideLoader(): void {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.isLoading.next(false);
    }
  }

  // Observable to be subscribed by components
  get loaderState(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
