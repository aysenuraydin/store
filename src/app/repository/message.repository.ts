import { Message } from "../models/message";

export class MessageRepository {
  private contact: Message[];

  constructor() {
    this.contact = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        company: 'Tech Solutions',
        email: 'john.doe@example.com',
        phoneNumber: 123456789,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac urna nisi. Aenean sed neque nec odio efficitur tincidunt.',
        createdAt: new Date(),
        isArchive: false,
        isAccept: true
      },
      {
        id: 2,
        firstname: 'Jane',
        lastname: 'Smith',
        company: 'Design Studio',
        email: 'jane.smith@example.com',
        phoneNumber: 987654321,
        message: 'Curabitur ullamcorper quam vitae mi pharetra, non aliquam nulla luctus. Integer vestibulum velit non nisl posuere, a ullamcorper turpis maximus.',
        createdAt: new Date(),
        isArchive: true,
        isAccept: true
      },
      {
        id: 3,
        firstname: 'Michael',
        lastname: 'Johnson',
        company: 'MediCorp',
        email: 'michael.johnson@example.com',
        phoneNumber: 123123123,
        message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer malesuada sapien a augue tincidunt, vel tristique metus efficitur.',
        createdAt: new Date(),
        isArchive: true,
        isAccept: false
      },
      {
        id: 4,
        firstname: 'Emily',
        lastname: 'Davis',
        company: 'Creative Agency',
        email: 'emily.davis@example.com',
        phoneNumber: 456789012,
        message: 'Aenean ut elit in lorem pharetra scelerisque. Sed suscipit eros non nisl hendrerit, a vehicula elit auctor. Nulla facilisi.',
        createdAt: new Date(),
        isArchive: false,
        isAccept: true
      },
      {
        id: 5,
        firstname: 'Chris',
        lastname: 'Lee',
        company: 'Innovative Tech',
        email: 'chris.lee@example.com',
        phoneNumber: 654321987,
        message: 'Vivamus at diam auctor, ultricies nisl at, aliquam purus. Etiam bibendum magna id fermentum volutpat. Quisque ut enim ex.',
        createdAt: new Date(),
        isArchive: false,
        isAccept: false
      },
      {
        id: 6,
        firstname: 'Sarah',
        lastname: 'Wilson',
        company: 'Green Solutions',
        email: 'sarah.wilson@example.com',
        phoneNumber: 789456123,
        message: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean ac justo at purus feugiat tincidunt.',
        createdAt: new Date(),
        isArchive: false,
        isAccept: true
      }
    ];
  }

  getContacts(): Message[] {
    return this.contact;
  }
}
