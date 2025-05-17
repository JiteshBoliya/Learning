import { Injectable } from '@angular/core';
import { SchoolService } from './school.service';
import { StudentService } from './student.service';


@Injectable({
      providedIn: 'root'
})
export class TransferService {
      private demoTransferRequestData: any[] = [];
      constructor(
            private schoolService: SchoolService,
            private studentService: StudentService
      ) { }

      getTransferRequestList(loginId: string) {
            const schoolData = this.schoolService.getSchoolByLoginId(loginId);
            const updateTransferData = this.demoTransferRequestData
                  .filter((tr) => schoolData?.schoolId === tr.currentSchoolId)
                  .map((tr) => {
                        const transferSchool = this.schoolService.getSchoolBySchoolId(tr.transferSchoolId);
                        return {
                              transferSchool: transferSchool?.name,
                              studentName: tr.name,
                              date: tr.date,
                              transferId: tr.transferId,
                              status: tr.status
                        };
                  });
            return updateTransferData;
      }

      addTransferRequest(transferData: any) {
            const transferId = 'TN' + (this.demoTransferRequestData.length + 1);
            this.demoTransferRequestData.push({ transferId, ...transferData, date: new Date(), status: "Pending" });
      }

      inboxList(loginId: string) {
            const schoolData = this.schoolService.getSchoolByLoginId(loginId);
            const inboxList = this.demoTransferRequestData
                  .filter((tr) => schoolData?.schoolId === tr.transferSchoolId)
                  .map((tr) => {
                        const currentSchool = this.schoolService.getSchoolBySchoolId(tr.currentSchoolId);
                        return {
                              fromSchool: currentSchool?.name,
                              studentName: tr.name,
                              date: tr.date,
                              transferId: tr.transferId,
                              status: tr.status
                        };
                  });
            return inboxList
      }

      updateAction(transferId: string, action: string) {
            this.demoTransferRequestData = this.demoTransferRequestData.map((tr) => {
                  if (transferId === tr.transferId) {
                        tr.status = action;
                        if (action === 'Approved') {
                              this.studentService.transferStudent(tr.transferSchoolId, tr.studentId);
                        }
                  }
                  return tr;
            });
      }

      getTransferLogs(studentId: string) {
            const updateTransferData = this.demoTransferRequestData
                  .filter((tr) => studentId === tr.studentId)
                  .map((tr) => {
                        const transferSchool = this.schoolService.getSchoolBySchoolId(tr.transferSchoolId);
                        const currentSchool = this.schoolService.getSchoolBySchoolId(tr.currentSchoolId);
                        return {
                              from: currentSchool?.name,
                              to: transferSchool?.name,
                              date: tr.date,
                        };
                  });
            return updateTransferData;
      }
};