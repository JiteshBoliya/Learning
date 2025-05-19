import { Component, OnInit, signal } from '@angular/core';
import { TransferService } from '../../../../core/services/transfer.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent implements OnInit {
  transferRequestList = signal<any[]>([])
  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
    const loginId = localStorage.getItem('loginId');
    if (loginId) {
      const result = this.transferService.getTransferRequestList(loginId);
      if (result)
        this.transferRequestList.set(result);
    }
  }
}
