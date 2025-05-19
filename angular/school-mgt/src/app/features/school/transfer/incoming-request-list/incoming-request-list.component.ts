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

  ngOnInit(): void {
    const loginId = localStorage.getItem('loginId');
    if (loginId) {
      this.inboxRequestList.set(this.transferService.inboxList(loginId));
    }
  }

  onAction(transferId: string, action: string) {
    this.transferService.updateAction(transferId, action);
  }
}
