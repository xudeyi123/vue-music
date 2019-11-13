<template>
    <scroll
        class="listview"
        :data="data"
        ref="listview"
        @scroll="scroll"
        :listenScroll="listenScroll"
        :probeType="probeType"
    >
        <ul>
            <li class="list-group" v-for="(group,index) in data" :key="index" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" :key="item.id" class="list-group-item">
                        <img v-lazy="item.avatar" alt class="avatar" />
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div
            class="list-shortcut"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
        >
            <ul>
                <li
                    class="item"
                    v-for="(item,index) in shortcutList"
                    :key="index"
                    :data-index="index"
                    :class="{'current':currentIndex===index}"
                >{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script>
import Scroll from "../../base/scroll/scroll";
import { getData } from "../../common/js/dom";
import Loading from "../loading/loading";

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
    data() {
        return {
            currentIndex: 0,
            scrollY: -1,
            diff: -1
        };
    },
    props: {
        data: Array,
        default: []
    },
    components: {
        Scroll,
        Loading
    },
    computed: {
        shortcutList() {
            return this.data.map(item => {
                return item.title.substr(0, 1);
            });
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return;
            }

            return this.data[this.currentIndex]
                ? this.data[this.currentIndex].title
                : "";
        }
    },
    created() {
        this.touch = {};
        this.listHeight = [],
        this.probeType = 3,
        this.listenScroll = true;
    },
    methods: {
        onShortcutTouchStart(e) {
            let anchorIndex = getData(e.target, "index");
            let firstTouch = e.touches[0];
            this.touch.y1 = firstTouch.pageY;
            this.touch.anchorIndex = anchorIndex;
            this._scrollTo(this.touch.anchorIndex);
        },
        onShortcutTouchMove(e) {
            let firstTouch = e.touches[0];
            this.touch.y2 = firstTouch.pageY;
            const offset =
                ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
            const anchorIndex = +this.touch.anchorIndex + offset;
            this._scrollTo(anchorIndex);
        },
        _calculateHeight() {
            let height = 0;
            let list = this.$refs.listGroup;
            this.listHeight.push(height);
            for (let i = 0; i < list.length; i++) {
                const itemHeight = list[i].clientHeight;
                height += itemHeight;
                this.listHeight.push(height);
            }
        },
        scroll(pos) {
            this.scrollY = pos.y;
            // console.log(pos.y)
        },
        _scrollTo(index) {
            if (!index && index !== 0) {
                return;
            }
            if (index < 0) {
                index = 0;
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2;
            }
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
            this.scrollY = this.$refs.listview.scroll.y;
        },
        selectItem(item){
            this.$emit("select",item)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight();
            }, 20);
        },
        scrollY(newY) {
            const listHeight = this.listHeight;

            if (newY > 0) {
                this.currentIndex = 0;
                this.$refs.fixed.style.display ='none'
                return;
            }
            this.$refs.fixed.style.display =''
            for (let i = 0; i < listHeight.length - 1; i++) {
                let height1 = listHeight[i];
                let height2 = listHeight[i + 1];
                if (-newY >= height1 && -newY < height2) {
                    this.currentIndex = i;
                    this.diff = height2 + newY
                    return;
                }
            }

            this.currentIndex = listHeight.length - 2;
        },
        diff(newDiff) {
            let fixedTop = (newDiff > 0 && newDiff < TITLE_HEIGHT) ? newDiff - TITLE_HEIGHT : 0
            if(this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable.less";
.listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
    .list-group {
        padding-bottom: 30px;
        .list-group-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: @font-size-small;
            color: @color-text-l;
            background: @color-highlight-background;
        }
        .list-group-item {
            display: flex;
            // flex-direction: column;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name {
                margin-left: 20px;
                color: @color-text-l;
                font-size: @font-size-medium;
            }
        }
    }
    .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: @color-background-d;
        font-family: Helvetica;
        .item {
            padding: 3px;
            line-height: 1;
            color: @color-text-l;
            font-size: @font-size-small;
            &.current {
                color: @color-theme;
            }
        }
    }
    .list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: @font-size-small;
            color: @color-text-l;
            background: @color-highlight-background;
        }
    }
    .loading-container {
        position: absolute;
        top: 50%;
        width: 100%;
        transform:translateY(-50%);
    }
}
</style>