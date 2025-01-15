
import { RecentlyItem} from "../models/recentlyItem";

export class recentlyItemRepository {
  private recentlies: RecentlyItem[];

  constructor() {
      this.recentlies = [ ];
  }
  getRecentlies(): RecentlyItem[] {
    return this.recentlies;
  }
}
