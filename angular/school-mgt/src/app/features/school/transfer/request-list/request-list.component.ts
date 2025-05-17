import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../../core/services/transfer.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent implements OnInit {
  requestData: any[] = []

  constructor(
    private localStorageService: LocalStorageService,
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    const loginId = this.localStorageService.getItem('loginId');
    this.requestData = this.transferService.getTransferRequestList(loginId ? loginId : '');
  }
}
