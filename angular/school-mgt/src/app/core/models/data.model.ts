export type Auth = {
      loginId?: string,
      username: string,
      password: string,
      role?: string
};

export type School = {
      schoolId: string,
      name: string,
      address: string,
      contactNo: number,
      email: string,
      loginId: string,
};

export type Student = {
      studentId: string,
      name: string
      schoolId: string,
      transferStatus: boolean
};

export type TransferRequest = {

}