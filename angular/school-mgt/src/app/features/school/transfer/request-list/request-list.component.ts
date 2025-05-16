import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../../core/services/transfer.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent implements OnInit {
  requestData: any[] = []

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
    this.requestData = this.transferService.getTransferRequestList();
  }

}
