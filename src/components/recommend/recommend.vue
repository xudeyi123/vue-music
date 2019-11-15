<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper" style="{height:'150px'}">
                    <slider>
                        <div v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl" />
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="(item,index) in discList" class="item" :key="index" @click="selectItem(item)">
                            <div class="icon">
                                <img v-lazy="item.imgurl" alt width="100%" />
                            </div>
                            <div class="text">
                                <h2 class="name">{{item.creator.name}}</h2>
                                <p class="desc">{{item.dissname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="loading-container" v-show="!discList.length">
                    <loading></loading>
                </div>
            </div>
        </scroll>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { getRecommend, getDiscList } from "../../api/recommend";
import { ERR_OK, SUCCESS_OK } from "../../api/config";
import Slider from "../../base/slider/slider";
import Scroll from "../../base/scroll/scroll";
import Loading from "../../base/loading/loading";
import {playlistMixin} from '../../common/js/mixin';
import {mapMutations} from 'vuex'

export default {
    mixins:[playlistMixin],
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
        Slider,
        Scroll,
        Loading
    },
    methods: {
        selectItem(disc){
            this.$router.push({
                path:`recommend/${disc.dissid}`
            })
            this.setDisc(disc)
        },
        handlePlaylist(playList){
            const bottom = playList.length>0 ? "60" : ""
            this.$refs.recommend.style.bottom = bottom  + 'px'
            this.$refs.scroll.refresh()
        },
        _getRecommend() {
            getRecommend().then(res => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            });
        },
        _getDiscList() {
            getDiscList().then(res => {
                if (res.status === SUCCESS_OK) {
                    this.discList = res.data.data.list;
                }
            });
        },
        loadImage() {
            if (!this.checkloaded) {
                this.checkloaded = true;
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                }, 20);
            }
        },
        ...mapMutations({
        setDisc: 'SET_DISC'
      })
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
    .recommend-content {
        height: 100%;
        overflow: hidden;
        .slider-wrapper {
            position: relative;
            height: 150px;
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
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%)
        }
    }
}
</style>