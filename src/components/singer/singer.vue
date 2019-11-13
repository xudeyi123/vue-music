<template>
    <div class="singer" ref="singer">
        <list-view :data="singerList" @select ="selectSinger"></list-view>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
    
</template>

<script>
import { ERR_OK } from "../../api/config";
import { getSingerList } from "../../api/singer";
import Singer from "../../common/js/singer";
import ListView from "../../base/listview/listview";
import { mapMutations } from 'vuex'

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
    data() {
        return {
            singerList: []
        };
    },
    created() {
        this._getSingerList();
    },
    methods: {
        _getSingerList() {
            getSingerList().then(res => {
                if (res.code === ERR_OK) {
                    this.singerList = this._normalizeSinger(res.data.list);
                }
            });
        },
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            };
            list.forEach((ele, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(
                        new Singer({
                            id: ele.Fsinger_mid,
                            name: ele.Fsinger_name
                        })
                    );
                }

                const key = ele.Findex;

                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    };
                }

                map[key].items.push(
                    new Singer({
                        id: ele.Fsinger_mid,
                        name: ele.Fsinger_name
                    })
                );
            });

            let hot = [];
            let ret = [];
            for (let key in map) {
                const val = map[key];
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val);
                } else if (val.title === HOT_NAME) {
                    hot.push(val);
                }
            }

            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            });

            return hot.concat(ret);
        },
        selectSinger(singer) {
            this.$router.push({
                path:`singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        ...mapMutations({
            setSinger : 'SET_SINGER'
        })
    },
    components: {
        ListView
    }
};
</script>

<style lang="less" scoped>
.singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
</style>