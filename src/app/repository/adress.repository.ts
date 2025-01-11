
import { AdressItem } from "../models/adressItem";

export class AdressRepository {
  private adresses: AdressItem[];

  constructor() {
      this.adresses = [
        {   id:1, userId:1, title:"title1", fullname:"fullname1",   phone:1111111, city:"city1", district:"district1", neighborhood:"neighborhood1", address:"address1", isActive:true,
        },
        {   id:2, userId:1, title:"title2", fullname:"fullname2",   phone:2222222, city:"city2", district:"district2", neighborhood:"neighborhood2", address:"address2", isActive:false,
        },
        {   id:3, userId:1, title:"title3", fullname:"fullname3",   phone:3333333, city:"city3", district:"district3", neighborhood:"neighborhood3", address:"address3", isActive:false,
        }
      ];
  }
  getAdresses(): AdressItem[] {
    return this.adresses;
  }
}

