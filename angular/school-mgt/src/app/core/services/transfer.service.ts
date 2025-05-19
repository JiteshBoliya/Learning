import { Injectable, signal } from '@angular/core';
import { SchoolService } from './school.service';
import { StudentService } from './student.service';

@Injectable({
      providedIn: 'root'
})
export class TransferService {
      private transferRequestList = signal<any[]>([]);
      constructor(
            private schoolService: SchoolService,
            private studentService: StudentService
      ) { }

      getTransferRequestList(loginId: string) {
            try {
                  const schoolData = this.schoolService.getSchoolByLoginId(loginId);
                  const transferData = this.transferRequestList()
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
                  return transferData;
            } catch (error) {
                  console.error({ error });
                  return null;
            }

      }

      addTransferRequest(transferData: any) {
            try {
                  const transferId = 'TN' + (this.transferRequestList().length + 1);
                  const newData = { transferId, ...transferData, date: new Date(), status: "Pending" };
                  this.transferRequestList.update(values => {
                        return [...values, newData];
                  });
                  return this.studentService.updateStudentTransferStatus(transferData.currentSchoolId, transferData.studentId);
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      inboxList(loginId: string) {
            try {
                  const schoolData = this.schoolService.getSchoolByLoginId(loginId);
                  const inboxList = this.transferRequestList()
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
            } catch (error) {
                  console.error({ error });
                  return null;
            }

      }

      updateAction(transferId: string, action: string) {
            try {
                  this.transferRequestList.set(this.transferRequestList().map((tr) => {
                        if (transferId === tr.transferId) {
                              tr.status = action;
                              if (action === 'Approved') {
                                    this.studentService.transferStudent(tr.transferSchoolId, tr.studentId);
                              }
                        }
                        return tr;
                  }));
                  return transferId;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      getTransferLogs(studentId: string) {
            try {
                  const updateTransferData = this.transferRequestList()
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
            } catch (error) {
                  console.error({ error });
                  return null;
            }

      }
};