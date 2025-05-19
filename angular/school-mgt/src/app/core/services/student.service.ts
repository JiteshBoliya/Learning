import { Injectable, signal } from '@angular/core';
import { SchoolService } from './school.service';
import { studentData } from '../data/demoData';
import { Student } from '../models/data.model';
@Injectable({
      providedIn: 'root'
})
export class StudentService {
      private studentList = signal<Student[]>(studentData);
      constructor(private schoolService: SchoolService) { }

      getStudentList() {
            try {
                  const loginId = localStorage.getItem('loginId');
                  if (loginId) {
                        const schoolData = this.schoolService.getSchoolByLoginId(loginId);
                        if (schoolData)
                              return this.studentList().filter((st) => st.schoolId === schoolData?.schoolId);
                  }
                  return [];
            } catch (error) {
                  console.error({ error });
                  return [];
            }
      }

      getStudent(studentId: string) {
            try {
                  const result = this.studentList().find((s) => s.studentId === studentId);
                  if (result) {
                        const currentSchool = this.schoolService.getSchoolBySchoolId(result.schoolId);
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
                  const studentId = 'ST' + (this.studentList().length + 1);
                  const loginId = localStorage.getItem('loginId');

                  if (loginId) {
                        const schoolData = this.schoolService.getSchoolByLoginId(loginId);
                        if (schoolData) {
                              const newData = { studentId, name, schoolId: schoolData.schoolId, transferStatus: false };
                              this.studentList.update(values => {
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
                  this.studentList.set(this.studentList().map((st) => {
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

      updateStudentTransferStatus(schoolId: string, studentId: string) {
            try {
                  this.studentList.set(this.studentList()
                        .map((st) => {
                              if (st.studentId === studentId) {
                                    return { ...st, transferStatus: true, };
                              }
                              return st;
                        }));

                  return this.studentList().filter((st) => st.schoolId === schoolId);
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }
}