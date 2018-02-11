<template>
  <div class="teamInfo" v-if="item.length!=0">
    <div class="team-header" :style="{ background:'#'+item.color}">
      <div class="item">
        <p>{{item.cnalias}}</p>
        <p>历史总冠军{{item.historychampion}}次</p>

      </div>
      <div class="item">
        <img :src="item.icon" alt="">

      </div>
      <div class="item">
        <p>{{item.wins}}胜{{item.losses}}负</p>
        <span>{{item.conference}}排名第{{item.conferenceseed}}</span>
      </div>
    </div>
    <div id="tabitem">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">数据</mt-tab-item>
        <mt-tab-item id="2">赛程</mt-tab-item>
        <mt-tab-item id="3">阵容</mt-tab-item>
      </mt-navbar>
    </div>

    <div class="tab-container">
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul class="lincoapp-teamHonor">
            <li>
              <i class="rank icon"></i>
              <p> {{item.division}}第{{item.divisionseed}}</p>

            </li>
            <li>
              <i class="no1 icon"></i>
              <p> 夺冠{{item.historychampion}}次</p>

            </li>
            <li>
              <i class="master icon"></i>
              <p> {{item.coach}}</p>
            </li>
          </ul>

          <table class="lincoapp-nba-table1 skin-statsTech">
            <thead class ="thead">
            <tr>
              <td>本赛季</td>
              <td>得分</td>
              <td>篮板</td>
              <td>助攻</td>
              <td>命中率</td>
            </tr>
            </thead>
            <tbody class="tbody">
            <tr>
              <td>
                主场
              </td>
              <td>{{item.homePoints}}</td>
              <td>{{item.homeRebounds}}</td>
              <td>{{item.homeAssists}}</td>
              <td>{{item.homeFgMade}}%</td>
            </tr>
            <tr>
              <td>
                客场
              </td>
              <td>{{item.awayPoints}}</td>
              <td>{{item.awayRebounds}}</td>
              <td>{{item.awayAssists}}</td>
              <td>{{item.awayFgMade}}%</td>
            </tr>
            </tbody>
          </table>
          <div class="data-rank">
          <h3><span class="left">场均得分 {{item.pointsPG}}</span> <span class="right">联盟排名 {{item.pointsConference}}</span></h3>
          <router-link v-for="list in item.pointsarr" :to="{ path: 'player_detail', query: { playerid: list.playerid }}" >
            <span class="left">{{list.playername}}</span>
            <span class="right">{{list.data}}</span>
          </router-link>
        </div>

          <div class="data-rank">
            <h3><span class="left">场均篮板 {{item.reboundsPG}}</span> <span class="right">联盟排名 {{item.reboundsConference}}</span></h3>
            <router-link v-for="list in item.reboundsarr" :to="{ path: 'player_detail', query: { playerid: list.playerid }}" >
              <span class="left">{{list.playername}}</span>
              <span class="right">{{list.data}}</span>
            </router-link>
          </div>

          <div class="data-rank">
            <h3><span class="left">场均助攻 {{item.assistsPG}}</span> <span class="right">联盟排名 {{item.assistsConference}}</span></h3>
            <router-link v-for="list in item.assistsarr" :to="{ path: 'player_detail', query: { playerid: list.playerid }}" >
              <span class="left">{{list.playername}}</span>
              <span class="right">{{list.data}}</span>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Navbar,
    TabItem
  } from 'mint-ui';
  import api from '../utils/api'

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  import {
    Indicator
  } from 'mint-ui';

  export default {
    data() {
      return {
        selected: "1",
        item: []
      }
    },
    activated() {
      this.item = []
      this.team_info();
    },
    methods: {
      team_info() {
        Indicator.open('加载中...');
        api.team_info({
          teamId: this.$route.query.teamId
        })
          .then(function (res) {
            console.log(res)
            this.item = res.data;
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .team-header {
    width: 100%;
    height: 150px;
    background: darkred;
    display: flex;
    box-sizing: border-box;
    padding: 30px 0;
    align-items: center;
    justify-content: center;
  }

  .team-header .item {
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 14px;

  }

  .team-header .item img {
    height: 60px;
  }

  .lincoapp-teamHonor {
    display: flex;
    border-top: 1px solid #DCDDE1;
    border-bottom: 1px solid #DCDDE1;
    width: 100%;
    float: left;

  }

  .lincoapp-teamHonor li {
    flex: 1;
    text-align: center;
    padding: 15px 0;
    background: #F4F4F7;
    font-size: 14px;
  }

  .lincoapp-teamHonor li .rank {
    background: url(https://coding.it919.cn/static/images/ranks.png) center no-repeat
  }

  .lincoapp-teamHonor li .no1 {
    background: url(https://coding.it919.cn/static/images/no1.png) center no-repeat
  }

  .lincoapp-teamHonor li .master {
    background: url(https://coding.it919.cn/static/images/master.png) center no-repeat
  }

  .lincoapp-teamHonor li .icon {
    padding: 15px;
    background-size: 25px
  }

  .lincoapp-teamHonor li p {
    padding-top: 10px;
  }
  .lincoapp-nba-table1{
    width:100%;
    text-align: center;
    margin-top:15px;
    float: left;
    border-top:1px solid #e3e3e3;
  }
  thead.thead {
    background: #f4f4f4;
    font-size:16px;
    line-height:40px;
    border-top:1px solid #e3e3e3;
    border-bottom:1px solid #e3e3e3;
  }
  tbody tr{
    line-height:30px;
    border-bottom: 1px solid #e3e3e3;
    font-size:14px;
  }
  .data-rank{

    float: left;
    width:100%;
    margin-top:15px;
    border-top:1px solid #e3e3e3;
    border-bottom:1px solid #e3e3e3;
  }
  .data-rank h3{
    background: #f4f4f4;
    font-size:16px;
    padding:0 15px;
    line-height:40px;
    font-weight:400;
    display: block;
    box-sizing: border-box;
    height:40px;
  }
  .data-rank a{
    border-top:1px solid #e3e3e3;
    display: block;
    width:100%;
    height:36px;
    box-sizing: border-box;
    padding: 0 15px;
    font-size:16px;
    line-height:36px;
  }
</style>
