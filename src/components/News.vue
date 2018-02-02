<template>
  <div class="news">
    <ul class="news-list" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li v-for="item in list">
        <router-link :to="{ path: 'newsdetail', query: { docid: item.docid }}">
          <div class="left news-thumb">
            <img :src="item.imgsrc">
          </div>
          <div class="left news-info">
            <div class="news-title">{{item.title}}</div>
            <p>{{item.ptime}}   <i class="right">{{item.commentCount}}</i></p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
    import Vue from 'vue'
    import {
        InfiniteScroll
    } from 'mint-ui';

    Vue.use(InfiniteScroll);
    import {
        Indicator
    } from 'mint-ui';
    import api from '../utils/api'

    export default {
        name: 'news',
        data() {
            return {
                list: [],
                page: 1,
                loading: true
            }
        },
        created() {
            this.page = 1;
            this.list = [];
            this.new_list();
        },
        methods: {
            new_list: function() {
                Indicator.open('加载中...');
                api.new_list({
                        page: this.page
                    })
                    .then(function(res) {
                        this.list = (this.list).concat(res.data);
                        this.list.reverse()
                        this.page++;
                        Indicator.close();
                    }.bind(this)).catch(function(error) {
                        console.log(error)
                    })
            },
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    this.new_list()
                    this.loading = false;
                }, 2000);
            }
        }
    }
</script>


<style>
    .news-thumb {
        flex: 3;
    }
    
    .news-thumb img {
        width: 90px;
        height: 60px;
    }
    
    .news-list li {
        box-sizing: border-box;
        padding: 10px 15px;
        border-bottom: 1px solid #e3e3e3;
        height: auto;
        overflow: hidden;
        display: flex;
    }
    
    .news-list li a {
        display: block;
        display: flex;
    }
    
    .news-info {
        flex: 7;
        padding-left: 5px;
        box-sizing: border-box;
    }
    
    .news-title {
        width: 100%;
        font-size: 14px;
        height: 38px;
        overflow: hidden;
    }
    
    .news-info p {
        color: #666;
        font-size: 12px;
        margin-top: 5px;
    }
    
    .news-info i {
        font-style: normal;
        padding: 2px 20px 2px 10px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFKElEQVRoQ81a61XcOBSW5AISKlhSQTDS/5AKMlSwpIKFCgIVLKkgkwp2qCDDf+sYKshsBTspwL57Ph/JR7qWX5NhGP/hANbV/e77YSn28JRleVpV1Qcp5RkRneGnEOJtSJqInoQQGynlk5RyfX5+/riHq4XclYhj+pOU8loIcboLHSJaZVm2zPP8YZfzODMbABiv6/qLEOJq10sT5zZEdGuM+T6X5iwA1lowfjtyyTMRNaYSvAdzgllBU38MnN8opT7neb6eCmQSgLIsz6qq+uZsm9P+VwixUkqtplzsNHhBRAsp5aceRu+11jdTQIwCsNbCVP7mTimEAOO3WuvllItS75Rl+bau62siupZSvuFOn2XZxzzPt0P0BwE45r8xwr/guL/DOGcIQKqqWiY0ApO6zPM8NMfoeC+AFPNCiEel1GJMKrtqpCiKhRACQEJtbJVSeZ7nmxTdJIAeyX83xuwz8iRxwt/quoZZvvcvIIf0mVMHgCPwg9n8ndZ6LPrsKvjOOecbiEQhiLUx5iN/OQLgbPFHGG2I6CCS7/ELhOPQnDqCjABYayFlxHr/PGqtL/Ym2pmEnDWUwbGOP7QAXHz+GdjdryzLTl/KYadisdaiVEEYbx6UH8aYS/97C6AoCnj/nwHhz/sMlVMZTr1nrUUYbf1BKfXOR6UGAJc+kpTWeqcC7XcY7TtbluVFXdcILF4LrV82ALiahBBHI33PtLUWUemD/10pdQLz9gBg+17iRyX9AAByUFgVNEKWCfP5qrWG4xzdUxTF1odVInowxiwkz7pKKRRQk8vZQ6IsimIV1EtbrfUJANwLIf7yjGitRyvUQzId3sV9FTUSAITO8ay1RuNxlE8iGl0CwH++7vF2Nca9qxobrWVZdpcyuaIo8H9Ul1v3TlQSu3rnC4YA7h10YoO1vzsDfv1zBwAU/mGsaONSwFnuN4mwjBIAyadlkJsuKk5jTD4mPM7vbACJjI07oyKLx2zHVJRbGCPNK67u721eXM6KBD4bQKLgA90brTWCQfOwaOGZi6KbtRYNStTg++Q0pIWUBkJCo9Wns0NIyV/+rJS6CM3DDQHWPGaHjMGPpJT/zDHfPg2EUWgUAIi4vqEps40xq5TEHNCFUmrTl1dcEsU766G+19NPlNc3PIxutNbvxhzptf7PAwiCBwBETUxYqr4Wo333Jng9QS0UlarHWIkGwaEM2t2m6AQADJfa5DA1mR1aO31FZ1P38LB3jGaUMJ8mLHsAO4W0Q2nBWQl6Fr9zaHuWtvJkiaWT+g/FbOqeRPJsM38IIIpGvPt/LQDO9jFaaaRPRNG0hM+FovR+DM1NURQYtIWzqahs4ZM53v1PqhBfSjsJ0+n0K53uy1rbNvhQlzEmWta9FLOcbmrAnKpWuQaw/wqnc68yF+0Z7Uem4wFzH+BjvMu+Yu2lNJHaww0NmDmAaHh0yAbfrW2xh4uGyWPT8XC4O1hS+L1w0Od+3cf4xSUp9M/QPl+Oj5pwmAc6ky+l1FNd1xj4ojnvzEqJCBpbZln2MNaQc5Nz8R20O4y7d5M2z+mE0+lwaDTbxJH4/GcEUspnDgjNCBG9ISK/Yu0b36DDu5rS4IDJUAPteGU293s4gJAtpcTatu2tp5D143XeE0RnQRzLbHykgYU2tu5VVV2xfcKU+1LvYN+8VErdzzXDVgPOQfEVSbiPGt3A+54WZjGwde9jevJ2f0gyYRTCehOOjOUyPhtI7mWHiLlpxGnPJwmocJtPbnah3Xfv/yUXSzP3Ibl2AAAAAElFTkSuQmCC") center right 3px no-repeat;
        background-size: 14px;
        text-align: right;
        display: block;
    }
</style>