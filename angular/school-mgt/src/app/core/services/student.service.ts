import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
      providedIn: 'root'
})
export class StudentService {
      private demoStudentData: Student[] = [];
      constructor(private localStorageService: LocalStorageService) { }

      getStudentList() {
            return this.demoStudentData;
      }

      addStudent(studentData: any) {
            try {
                  const { name, div } = studentData;
                  const id = 'ss' + this.demoStudentData.length + 1;
                  const schoolId = this.localStorageService.getItem('id');
                  if (!schoolId) return null;
                  this.demoStudentData.push({ id, name, div, schoolId });
                  return schoolId;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }
}