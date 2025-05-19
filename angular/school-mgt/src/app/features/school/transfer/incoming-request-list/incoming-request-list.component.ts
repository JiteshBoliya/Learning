import { Component, OnInit, signal } from '@angular/core';
import { TransferService } from '../../../../core/services/transfer.service';

@Component({
  selector: 'app-incoming-request-list',
  standalone: false,
  templateUrl: 'incoming-request-list.component.html',
  styleUrl: './incoming-request-list.component.scss'
})

export class IncomingRequestListComponent implements OnInit {
  inboxRequestList = signal<any[]>([]);
  constructor(private transferService: TransferService) { }
  loginId = localStorage.getItem('loginId');
  ngOnInit(): void {
    this.loadList();
  }

  onAction(transferId: string, action: string) {
    const result = this.transferService.updateAction(transferId, action);
    if (result) {
      this.loadList();
    }
  }

  loadList() {
    if (this.loginId) {
      const result = this.transferService.inboxList(this.loginId);
      if (result) {
        this.inboxRequestList.set(result);
      }
    }
  }
}
