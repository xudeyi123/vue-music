<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
import MusicList from "../music-list/music-list";
import { getSingerDetail } from "../../api/singer";
import { ERR_OK } from "../../api/config";
import {
    createSong,
    processSongsUrl,
    isValidMusic
} from "../../common/js/song";
export default {
    data() {
        return {
            songs: []
        };
    },
    computed: {
        title() {
            return this.singer.name;
        },
        bgImage() {
            return this.singer.avatar;
        },
        ...mapGetters(["singer"])
    },
    components: {
        MusicList
    },
    created() {
        this._getDetail();
    },
    methods: {
        _getDetail() {
            if (!this.singer.id) {
                this.$router.push("/singer");
            }
            getSingerDetail(this.singer.id).then(res => {
                if (res.code === ERR_OK) {
                    processSongsUrl(this._normalizeSongs(res.data.list)).then(
                        songs => {
                            this.songs = songs;
                        }
                    );
                }
            });
        },
        _normalizeSongs(list) {
            let ret = [];
            list.forEach(item => {
                const { musicData } = item;
                if (isValidMusic(musicData)) {
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        }
    }
};
</script>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>