import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../../core/services/transfer.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-incoming-request-list',
  standalone: false,
  templateUrl: 'incoming-request-list.component.html',
  styleUrl: './incoming-request-list.component.scss'
})

export class IncomingRequestListComponent implements OnInit {
  demoIncomingRequest: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    const loginId = this.localStorageService.getItem('loginId');
    this.demoIncomingRequest = this.transferService.inboxList(loginId ? loginId : '');
  }


  onAction(transferId: string, action: string) {
    this.transferService.updateAction(transferId, action);
  }
}
