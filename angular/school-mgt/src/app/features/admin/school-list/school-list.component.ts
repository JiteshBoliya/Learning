import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { SchoolService } from '../../../core/services/school.service';
import { School } from '../../../core/models/data.model';

@Component({
  selector: 'app-school-list',
  standalone: false,
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.scss'
})
export class SchoolListComponent implements OnInit {
  schools: School[] = []
  constructor(private dialog: MatDialog, private schoolService: SchoolService) { }
  ngOnInit(): void {
    this.schools = this.schoolService.getSchoolList();
  }
  openAddSchoolDialog() {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      width: '1000px'
    });
  }
}
