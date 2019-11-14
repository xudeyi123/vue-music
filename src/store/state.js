import { playMode } from '../common/js/config'
const state = {
    singer: {},//歌手
    playing: false,//是否播放
    fullScreen: false,//是否显示全屏
    playList: [],//播放列表
    sequenceList: [],//顺序列表
    mode: playMode.sequence,//播放类型 播放顺序 0:顺序播放 1:循环播放 2:随机播放
    currentIndex: -1,//播放索引
}

export default state