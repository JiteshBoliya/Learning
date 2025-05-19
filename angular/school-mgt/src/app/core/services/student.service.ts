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

      getStudentList() {
            const loginId = this.localStorageService.getItem('loginId');
            if (loginId) {
                  const schoolData = this.schoolService.getSchoolByLoginId(loginId);
                  if (schoolData)
                        return this.demoStudentData().filter((st) => st.schoolId === schoolData?.schoolId);
            }
            return [];
      }

      async getStudent(studentId: string) {
            try {
                  const result = this.demoStudentData().find((s) => s.studentId === studentId);
                  if (result) {
                        const currentSchool = await this.schoolService.getSchoolBySchoolId(result.schoolId);
                        if (currentSchool) {
                              return { name: result.name, currentSchool: currentSchool?.name };
                        }
                  }
                  return null;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      addStudent(studentData: any) {
            try {
                  const { name } = studentData;
                  const studentId = 'ST' + (this.demoStudentData().length + 1);
                  const loginId = this.localStorageService.getItem('loginId');

                  if (loginId) {
                        const schoolData = this.schoolService.getSchoolByLoginId(loginId);
                        if (schoolData) {
                              const newData = { studentId, name, schoolId: schoolData.schoolId, transferStatus: false };
                              this.demoStudentData.update(values => {
                                    return [...values, newData];
                              });
                              return newData;
                        }
                  }
                  return null
            } catch (error) {
                  console.error({ error });
                  return null;
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