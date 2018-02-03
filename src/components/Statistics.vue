<template>
  <div class="statistics" v-if="data.length!=0">
    <ul class="tab-header">
      <li :class="current=='pt' ? 'active' : ''" @click="tabNav('pt','得分')">得分</li>
      <li :class="current=='rb' ? 'active' : ''" @click="tabNav('rb','篮板')">篮板</li>
      <li :class="current=='at' ? 'active' : ''" @click="tabNav('at','助攻')">助攻</li>
      <li :class="current=='st' ? 'active' : ''" @click="tabNav('st','抢断')">抢断</li>
      <li :class="current=='bk' ? 'active' : ''" @click="tabNav('bk','盖帽')">盖帽</li>
      <li :class="current=='to' ? 'active' : ''" @click="tabNav('to','失误')">失误</li>
      <li :class="current=='tp' ? 'active' : ''" @click="tabNav('tp','三分')">三分</li>
      <li :class="current=='fo' ? 'active' : ''" @click="tabNav('fo','犯规')">犯规</li>
      <li :class="current=='ftp' ? 'active' : ''" @click="tabNav('ftp','罚球')">罚球</li>
      <li :class="current=='sht' ? 'active' : ''" @click="tabNav('sht','神投')">神投</li>
    </ul>
    <table class="stats-table" cellpadding="0" cellspacing="0">
      <thead>
      <tr>
        <th>球员</th>
        <th>场均{{name}}</th>
        <th>总{{name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in stats.record" @click="linkPlayerDetail(item.playerid)">
         <td>{{index + 1}}.{{item.playername}}</td>
         <td>{{item.avgdata}}</td>
         <td>{{item.totaldata}}</td>
      </tr>
      </tbody>
    </table>
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
                current: "pt",
                name: "得分",
                data: [],
                stats: []
            }
        },
        created() {
            this.player_top()
        },
        methods: {
            tabNav: function(current, name) {
                this.current = current
                this.stats = this.data[current]
            },
            player_top: function() {
                Indicator.open('加载中...');
                api.player_top()
                    .then(function(res) {
                        console.log(res)
                        this.data = res.data;
                        this.stats = res.data.pt
                        console.log(this.stats)
                        Indicator.close();
                    }.bind(this)).catch(function(error) {
                        console.log(error)
                    })
            },
          //link to player_detail
          linkPlayerDetail:function (id) {
            this.$router.push({path: '/player_detail', query: {id: id}});
          }

        }
    }
</script>
<style>
    ul.tab-header {
        width: 100%;
        padding: 10px 0;
        float: left;
    }

    .tab-header li {
        width: 20%;
        float: left;
        text-align: center;
        font-size: 14px;
        line-height: 24px;
    }

    li.active {
        color: #00aa98;
    }

    .stats-table {
        text-align: center;
        width: 100%;
    }

    .stats-table th {
        background: #f5f5f5;
        font-size: 14px;
        line-height: 30px;
        font-weight: 400;
        width: 33.33%;
    }

    .stats-table tr td {
        font-size: 14px;
        line-height: 32px;
    }


    .stats-table tr a td{
      width:33.33%;
    }
    .stats-table th:first-child,
    .stats-table tbody td:first-child {
        text-align: left;
        box-sizing: border-box;
        padding-left: 20px;
        overflow: hidden
    }

    .stats-table tr:nth-child(even) {
        background: #f5f5f5;
    }
</style>
