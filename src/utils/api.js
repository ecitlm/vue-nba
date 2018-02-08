import fetch from './api.config.js'

export default {
  http(params) {
    return fetch.fetchPost(params.url, params.params);
  },
  nab_schedule(params) {
    return fetch.fetchPost('Nba.schedule', params);
  },
  new_list(params) {
    return fetch.fetchPost('Nba.New_list', params);
  },
  news_info(params) {
    return fetch.fetchPost('Nba.News_info', params);
  },
  news_comments(params) {
    return fetch.fetchPost('Nba.news_comments', params);
  }
  ,
  team_rank(params) {
    return fetch.fetchPost('Nba.team_rank', params);
  },
  player_top(params) {
    return fetch.fetchPost('Nba.player_top', params);
  },
  player_detail(params) {
    return fetch.fetchPost('Nba.player_detail', params);
  },
  live_detail(params) {
    return fetch.fetchPost('Nba.live_detail', params);
  },
  live_content(params) {
    return fetch.fetchPost('Nba.live_content', params);
  },
  technical_statistics(params) {
    return fetch.fetchPost('Nba.technical_statistics', params);
  },

}
