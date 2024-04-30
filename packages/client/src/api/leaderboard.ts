import {
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
  LeaderboardTeamRequestResult,
} from '@/helpers/types/leaderboard';
import { BaseApi } from '@/api/base';
import { DefaultResult } from '@/helpers/types';

export class LeaderboardApi extends BaseApi {
  addUser(params: LeaderboardNewLeaderRequest) {
    return this.post<DefaultResult>('/leaderboard', params);
  }

  getTeamLeaderboard(params: LeaderboardRequest) {
    return this.post<LeaderboardTeamRequestResult>('/leaderboard/all', params);
  }
}
