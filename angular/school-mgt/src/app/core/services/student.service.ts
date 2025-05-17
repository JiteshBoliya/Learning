import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student.model';
import { LocalStorageService } from './local-storage.service';
import { SchoolService } from './school.service';
import { Observable, of } from 'rxjs';

@Injectable({
      providedIn: 'root'
})
export class StudentService {
      private demoStudentData = signal<Student[]>([
            { studentId: "ST1", name: "Aarav Sharma", schoolId: "SC1", transferStatus: false },
            { studentId: "ST2", name: "Ishita Mehta", schoolId: "SC2", transferStatus: false },
            { studentId: "ST3", name: "Rohan Verma", schoolId: "SC1", transferStatus: false },
      ]);
      constructor(
            private localStorageService: LocalStorageService,
            private schoolService: SchoolService
      ) { }

      getStudentList(): Observable<any> {
            const loginId = this.localStorageService.getItem('loginId');
            const schoolData = this.schoolService.getSchoolByLoginId(loginId ? loginId : '');
            const resultData = this.demoStudentData().filter((st) => st.schoolId === schoolData?.schoolId);
            return of(resultData);
      }

      async getStudent(studentId: string) {
            try {
                  const result = this.demoStudentData().find((s) => s.studentId === studentId);
                  if (!result) return null;

                  const currentSchool = await this.schoolService.getSchoolBySchoolId(result.schoolId);

                  const studentDetails = {
                        name: result.name,
                        currentSchool: currentSchool?.name,
                        // div: result.div,
                  }
                  return studentDetails;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      addStudent(studentData: any): Observable<any> {
            try {
                  // Get data
                  const { name } = studentData;
                  // Generate student id
                  const studentId = 'ST' + (this.demoStudentData().length + 1);
                  // Get the login id
                  const loginId = this.localStorageService.getItem('loginId');
                  // Get school data by loginId
                  const schoolData = this.schoolService.getSchoolByLoginId(loginId ? loginId : '');
                  if (!schoolData) return of(null);
                  // Store the student data
                  const resultData = { studentId, name, schoolId: schoolData.schoolId, transferStatus: false };
                  this.demoStudentData().push(resultData);

                  return of(resultData);
            } catch (error) {
                  console.error({ error });
                  return of(null);
            }
      }

      transferStudent(schoolId: string, studentId: string) {
            try {
                  this.demoStudentData.set(this.demoStudentData().map((st) => {
                        if (st.studentId === studentId) {
                              st.schoolId = schoolId,
                                    st.transferStatus = false
                        }
                        return st;
                  }))

                  return studentId;
            } catch (error) {
                  console.error({ error });
                  return null;
            }

      }

      updateStudentTransferStatus(schoolId: string, studentId: string): Observable<any> {
            try {
                  const result = this.demoStudentData()
                        .filter((st) => st.schoolId === schoolId)
                        .map((st) => {
                              if (st.studentId === studentId) {
                                    return { ...st, transferStatus: true, };
                              }
                              return st;
                        });
                  this.demoStudentData.set(result);
                  return of(this.demoStudentData());
            } catch (error) {
                  console.error({ error });
                  return of(null);
            }
      }
}