import { Injectable } from '@angular/core';


@Injectable({
      providedIn: 'root'
})
export class TransferService {
      private demoTransferRequestData: any[] = [];
      constructor() { }

      getTransferRequestList() {
            return this.demoTransferRequestData;
      }
}



//     "id": 1,
//     "date": "2025-05-10",
//     "studentName": "John Smith",
//     "studentDiv": "A",
//     "transferToSchool": "Lincoln High School",
//     "status": "Approved"
