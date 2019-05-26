<template>
    <div>
        <div class="main_title">
            <div class="title">
                <span class="icon_log"></span>
            </div>
        </div>
        <div class="mod-ct_title">
            <div class="mod-ct">
                <div class="realname hide">先截屏,再打开微信扫一扫,从相册选择图片支付</div>
                <div class="amount">¥{{data.amount}}</div>
                <div class="realname1 hide">切勿修改金额 切勿重复支付</div>
                <vue-qr :text="downloadData.url"
                        :margin="0"
                        dot-scale=1
                        :logoSrc="downloadData.icon + '?cache'"
                        :logoScale="downloadData.iconSize"></vue-qr>
                <div class="payText">{{data.time}} </div>
                <div class="realname2 hide">[切勿重复支付 到账后删除图片 重复支付无法上分]</div>
                <div class="time-item">
                    <h1 class="order_h1">订单:{{ordercode}}</h1>
                    <strong class="hour_show">{{hour}}时</strong>
                    <strong class="minute_show">{{minute}}分</strong>
                    <strong class="second_show">{{second}}秒</strong>
                </div>
                <div class="tip">
                    <div class="icon-scan"></div>
                    <div class="tip_text">
                        <p class="showtext">打开微信 [扫一扫]</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import vueQr from 'vue-qr'
import { timestampToTime } from '@/api/utils'

import { qrcode_order_get } from '@/api/request/request'

export default {
    components: {
        vueQr
    },
    data() {
        return {
            downloadData: {
                url: '1',
                icon: require('../../assets/logo.png'),
                iconSize : 0.1
            },
            hour:0,
            minute:0,
            second:0,
            data:{},
            ordercode:'0',
            text:''
        }
    },
    methods:{
        countTime: function () {
            //获取当前时间
            var now = Date.parse(new Date());
            //设置截止时间
            // var endDate = new Date("2019-05-16 17:59:23.0");
            var end = this.data.expire_time * 1000
            // alert(end,now,end-now)
            //时间差
            var leftTime = end - now
            //定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                this.hour = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                this.minute = Math.floor(leftTime / 1000 / 60 % 60);
                this.second = Math.floor(leftTime / 1000 % 60);
            }
            if(this.hour === 0 && this.minute === 0 && this.second === 0 ) {
                this.downloadData.icon = require('../../assets/guoqi.png')
                this.downloadData.iconSize = 0.9
                return
            }
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 1000);
        },
    },
    mounted() {
        // console.log(this.$route.params.id)
        if ( !this.$route.params.id ) {
            this.$router.push({"path":404})
        }
        this.ordercode = this.$route.params.id
        qrcode_order_get({
            data : {"ordercode":this.$route.params.id},
            callback : (res) => {
                this.data = res.data.data
                // console.log("this.data:",this.data)
                this.data.time = timestampToTime(this.data.expire_time).toString() + '过期，过期后请勿支付！'
                this.downloadData.url  = this.data.url

                this.countTime()
            },
            errorcallback : () => {
                this.data.time = "已过期，请勿支付"
                this.data.expire_time = 0
                this.countTime()
            }
        })
        // console.log(this.$route.query.data)
    }
}

</script>

<style scoped lang="less">
    .main_title{
        width:98%;
        padding: .1rem;
        .title{
            height: 1.8rem;
            line-height: 1.8rem;
            text-align: center;
            background: #fff;
            .icon_log {
                background : url('../../assets/logo_weixin.jpg') no-repeat;
                background-size: cover;
                display: inline-block;
                width: 3.5rem;
                height: 1rem;
                vertical-align: middle;
            }
        }
    }
    .mod-ct_title{
        width:98%;
        padding: .1rem;
        .mod-ct{
            margin: 0 auto;
            margin-top: .2.7rem;
            background: #fff url('../../assets/wave.png') top center repeat-x;
            text-align: center;
            color: #333;
            border: .02rem solid #e5e5e5;
            border-top: none;
            min-height: 10rem;
            .amount{
                font-size: 1rem;
                display: block;
                text-align: center;
            }
            .realname{
                padding-top: .8rem;
                margin: .2rem 0;
                color: red;
                font-size: .4rem;
                display: block;
            }
            .realname1{
                margin: .2rem 0;
                color: red;
                font-size: .4rem;
                display: block;
            }
            .realname2{
                margin: .2rem 0;
                color: red;
                font-size: .4rem;
                display: block;
            }
            .payText{
                font-size: .35rem;
                padding: .1rem 0rem .1rem 0rem;
                color: #b0831c;
                display: block;
            }
            .time-item{
                font-size: .25rem;
                padding: .1rem 0rem .1rem 0rem;
                display: block;
                .order_h1 {
                    margin:.1rem;
                }
                .hour_show{
                    background: #3ec742;
                    color: #fff;
                    line-height: 25px;
                    font-size: 15px;
                    font-family: Arial;
                    padding: 0 10px;
                    margin-right: 10px;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                }
                .minute_show{
                    background: #3ec742;
                    color: #fff;
                    line-height: 25px;
                    font-size: 15px;
                    font-family: Arial;
                    padding: 0 10px;
                    margin-right: 10px;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                }
                .second_show{
                    background: #3ec742;
                    color: #fff;
                    line-height: 25px;
                    font-size: 15px;
                    font-family: Arial;
                    padding: 0 10px;
                    margin-right: 10px;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                }
            }
            .tip{
                margin-top: 20px;
                border-top: 1px dashed #e5e5e5;
                padding: 10px 0;
                position: relative;
                .icon-scan{
                    display: inline-block;
                    width: 56px;
                    height: 55px;
                    background: url('../../assets/wechat-pay.png') 0 0 no-repeat;
                    vertical-align: middle;
                }
                .tip_text{
                    display: inline-block;
                    vertical-align: middle;
                    text-align: left;
                    margin-left: 23px;
                    font-size: 16px;
                    line-height: 28px;
                    .showtext{
                        margin: 0;
                        padding: 0px 2px;
                    }
                }

            }
        }
    }

</style>