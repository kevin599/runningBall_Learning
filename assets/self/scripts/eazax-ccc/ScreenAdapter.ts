

import { Component, ResolutionPolicy, View, _decorator, log, view } from "cc";
import EventManager from "./EventManager";

const { ccclass, executionOrder } = _decorator;


@ccclass
@executionOrder(-1)
export default class ScreenAdapter extends Component {

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.init();
    }

    /**
     * 生命周期：组件启用
     */
    protected onEnable() {
        this.adapt();
    }

    /**
     * 初始化
     */
    protected init() {
        // 设置游戏窗口变化的回调（仅 Web 平台有效）
        view.setResizeCallback(() => this.onResize());
    }

    /**
     * 窗口变化回调
     */
    protected onResize() {
        // 由于 setResizeCallback 只能设置一个回调
        // 使用事件系统发送一个特定事件，让其他组件也可以监听到窗口变化
        EventManager.emit('view-resize');
        // 适配
        this.adapt();
    }

    /**
     * 适配
     */
    protected adapt() {
        // 实际屏幕比例
        const winSize = new View().getVisibleSize(),
            screenRatio = winSize.width / winSize.height;
        // 设计比例
        const designResolution = new View().getDesignResolutionSize(),
            designRatio = designResolution.width / designResolution.height;
        // 判断实际屏幕宽高比
        if (screenRatio <= 1) {
            // 此时屏幕高度大于宽度，即：竖屏
            if (screenRatio <= designRatio) {
                this.setFitWidth();
            } else {
                // 此时实际屏幕比例大于设计比例，即：横屏
                // 为了保证纵向的游戏内容不受影响，应使用 fitHeight 模式
                this.setFitHeight();
            }
        } else {
            // 此时屏幕高度小于宽度
            this.setFitHeight();
        }
    }

    /**
     * 适配高度模式
     */
    protected setFitHeight() {
        // const canvas = Canvas.instance;
        // canvas.fitHeight = true;
        // canvas.fitWidth = false;

        // [4] ResolutionFixedHeight    
        // [5] ResolutionFixedWidth
        // const view = new View();
        view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
        log(view.getResolutionPolicy());
    }

    /**
    * 适配宽度模式
    */
    protected setFitWidth() {
        // const canvas = Canvas.instance;
        // canvas.fitHeight = false;
        // canvas.fitWidth = true;
        // const view = new View();
        view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
        log(view.getResolutionPolicy());
    }

}

