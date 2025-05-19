import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { schoolData } from '../models/demoData';
import { type School } from '../models/data.model';

@Injectable({
      providedIn: 'root'
})
export class SchoolService {
      private schoolList = signal<School[]>(schoolData);
      constructor(private authService: AuthService) { }

      addSchool(schoolData: any) {
            try {
                  const { name, address, contactNo, email, username, password } = schoolData;
                  const schoolId = 'SC' + (this.schoolList().length + 1);
                  const result = this.authService.register({ username, password }, 'school');
                  if (result) {
                        const newData = { schoolId, name, address, contactNo, email, loginId: result.loginId };
                        this.schoolList.update(values => {
                              return [...values, newData];
                        });
                        return newData;
                  }
                  return null;

            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      getSchoolList() {
            return this.schoolList();
      }

      getSchoolByLoginId(loginId: string) {
            return this.schoolList().find((ss) => ss.loginId === loginId);
      }

      getSchoolBySchoolId(schoolId: string) {
            return this.schoolList().find((ss) => ss.schoolId === schoolId);
      }

      getSchoolListForTransfer(data: any) {
            return this.schoolList().filter((s) => s.schoolId !== data.schoolId);
      }

} 