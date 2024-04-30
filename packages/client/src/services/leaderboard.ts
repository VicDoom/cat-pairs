import {
  LeaderboardRequest,
  LeaderboardUserData,
} from '@/helpers/types/leaderboard';
import { LeaderboardApi } from '@/api';
import { SCORE_CAT_CODERS } from '@/helpers/constants/api';

export class LeaderboardService {
  constructor(public readonly api: LeaderboardApi = new LeaderboardApi()) {}

  addUser(props: LeaderboardUserData) {
    return this.api.addUser({
      data: props,
      ratingFieldName: SCORE_CAT_CODERS,
    });
  }

  getTeamLeaderboard(props: LeaderboardRequest) {
    return this.api.getTeamLeaderboard(props);
  }
}
