import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { School } from '../models/school.model';

@Injectable({
      providedIn: 'root'
})
export class SchoolService {
      private demoSchoolData: School[] = [];
      constructor(private authService: AuthService) { }

      getSchoolList() {
            return this.demoSchoolData;
      }

      addSchool(schoolData: any) {
            try {
                  const { name, address, contactNo, email, username, password } = schoolData;
                  const id = 's' + this.demoSchoolData.length + 1;
                  const result = this.authService.register({ username, password }, 'school');
                  if (!result) return null;
                  this.demoSchoolData.push({ id, name, address, contactNo, email, loginId: result.id });
                  return
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

} 