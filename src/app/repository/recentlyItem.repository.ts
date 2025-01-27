
import { RecentlyItem} from "../models/recentlyItem";

export class RecentlyItemRepository {
  private recentlies: RecentlyItem[];

  constructor() {
      this.recentlies = [ ];
  }
  getRecentlies(): RecentlyItem[] {
    return this.recentlies;
  }
}
