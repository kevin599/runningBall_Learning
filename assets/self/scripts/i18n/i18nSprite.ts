import { CCString, Component, Sprite, SpriteFrame, _decorator, isValid, log } from "cc";
import i18nMgr from "./i18nMgr";


const { ccclass, property, executeInEditMode, requireComponent, disallowMultiple } = _decorator;

/**
 * i18nSprite
 * @author chenkai 2022.3.8
 */
@ccclass
@executeInEditMode
@requireComponent(Sprite)
@disallowMultiple
export default class i18nSprite extends Component {

    @property({ visible: false })
    private _key: string = "";
    @property({ type: CCString, tooltip: "配置key值" })
    public get key() {
        return this._key;
    }
    public set key(value) {
        this._key = value;
        this.resetValue();
    }

    start() {
        i18nMgr.ins.add(this);
        this.resetValue();
    }

    onDestroy() {
        i18nMgr.ins.remove(this);
    }

    /**
     * 设置
     * @param key   配置key值 
     */
    public setValue(key: string) {
        this._key = key;
        this.resetValue();
    }

    /**重置 */
    public resetValue() {
        i18nMgr.ins.getSpriteFrame(this._key, (spriteFrame: SpriteFrame) => {
           
            if (spriteFrame != null && isValid(this.node)) {
                let sp: Sprite = this.node.getComponent(Sprite);
                sp.spriteFrame = spriteFrame;
            }
        }, this)
    }
}
