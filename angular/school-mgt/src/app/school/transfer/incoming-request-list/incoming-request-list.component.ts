import { Component } from '@angular/core';

@Component({
  selector: 'app-incoming-request-list',
  standalone: false,
  templateUrl: 'incoming-request-list.component.html',
  styleUrl: './incoming-request-list.component.scss'
})

export class IncomingRequestListComponent {
  incomingTransferRequest = [
    {
      "id": 1,
      "date": "2025-05-12",
      "studentName": "Emma Wilson",
      "schoolName": "Oakridge Elementary"
    },
    {
      "id": 2,
      "date": "2025-05-10",
      "studentName": "Noah Martinez",
      "schoolName": "Westlake High School"
    },
    {
      "id": 3,
      "date": "2025-05-14",
      "studentName": "Olivia Johnson",
      "schoolName": "Riverside Academy"
    },
    {
      "id": 4,
      "date": "2025-05-08",
      "studentName": "Liam Thompson",
      "schoolName": "Pinecrest Middle School"
    },
    {
      "id": 5,
      "date": "2025-05-13",
      "studentName": "Sophia Garcia",
      "schoolName": "Lakeview Elementary"
    },
    {
      "id": 6,
      "date": "2025-05-09",
      "studentName": "Jackson Brown",
      "schoolName": "Maplewood High School"
    },
    {
      "id": 7,
      "date": "2025-05-11",
      "studentName": "Ava Williams",
      "schoolName": "Crestview Academy"
    },
    {
      "id": 8,
      "date": "2025-05-07",
      "studentName": "Lucas Davis",
      "schoolName": "Sunnydale Elementary"
    },
    {
      "id": 9,
      "date": "2025-05-15",
      "studentName": "Mia Rodriguez",
      "schoolName": "Brookside Middle School"
    },
    {
      "id": 10,
      "date": "2025-05-06",
      "studentName": "Ethan Miller",
      "schoolName": "Hillcrest High School"
    }
  ]
}
