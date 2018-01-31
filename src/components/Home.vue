<template>
  <div class="home">

    <ul class="game-list" v-if="list.length != 0">
      <li class="game-item" v-for="  list in list.data.list">
        <div class="team left">
          <img :src="list.visitteamlogo" class="left">
          <div class="team-info right">
            <p class="team-score">{{list.visitscore}}</p>
            <p class="team-name">{{list.visitteamname}}</p>
          </div>

        </div>
        <div class="time left">
          {{list.match_status || list.time}}{{list.match_time}}
        </div>
        <div class="team right">

          <div class="team-info left">
            <p class="team-score">{{list.homescore}}</p>
            <p class="team-name ">{{list.hometeamname}}</p>
          </div>
          <img :src="list.hometeamlogo" class="right">
        </div>
        <div class="team-news" v-if="list.title">
          <i class="iangle">战报</i> {{list.title}}
        </div>
      </li>
    </ul>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Indicator} from 'mint-ui';
  import api from '../utils/api'
  import tabBar from './tabBar'

  export default {
    name: 'Home',
    components: {
      tabBar
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.nab_schedule();
      Indicator.open('加载中...');
    },
    methods: {
      nab_schedule: function () {
        api.nab_schedule()
          .then(function (res) {
            console.log(res)
            this.list = res.data;
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })

      }
    }
  }
</script>


<style scoped="scoped">
  .game-item {
    width: 100%;
    min-height: 60px;
    height: auto;
    border-bottom: 1px solid #e3e3e3;
    padding: 15px 0;
    overflow: hidden;
  }

  .team, .time {
    width: 33%;
  }

  .team img {
    width: 60px;
    height: 60px;
    display: block;
  }

  .team-score, .team-name {
    line-height: 30px;
  }

  .team-score {
    font-size: 20px;
  }

  .time {
    text-align: center;
    height: 60px;
  }

  .team-news {
    width: 100%;
    float: left;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 15px;
    height: 20px;
    overflow: hidden;
    text-align: left;
  }

  .iangle {
    padding: 1px 5px;
    background: #167dc6;
    color: #FFF;
    font-size: 12px;
    font-style: normal;

  }
</style>
