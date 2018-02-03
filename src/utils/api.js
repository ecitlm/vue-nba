import fetch from './api.config.js'
export default {
  http(url,params){
    return fetch.fetchPost(url, params);
  },
  nab_schedule(params) {
    return fetch.fetchPost('Nba.schedule', params);
  },
  new_list(params){
    return fetch.fetchPost('Nba.New_list', params);
  },
  news_info(params){
    return fetch.fetchPost('Nba.News_info', params);
  },
  news_comments(params){
    return fetch.fetchPost('Nba.news_comments', params);
  }
  ,
  team_rank(params){
    return fetch.fetchPost('Nba.team_rank', params);
  },
  player_top(params){
    return fetch.fetchPost('Nba.player_top', params);
  },
  player_detail(params){
    return fetch.fetchPost('Nba.player_detail', params);
  },

}
