import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { School } from '../models/school.model';
import { Observable, of } from 'rxjs';

@Injectable({
      providedIn: 'root'
})
export class SchoolService {
      private demoSchoolData = signal<School[]>([
            {
                  schoolId: 'SC1',
                  name: 'Green Valley High School',
                  address: '123 Elm Street, Springfield',
                  contactNo: 9876543210,
                  email: 'contact@greenvalley.edu',
                  loginId: 'l2'
            },
            {
                  schoolId: 'SC2',
                  name: 'Sunrise Public School',
                  address: '456 Oak Avenue, Riverdale',
                  contactNo: 9123456780,
                  email: 'info@sunrisepublic.edu',
                  loginId: 'l3'
            },
            {
                  schoolId: 'SC3',
                  name: 'Bluebird International',
                  address: '789 Maple Lane, Hilltown',
                  contactNo: 9988776655,
                  email: 'admin@bluebirdintl.com',
                  loginId: 'l4'
            },
      ]);
      constructor(private authService: AuthService) { }

      addSchool(schoolData: any): Observable<any> {
            try {
                  const { name, address, contactNo, email, username, password } = schoolData;
                  const schoolId = 'SC' + (this.demoSchoolData.length + 1);
                  const result = this.authService.register({ username, password }, 'school');
                  if (!result) return of(null);
                  const newData = { schoolId, name, address, contactNo, email, loginId: result.loginId };
                  this.demoSchoolData.update(values => {
                        return [...values, newData];
                  });
                  return of(newData);
            } catch (error) {
                  console.error({ error });
                  return of(null);
            }
      }

      getSchoolList() {
            return this.demoSchoolData();
      }

      getSchoolByLoginId(loginId: string) {
            return this.demoSchoolData().find((ss) => ss.loginId === loginId);
      }

      getSchoolBySchoolId(schoolId: string) {
            return this.demoSchoolData().find((ss) => ss.schoolId === schoolId);
      }

      getSchoolListForTransfer(data: any) {
            return this.demoSchoolData().filter((s) => s.schoolId !== data.schoolId);
      }

} 