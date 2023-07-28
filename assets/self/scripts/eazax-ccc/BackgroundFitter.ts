// import { GameEvent } from "./core/GameEvent";
import { Component, View, _decorator } from "cc";
import EventManager from "./EventManager";

const { ccclass, executionOrder } = _decorator;


@ccclass
@executionOrder(-99)
export default class BackgroundFitter extends Component {

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 生命周期：组件启用
     */
    protected onEnable() {
        this.adapt();
    }

    /**
     * 生命周期：销毁
     */
    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        EventManager.on('view-resize', this.adapt, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        EventManager.off('view-resize', this.adapt, this);
    }

    /**
     * 适配
     */
    protected adapt() {
        // 实际屏幕比例
        const winSize = new View().getVisibleSize();
        const screenRatio = winSize.height / winSize.width;
        // 设计比例
        const designResolution = new View().getDesignResolutionSize(),
            designRatio = designResolution.height / designResolution.width;
        // 缩放
        let scale = 1;
        if (screenRatio >= designRatio) {
            scale = winSize.height / designResolution.height;
        } else {
            scale = winSize.width / designResolution.width;
        }
        // this.node.scale = scale;
        this.node.setScale(scale, scale, scale);
    }

}
