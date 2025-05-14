import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolComponent } from '../add-school/add-school.component';

@Component({
  selector: 'app-school-list',
  standalone: false,
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.scss'
})
export class SchoolListComponent {
  constructor(private dialog: MatDialog) { }
  schools: { id: string, name: string, address: string, contactNo: number, email: string, username: string }[] = [
    {
      id: 'SCH001',
      name: 'Green Valley High School',
      address: '123 Elm Street, Springfield',
      contactNo: 9876543210,
      email: 'contact@greenvalley.edu',
      username: 'gvhs_admin'
    },
    {
      id: 'SCH002',
      name: 'Sunrise Public School',
      address: '456 Oak Avenue, Riverdale',
      contactNo: 9123456780,
      email: 'info@sunrisepublic.edu',
      username: 'sunrise_admin'
    },
    {
      id: 'SCH003',
      name: 'Bluebird International',
      address: '789 Maple Lane, Hilltown',
      contactNo: 9988776655,
      email: 'admin@bluebirdintl.com',
      username: 'bluebird_admin'
    },
    {
      id: 'SCH004',
      name: 'Harmony Academy',
      address: '321 Pine Street, Meadowbrook',
      contactNo: 8877665544,
      email: 'office@harmonyacademy.org',
      username: 'harmony_admin'
    },
    {
      id: 'SCH005',
      name: 'Riverbank High',
      address: '135 Cedar Road, Lakeside',
      contactNo: 9123987654,
      email: 'admin@riverbankhigh.edu',
      username: 'riverbank_admin'
    },
    {
      id: 'SCH006',
      name: 'Oakridge School',
      address: '246 Birch Avenue, Greenfield',
      contactNo: 9001122334,
      email: 'contact@oakridge.edu',
      username: 'oakridge_admin'
    },
    {
      id: 'SCH007',
      name: 'Starlight Academy',
      address: '369 Ash Boulevard, Sunnyvale',
      contactNo: 9334455667,
      email: 'support@starlightacademy.net',
      username: 'starlight_admin'
    },
    {
      id: 'SCH008',
      name: 'Mountain View High',
      address: '482 Spruce Drive, Crestview',
      contactNo: 9345678912,
      email: 'info@mviewhigh.com',
      username: 'mview_admin'
    },
    {
      id: 'SCH009',
      name: 'Evergreen International School',
      address: '579 Redwood Road, Timberlake',
      contactNo: 9556677889,
      email: 'admin@evergreenintl.edu',
      username: 'evergreen_admin'
    },
    {
      id: 'SCH010',
      name: 'Meadow Hill School',
      address: '654 Fir Street, Windmere',
      contactNo: 9445566778,
      email: 'contact@meadowhill.org',
      username: 'meadowhill_admin'
    }
  ];

  openAddSchoolDialog() {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      width: '1000px'
    });
  }
}
