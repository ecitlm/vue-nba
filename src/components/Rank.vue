<template>
  <div class="rank" v-if="data.length!=0">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">东部排名</mt-tab-item>
      <mt-tab-item id="2">西部排名</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <table class="" cellpadding="0" cellspacing="0">
          <thead class="thead">
          <tr>
            <td>球队</td>
            <td>胜场</td>
            <td>负场</td>
            <td>胜率</td>
            <td>场均差</td>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr v-for="(item,index) in data.east">
            <td><i class="left">{{index+1}}</i> {{item.name}}</td>
            <td>{{item.wins}}</td>
            <td>{{item.losses}}</td>
            <td>{{item['wining-percentage']}}%</td>
            <td>{{item['games-back'] }}</td>
          </tr>
          </tbody>
        </table>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <table class="" cellpadding="0" cellspacing="0">
          <thead class="thead">
          <tr>
            <td>球队</td>
            <td>胜场</td>
            <td>负场</td>
            <td>胜率</td>
            <td>场均差</td>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr v-for="(item,index) in data.west">
            <td><i class="left">{{index+1}}</i> {{item.name}}</td>
            <td>{{item.wins}}</td>
            <td>{{item.losses}}</td>
            <td>{{item['wining-percentage']}}%</td>
            <td>{{item['games-back'] }}</td>
          </tr>
          </tbody>
        </table>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>


<script>
  import Vue from 'vue'
  import {Navbar, TabItem} from 'mint-ui';
  import api from '../utils/api'
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  import {Indicator} from 'mint-ui';
  export default {
    data() {
      return {
        selected: "1",
        data:[]
      }
    },
    created() {

      this.team_rank();
    },
    methods:{
      team_rank:function () {
        Indicator.open('加载中...');
        api.team_rank()
          .then(function (res) {
            console.log(res)
            this.data=res.data;
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })

      }

    }
  }
</script>


<style scoped>
  .mint-navbar .mint-tab-item.is-selected {
    color: #00aa98;
    border-bottom: 0;
  }

  table {
    width: 100%;
    text-align: center;
    font-size:12px;
  }

  .thead {
    background: #f5f5f5;
  }

  .thead tr td {
    width: 20%;
    text-align: center;
    border-collapse: collapse;
    line-height: 40px
  }
  .tbody tr{
    border-bottom:1px solid #e3e3e3;
    line-height:30px;

  }

  .tbody tr:nth-child(even) {
    background: #f5f5f5;
  }
  .tbody i{
    margin-left:5px;
  }
</style>
