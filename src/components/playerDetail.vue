<template>
  <div class="player_detail" v-if="list.length!=0">
    <div class="player_header">
      <img :src="list.portrait" class="left">
      <h3>{{list.cnname}}</h3>
      <p>{{list.position}}({{list.number}}) / {{list.teamname}}</p>
    </div>
    <div class="player-stats">
      <div class="item">
        <strong>{{list.pointsPG}}</strong>
        <p>得分</p>
      </div>
      <div class="item">
        <strong>{{list.reboundsPG}}</strong>
        <p>篮板</p>
      </div>
      <div class="item">
        <strong>{{list.assistsPG}}</strong>
        <p>助攻</p>
      </div>
      <div class="item">
        <strong>{{list.stealsPG}}</strong>
        <p>抢断</p>
      </div>
    </div>
    <div class="palyer-info-data">
      <h3>信息</h3>
      <div class="item">
        <span>生日</span>
        <p>{{list.birthdate}}</p>
      </div>

      <div class="item">
        <span>出生地</span>
        <p>{{list.birthplace || "-"}}</p>
      </div>

      <div class="item">
        <span>薪资</span>
        <p>{{list.yearsalary || "-"}}</p>
      </div>
      <div class="item">
        <span>身高/体重</span>
        <p>{{list.height}}/{{list.weight}}</p>
      </div>
      <div class="item-glass">选秀: {{list.showing}}</div>
    </div>

    <div class="season-data">
      <h3>赛季数据</h3>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <p>{{list.games}}</p>
            出场数
          </td>
          <td>
            <p>{{list.gamesStarted}}</p>
            首发数
          </td>
          <td>
            <p>{{list.minutesPG}}</p>
            时间
          </td>
        </tr>
        <tr>
          <td>
            <p>{{(list.fgPCT * 100).toFixed(1)}}%</p>
            投篮
          </td>
          <td>
            <p> {{(list.threesPCT * 100).toFixed(1)}}%</p>
            三分
          </td>
          <td>
            <p> {{(list.ftPCT * 100).toFixed(1)}}%</p>
            罚球
          </td>
        </tr>
        <tr>
          <td>
            <p>{{list.offensiveReboundsPG}}</p>
            前篮板
          </td>
          <td>
            <p>{{list.defensiveReboundsPG}}</p>
            后篮板
          </td>
          <td>
            <p>{{list.stealsPG}}</p>
            抢断
          </td>
        </tr>
      </table>

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
        list: [],
      }
    },
    created() {
    },
    activated() {
      this.list = []
      this.player_detail()
    },
    methods: {
      player_detail: function () {
        Indicator.open('加载中...');
        api.player_detail({
          playerid: this.$route.query.playerid
        })
          .then(function (res) {
            console.log(res)
            this.list = res.data
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .player_header {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 15px;
    height: auto;
    overflow: hidden;
  }

  .player_header img {
    width: 110px;
    margin-right: 15px

  }

  .player_header h3 {
    line-height: 40px;
    font-size: 18px;
  }

  .player_header p {
    line-height: 30px;
    font-size: 12px;
  }

  .player-stats {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;

  }

  .player-stats .item {
    flex: 1;
    border-right: 1px solid #e3e3e3;
  }

  .player-stats .item strong {
    font-size: 20px;
    font-weight: 400;
  }

  .player-stats .item p {
    font-size: 14px;
    color: #666;
  }

  .player-stats .item:last-child {
    border-right: 0

  }

  .palyer-info-data h3, .season-data h3 {
    line-height: 36px;
    background: #EBECEF;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 16px;
  }

  .palyer-info-data .item {
    width: 50%;
    float: left;
    padding: 0 15px 5px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #e3e3e3;

  }

  .palyer-info-data .item span {
    color: #666;
    line-height: 28px;
    font-size: 14px;
  }

  .palyer-info-data .item-glass {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
  }

  .season-data table {
    width: 100%;
    text-align: center;
    border-top: 1px solid #e3e3e3;
  }

  .season-data table tr td {
    border-bottom: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    padding: 5px 0;
    width: 33.33%;
  }
</style>
