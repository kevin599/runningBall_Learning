import { Component, RichText, _decorator } from "cc";
import i18nMgr from "./i18nMgr";


const { ccclass, property, executeInEditMode, requireComponent, disallowMultiple } = _decorator;

/**
 * i18n富文本
 * @author chenkai 2022.3.8
 */
@ccclass
@executeInEditMode
@requireComponent(RichText)
@disallowMultiple
export default class i18nRichText extends Component {

    @property({ visible: false })
    private _key: string = "";
    @property({ type: String, tooltip: "配置key值" })
    public get key() {
        return this._key;
    }
    public set key(value) {
        this._key = value;
        this.resetValue();
    }


    @property({ visible: false })
    private _params: string[] = [];
    @property({ type: [String], tooltip: "传入参数" })
    public get params() {
        return this._params;
    }
    public set params(value: string[]) {
        this._params = value;
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
     * @param params 传入参数
     */
    public setValue(key: string, params: string[]) {
        this._key = key;
        this._params = params;
        this.resetValue();
    }

    /**重置 */
    public resetValue() {
        let label: RichText = this.node.getComponent(RichText);
        label.string = i18nMgr.ins.getLabel(this._key, this._params);
    }
}
