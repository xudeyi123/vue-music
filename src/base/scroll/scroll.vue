<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        },
        refreshDelay: {
            type: Number,
            default: 200
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }

            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX
            });

            if (this.listenScroll) {
                let me = this;
                this.scroll.on("scroll", pos => {
                    me.$emit("scroll", pos);
                });
            }
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll &&
                this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    }
};
</script>

<style lang="less" scoped>
</style>