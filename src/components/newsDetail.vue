<template>
  <div class="newsDetail">

    <div class="content-wrap" v-if="data.length!=0">
      <h3 class="title">{{data.title}}</h3>
      <p class="ptime">{{data.ptime}}</p>
      <div class="content" v-html="data.body"></div>
    </div>

    <!--评论区-->
    <div class="comments-wrap" v-if="comments.length !=0">
      <h3>评论</h3>
      <ul>
        <li class="comment-item" v-for="item in comments">
          <div class="avatar">
            <img :src="item.user.avatar" alt="">
          </div>
          <div class="left comment-info">
            <h4>{{item.user.nickname || "匿名网友"}}</h4>
            <p class="comment-time">{{item.createTime}}</p>
            <p class="p-contents" v-html="item.content"></p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {InfiniteScroll} from 'mint-ui';

  Vue.use(InfiniteScroll);
  import {
    Indicator
  } from 'mint-ui';
  import api from '../utils/api'

  export default {
    name: 'news',
    data() {
      return {
        data: [],
        comments: [],
        loading: true
      }
    },
    activated() {
      this.data = []
      this.comments = []
      this.news_info();

    },
    methods: {
      news_info: function () {
        Indicator.open('加载中...');
        api.news_info({docid: this.$route.query.docid})
          .then(function (res) {
            console.log(res)

            if (res.data && res.data.img.length != 0) {
              for (let i in res.data.img) {
                var replaceStr = "<img width='100%'  src=" + (res.data.img[i])['src'] + ">";
                res.data.body = res.data.body.replace("<!--IMG#" + i + "-->", replaceStr);
              }
            }
            this.data = res.data;
            this.news_comments()//获取文章评论
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      },
      news_comments: function () {
        api.news_comments({docid: this.$route.query.docid})
          .then(function (res) {
            console.log(res)
            this.comments = res.data;
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped="scoped">
  .newsDetail {
    box-sizing: border-box;
  }

  .content-wrap {
    padding: 10px 15px;
  }

  .ptime {
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #e3e3e3;
    padding: 5px 0;
  }

  .newsDetail .title {
    font-size: 16px;
  }

  .content {
    font-size: 14px;
    margin-top: 10px;
    text-align: justify;
    width: 100%;
  }

  .content img {
    width: 100%;
    max-width: 375px;
  }

  .comment-item {
    box-sizing: border-box;
    padding: 10px 15px;
    border-top: 1px solid #e3e3e3;
    float: left;
    width:100%;
    overflow: hidden;
  }

  .comment-item .avatar {
    width: 40px;
    position: absolute;
  }

  .comment-item img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .comment-item .comment-info {
    margin-left: 40px;
    overflow: hidden;

  }

  .comments-wrap {
    margin-top: 20px;
    border-top: 5px solid #f5f5f5;
  }

  .comments-wrap h3 {

    line-height: 20px;
    font-size: 14px;
    box-sizing: border-box;
    border-left: 3px solid #00aa98;
    margin: 10px 0 10px 10px;
    padding-left: 5px;
  }

  .comment-item h4 {
    color: #00aa98;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding-right:30px;
    box-sizing: border-box;
    display: block;
    width:200px;
  }

  .comment-item p.comment-time {
    color: #666;
    font-size: 12px;
    padding: 3px 0;
  }

  .comment-item p.p-contents {
    color: #333;
    font-size: 12px;
  }
</style>
