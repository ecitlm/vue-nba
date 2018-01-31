import fetch from './api.config.js'
export default {
  /**
   * 新闻轮播图
   * @param {object} params
   * @returns
   */
  nab_schedule(params) {
    return fetch.fetchPost('Nba.schedule', params || {});
  },
}
