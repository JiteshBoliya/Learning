import { Component } from '@angular/core';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent {
  requestData = [
    {
      "id": 1,
      "date": "2025-05-10",
      "studentName": "John Smith",
      "studentDiv": "A",
      "transferToSchool": "Lincoln High School",
      "status": "Approved"
    },
    {
      "id": 2,
      "date": "2025-05-08",
      "studentName": "Emily Johnson",
      "studentDiv": "B",
      "transferToSchool": "Washington Academy",
      "status": "Pending"
    },
    {
      "id": 3,
      "date": "2025-05-05",
      "studentName": "Michael Brown",
      "studentDiv": "C",
      "transferToSchool": "Jefferson Public School",
      "status": "Approved"
    },
    {
      "id": 4,
      "date": "2025-05-12",
      "studentName": "Sophia Williams",
      "studentDiv": "A",
      "transferToSchool": "Roosevelt High",
      "status": "Rejected"
    },
    {
      "id": 5,
      "date": "2025-05-07",
      "studentName": "David Miller",
      "studentDiv": "D",
      "transferToSchool": "Kennedy School of Arts",
      "status": "Pending"
    },
    {
      "id": 6,
      "date": "2025-05-03",
      "studentName": "Olivia Davis",
      "studentDiv": "B",
      "transferToSchool": "Adams Elementary",
      "status": "Approved"
    },
    {
      "id": 7,
      "date": "2025-05-14",
      "studentName": "James Wilson",
      "studentDiv": "C",
      "transferToSchool": "Madison High School",
      "status": "Pending"
    },
    {
      "id": 8,
      "date": "2025-05-02",
      "studentName": "Emma Taylor",
      "studentDiv": "A",
      "transferToSchool": "Monroe International School",
      "status": "Approved"
    },
    {
      "id": 9,
      "date": "2025-05-09",
      "studentName": "Alexander Martinez",
      "studentDiv": "D",
      "transferToSchool": "Grant Technical Institute",
      "status": "Rejected"
    },
    {
      "id": 10,
      "date": "2025-05-11",
      "studentName": "Isabella Anderson",
      "studentDiv": "B",
      "transferToSchool": "Franklin Community School",
      "status": "Approved"
    }
  ]
}
