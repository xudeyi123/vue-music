<template>
    <div class="recommend">
        <div class="recommend-content">
            <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="item in recommends" :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" />
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li v-for="item in discList" class="item" :key="item.creator.qq">
                        <div class="icon">
                            <img :src="item.imgurl" alt  width="100%"/>
                        </div>
                        <div class="text">
                            <p class="name">{{item.creator.name}}</p>
                            <p class="desc">{{item.dissname}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getRecommend, getDiscList } from "../../api/recommend";
import { ERR_OK, SUCCESS_OK } from "../../api/config";
import Slider from "../../base/slider/slider";

export default {
    data() {
        return {
            recommends: [],
            discList: []
        };
    },
    created() {
        this._getRecommend();
        this._getDiscList();
    },
    components: {
        Slider
    },
    methods: {
        _getRecommend() {
            getRecommend().then(res => {
                if (ERR_OK === res.code) {
                    this.recommends = res.data.slider;
                }
            });
        },
        _getDiscList() {
            getDiscList().then(res => {
                // console.warn(res);
                if (SUCCESS_OK === res.status) {
                    this.discList = res.data.data.list;
                    console.warn(this.discList);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable.less";

.recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}

.recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .recommend-list {
        .list-title {
            height: 65px;
            line-height: 65px;
            text-align: center;
            font-size: @font-size-medium;
            color: @color-theme;
        }
        .item {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            padding: 0 20px 20px 20px;
            .icon {
                flex: 0 0 60px;
                width: 60px;
                padding-right: 20px;
            }

            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                font-size: @font-size-medium;
                .name {
                    margin-bottom: 10px;
                    color: @color-text;
                }

                .desc {
                    color: @color-text-d;
                }
            }
        }
    }
}
</style>