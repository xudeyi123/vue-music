<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span
                class="dot"
                :class="{active: currentPageIndex === index}"
                v-for="(item,index) in dots"
                :key="index"
            ></span>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass } from "../../common/js/dom";
export default {
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        };
    },
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this.initSlider();
            if (this.autoPlay) {
                this._play();
            }
        }, 20);

        window.addEventListener("resize", () => {
            if (!this.slider) {
                return;
            }
            this._setSliderWidth(true);
            this.slider.refresh();
        });
    },
    methods: {
        _setSliderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children;
            let width = 0;
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                addClass(child, "slider-item");
                child.style.width = sliderWidth + "px";
                width += sliderWidth;
            }
            if (this.loop && !isResize) {
                width += 2 * sliderWidth;
            }

            this.$refs.sliderGroup.style.width = width + "px";
        },
        _initDots() {
            this.dots = new Array(this.children.length);
        },
        initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollBy: false,
                momentum: false,
                snap: {
                    loop: this.loop, // 循环
                    threshold: 0.3,
                    speed: 400 // 轮播间隔
                }
            });

            this.slider.on("scrollEnd", () => {
                let pageIndex = this.slider.getCurrentPage().pageX;
                // if (this.loop) {
                //   pageIndex -= 1;
                // }

                this.currentPageIndex = pageIndex;

                if (this.autoPlay) {
                    clearTimeout(this.timer);
                    this._play();
                }
            });

            this.slider.on("beforeScrollStart", () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer);
                }
            });
        },
        _play() {
            // eslint-disable-next-line
            let pageIndex = this.currentPageIndex + 1;
            if (this.loop) {
                pageIndex += 1;
            }
            this.timer = setTimeout(() => {
                // this.slider.goToPage(pageIndex, 0, 400);
                this.slider.next();
            }, this.interval);
        }
    },
    destroyed() {
        clearTimeout(this.timer);
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable.less";

.slider {
    min-height: 1px;
    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
    }

    .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
    }

    a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
    }

    img {
        display: block;
        width: 100%;
    }

    .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
            &.active {
                width: 20px;
                border-radius: 5px;
                background: @color-text-ll;
            }
        }
    }
}
</style>