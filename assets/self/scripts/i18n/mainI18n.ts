
const { ccclass, property } = _decorator;
import { Component, Enum, _decorator, find, Node, Layout, UITransform, Label, color, log, SpriteFrame, Sprite, Vec3, v3, Layers } from "cc";
import i18nMgr, { Language } from "./i18nMgr";
import EventManager from "../eazax-ccc/EventManager";
@ccclass
export default class MainI18N extends Component {
    @property({ type: SpriteFrame })
    spf: SpriteFrame = null;
    //单例
    private static _ins: MainI18N;
    public static get ins() {
        if (this._ins == null) {
            this._ins = new MainI18N();
        }
        return this._ins;
    }

    @property
    public isSpecify: boolean = false;


    @property
    isDebugMode: boolean = false;

    private num: number = 0
    private i18nNode: Node = null;


    @property({
        type: Enum(Language), visible() {
            return this.isSpecify
        }, tooltip: "选择规定语言",
    })

    private specifiedLanguage: Language = Language.en; // Default to English. 描述自定义语言的选择。 可选择语言


    private lan: string = null;

    onLoad() {
        this.initI18n()

        let canvas = find('Canvas')
        let isMobile = this.isMobile()
        if (!isMobile.device) {
            canvas.on(Node.EventType.TOUCH_START, this.show, this)
            this.initChangeLanguage()
        }
        if (this.isDebugMode) {
            this.i18nNode.active = true;
        }

    }

    initI18n() {
        if (!this.isSpecify) {
            let curlanguge = window.navigator.language.split('-')
            curlanguge.forEach(e => {
                if (Language[e]) {
                    this.lan = e
                }
            });
            if (Language[this.lan]) {
                let curlanguge1: Language = Language[this.lan];
                i18nMgr.ins.setLanguage(curlanguge1);
            } else {
                console.log(window.navigator.language, "->不存在当前环境语言,使用默认语言->en");
                // log(Language[i18nMgr.ins.getLanguage()])
            }
        } else {
            // let curlanguge1: Language = Language[this.lan];
            // i18nMgr.ins.setLanguage(curlanguge1);
            i18nMgr.ins.setLanguage(this.specifiedLanguage);
            // log("isSpecified", i18nMgr.ins.getLanguage())
        }
    }

    initChangeLanguage() {
        let canvas = find('Canvas')
        // log('initChangeLanguage');
        // 新建node名为i18n
        let i18n = new Node();
        i18n.name = 'i18n';
        i18n.parent = canvas;
        i18n.setPosition(0, 0);
        let layout = i18n.addComponent(Layout);
        layout.type = Layout.Type.HORIZONTAL;
        layout.spacingX = 50;
        layout.resizeMode = Layout.ResizeMode.CONTAINER;
        // 获取有多少个语言
        let keySInLanguageArr = Object.keys(Language).filter(e => { return e.length > 1 })
        // log(keySInLanguageArr)
        keySInLanguageArr.forEach(e => {
            let node = new Node();
            node.layer = Layers.Enum.UI_2D;
            node.name = e;
            node.setPosition(v3(0, 0, 0));
            node.addComponent(UITransform).setContentSize(50, 50);
            let label = node.addComponent(Label);
            label.string = e;
            label.color = color(0, 0, 0, 255);

            node.parent = i18n;
            node.on(Node.EventType.TOUCH_START, this.changeLanguageByName, this, false);
        });
        // this.i18nNode.layer = Layers.Enum.UI_2D;
        this.i18nNode = i18n;
        this.i18nNode.active = false;
    }

    private show() {
        if (this.num >= 10) {
            // find("Canvas/i18n").active = true
            this.i18nNode.active = true;
        } else {
            this.num++
            // console.log(this.num);
        }

    }

    change_language() {
        let language: string = arguments[1]
        let curlanguge1: Language = Language[language];
        i18nMgr.ins.setLanguage(curlanguge1);
        EventManager.emit('i18nLANGUAGECHANGE')
    }

    changeLanguageByName(event) {
        // 还原所有兄弟节点大小
        this.reSetScale();
        let language: string = event.target.name;
        // log(language)
        // event.target.scale += 0.5;
        let node: Node = event.target;
        let scale = node.scale.add3f(0.5, 0.5, 0.5);
        node.setScale(scale);
        // event.target.color = color(224, 97, 78)
        node.getComponent(Label).color = color(224, 97, 78, 255);
        let curlanguge1: Language = Language[language];
        i18nMgr.ins.setLanguage(curlanguge1);
        EventManager.emit('i18nLANGUAGECHANGE')
    }

    // 还原所有兄弟节点大小
    reSetScale() {
        if (!this.i18nNode) return;
        let children = this.i18nNode.children
        for (let i = 0; i < children.length; i++) {
            children[i].setScale(Vec3.ONE);
            children[i].getComponent(Label).color = color(0, 0, 0, 255);
        }
    }
    /**
    * is mobile device or not
    * @return obj
    */
    private isMobile = () => {
        let agent = navigator.userAgent.toLowerCase();
        // log(agent)
        let result = {
            device: function () {
                if (/iphone|ipod/.test(agent) && /mobile/.test(agent) || /ipad/.test(agent) && /mobile/.test(agent) || /android/.test(agent) && /mobile/.test(agent)) {
                    return true
                } else if (/windows/.test(agent) || /linux/.test(agent) || /mac/.test(agent)) {
                    return false
                } else {
                    return true
                }
            }(),
        };
        // log('device', result);
        return result;
    };

}
