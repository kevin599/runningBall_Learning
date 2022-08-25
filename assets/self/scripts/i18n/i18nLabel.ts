import { Component, Label, _decorator } from "cc";
import i18nMgr from "./i18nMgr";

const { ccclass, property, executeInEditMode, requireComponent, disallowMultiple } = _decorator;

/**
 * i18n文本
 * @author chenkai 2022.3.8
 */
@ccclass
@executeInEditMode //生命周期会在编辑器下触发，例如start
@requireComponent(Label) //指定当前组件的依赖组件
@disallowMultiple //当本组件添加到节点上后，禁止同类型（含子类）的组件再添加到同一个节点
export default class i18nLabel extends Component {
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
		let label: Label = this.node.getComponent(Label);
		label.string = i18nMgr.ins.getLabel(this._key, this._params);
	}
}
