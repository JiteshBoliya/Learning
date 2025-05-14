import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent {

  students: { id: number, name: string, div: string }[] = [
    { id: 1, name: "Aarav Sharma", div: "A" },
    { id: 2, name: "Ishita Mehta", div: "B" },
    { id: 3, name: "Rohan Verma", div: "C" },
    { id: 4, name: "Sneha Patel", div: "A" },
    { id: 5, name: "Yash Malhotra", div: "B" },
    { id: 6, name: "Ananya Joshi", div: "C" },
    { id: 7, name: "Kunal Rao", div: "A" },
    { id: 8, name: "Tanya Desai", div: "B" },
    { id: 9, name: "Aditya Singh", div: "C" },
    { id: 10, name: "Priya Nair", div: "A" }
  ]
}
