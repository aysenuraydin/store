
import { AdressItem } from "../models/adressItem";

export class AdressRepository {
  private adresses: AdressItem[];

  constructor() {
    this.adresses = [
      {
        id: 1,
        userId: 1,
        title: "Home",
        fullname: "John Doe",
        phone: 1234567890,
        city: "New York",
        district: "Manhattan",
        neighborhood: "Upper East Side",
        address: "1234 Park Ave, Apt 56",
        email: "johndoe@example.com",
        createdAt: new Date("2023-01-01"),
      },
      {
        id: 2,
        userId: 2,
        title: "Office",
        fullname: "Jane Smith",
        phone: 9876543210,
        city: "Los Angeles",
        district: "Downtown",
        neighborhood: "Financial District",
        address: "5678 Sunset Blvd, Suite 100",
        email: "janesmith@example.com",
        createdAt: new Date("2023-02-15"),
      },
      {
        id: 3,
        userId: 3,
        title: "Vacation Home",
        fullname: "Alice Johnson",
        phone: 5556667777,
        city: "Miami",
        district: "South Beach",
        neighborhood: "Ocean Drive",
        address: "91011 Collins Ave, Unit 12",
        email: "alicejohnson@example.com",
        createdAt: new Date("2023-03-10"),
      },
    ];
  }
  getAdresses(): AdressItem[] {
    return this.adresses;
  }
}

