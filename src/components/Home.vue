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
                {{list.match_status || list.time}} <br>{{list.match_time}}
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
          <div class="refesh-btn" @click="nab_schedule">
          </div>

        </div>
      </template>

<script>
    import Vue from 'vue'
    import {
        Indicator
    } from 'mint-ui';
    import api from '../utils/api'


    export default {
        name: 'Home',

        data() {
            return {
                list: []
            }
        },
        created() {
            this.nab_schedule();
        },
        methods: {
            nab_schedule() {
              Indicator.open('加载中...');
                api.nab_schedule()
                    .then(function(res) {
                        console.log(res)
                        this.list = res.data;
                        Indicator.close();
                    }.bind(this)).catch(function(error) {
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
        overflow: hidden;
        box-sizing: border-box;
        padding: 15px 10px
    }


    .time {
        width: 28%;
    }

    .team {
      width: 36%;
    }

    .time {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .team img {
        width: 65px;
        height: 65px;
        display: block;
    }

    .team-score,
    .team-name {
        line-height: 30px;
        font-size: 13px;
    }

    .team-score {
        font-size: 20px;
    }

    .time {
        text-align: center;
        height: 65px;
    }

    .team-news {
        width: 100%;
        float: left;
        font-size: 14px;
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

    .refesh-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 170, 152, 0.6) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFJUlEQVR4Xu2bjdEURRCGuyNQIxAiECIQI1AiECMQIlAjECIQIhAiECIQIxAiECJo66F6qL65mZ2Z3dn74O6m6oqv2J2ffvu/p1flwodeOP1yBeAqARkCZvZARP4Qkdci8p2qvtsKkpl9KyJ3/HdLRL70v+PS7MOeb/z3UlVfbd27Nf9IBczsPz8gc39T1V9bi5Sem9n3IvKDiADolvFcRPi9mMGM/CAlACy8NASAmcHZn0XkYQBxC/G5hDwWkWeqipRMGVMAGCD8vYs5h3+ZUZDUAhX5eoE6VAUgnsyQiM0AmNk9EflzgePPnNjXqoqON4eZAQLrokKoUmkAxE+qinqsHqsBcK7/4uKeH+Ctc+npVi75PgCBLSpJxmNVfbQWgVUA+KH+KlhyRPyhqj5de6Clee6hSkCs9ljDAJgZ7gw3yb9xPIFLWzneAs7BBwSMbW4kcdtdapYmDgHgxMN5DFYacP3BVl1sEZ4/d9uD/n8RnmEXhkDoBsCR/1tEMFBp/IOhmumWRoBwYwkI34R5uMi7vZI4AgDER7GH+Hu9G40QNvKuMwaXGkHA49ztWacLADPD70ad+ySITwRWQCBOICBbHE0A3Iej91Hn79yU2NeocfuEJESbgD3IA66DJVoAYNkJRKLe3z+1wWtxMUgC8QJBWRpvVPX20vwWAFjVaPG7xKr3wHu8V1DXxXymBUA8I+7u1k0bvRZobg/wBEkVYOLt2rlHAHikqhjDT36EmkY6a1UKRgBYVReYlbWNom5mSEHKHaq2YASA0TOk97t98toNSvPMDBf4e3hWNN4lANCZ6Eq2nuu9qkZDunW9rvkeJf4bXqaQclSdKgGQaoJdGzVe2jU7bB3QzIgBqEcyimpw1mXxghqQIxxki+cOALkLOUwaVJAOahVnDQBUm9likfcSAIgVauzAZUlAy1CevQRcAWggcJWAloic+/OrBOQc9lQyZVHvVJWq0NmOUi5A2suV14ehqmctJT3J0FH8fE7iUAKAAmhMIz+bStAaxhTFO6umvFJVrqpPPszsQB0nHKAvGTIz4uUfw4YUFad1ZfQSkiUyvdOW3sOofxVfqEkAHI+XIUOtMjNO6plcLGhMWTY36lULn6nBYml5yskKi4TmiHgx07Nd6lU6encEgLw0diNS0ENtIZap2o4RAECx+4JhzUH3mFMohh5s0w2A62BeWn6uqvf3OPisNc2Mu0HuCNOgX+ljb9EQAA4CRcR4937kSmYdfus6hSIo1/g0UFQj22aY660o0SMMt6FsJaxnvl+PxwIo02iSQBrWA+BSkBsVQCBEPnlsUAKj0rv0wWjnwdSwCqQNs0sG/hvVQB2GurJ6uDnyToX4j7dAMwHAK+S9ODeqDhXiD9p3pgHgqlADgYRpl+bImjSYGT1L+XX9Ue/SVAAWQOAR1haV2Px9wZIKuJ/n1je6OqYUG7emAxBAgON5I/PUTu4IROhIL/UpvPBmzSPwdwEgGMZayJmA2Nzb73pOZkpoXrpmX6xX7AqASwMXkEhDDJYi8/ASqEfXJzDOadZK7fJ5T3JaG5GnRXfRC+0OQJAGOIRRajVXpG+CkiuFqynbK31LlJsEQluasruM7skACLZhqbd/xMXn78Jxvg3oIrympqsDodGTu+4iFQCy9AnM0tJwG/Xhw4tVAVcmAW9V9aC20MwFRgmvhKrpExj+RaeTMeNvDGYMqQm2+NFctdmluk1BatibjzkOWmdPAsAMEPda4wrAXsh+LutevAT8DxBRUl9F8t37AAAAAElFTkSuQmCC") center no-repeat;
      background-size: 25px;
      border-radius: 50%;
      position: fixed;
      right: 10px;
      bottom: 70px;
      font-size: 14px;
      color: #fff;
      -webkit-transition: 0.4s;
      -webkit-transition: -webkit-transform 0.4s ease-out;
      transition: transform 0.4s ease-out;
      -moz-transition: -moz-transform 0.4s ease-out;
    }

    .refesh-btn:active {
      transform: rotateZ(720deg);
      -webkit-transform: rotateZ(720deg);
      -moz-transform: rotateZ(720deg);
    }

</style>
