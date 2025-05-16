import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { LocalStorageService } from './local-storage.service';
import { SchoolService } from './school.service';

@Injectable({
      providedIn: 'root'
})
export class StudentService {
      private demoStudentData: Student[] = [
            { studentId: "ST1", name: "Aarav Sharma", div: "A", schoolId: "SC1" },
            { studentId: "ST2", name: "Ishita Mehta", div: "B", schoolId: "SC2" },
            { studentId: "ST3", name: "Rohan Verma", div: "C", schoolId: "SC1" },
      ];
      constructor(
            private localStorageService: LocalStorageService,
            private schoolService: SchoolService,
      ) { }

      getStudentList() {
            const loginId = this.localStorageService.getItem('loginId');
            const schoolData = this.schoolService.getSchoolByLoginId(loginId ? loginId : '');
            return this.demoStudentData.filter((st) => st.schoolId === schoolData?.schoolId);
      }

      getStudent(studentId: string) {
            try {
                  const result = this.demoStudentData.find((s) => s.studentId === studentId);
                  if (!result) return null;
                  return result;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      addStudent(studentData: any) {
            try {
                  // Get data
                  const { name, div } = studentData;
                  // Generate student id
                  const studentId = 'ST' + (this.demoStudentData.length + 1);
                  // Get the login id
                  const loginId = this.localStorageService.getItem('loginId');
                  // Get school data by loginId
                  const schoolData = this.schoolService.getSchoolByLoginId(loginId ? loginId : '');
                  if (!schoolData) return null;
                  // Store the student data
                  this.demoStudentData.push({ studentId, name, div, schoolId: schoolData.schoolId });
                  console.log('+++++++++++', this.demoStudentData);

                  return studentId;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }
}