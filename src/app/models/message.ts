export class Message {
    id:number;
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phoneNumber?: number;
    message?: string;
    createdAt?: Date;
    isAccept?: boolean;
    isArchive?: boolean;

    constructor() {
      this.id = 0;
      this.firstname = '';
      this.lastname = '';
      this.company = '';
      this.email = '';
      this.phoneNumber = 1;
      this.message= '';
      this.createdAt = new Date();
      this.isAccept=false;
      this.isArchive=false;
  }
}






