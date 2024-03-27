import { JsonAsset, SpriteFrame, _decorator, loader, log, resources } from "cc";
import i18nLabel from "./i18nLabel";

const { ccclass, property } = _decorator;

/**
 * i18n管理类
 * @author chenkai 2022.3.8
 */
@ccclass
export default class i18nMgr {
	//单例
	private static _ins: i18nMgr;
	public static get ins() {
		if (this._ins == null) {
			this._ins = new i18nMgr();
		}
		return this._ins;
	}

	/**语言路径 */
	private language_path = {
		"1": "en",
		// "2": "pt",
		// "3": "id",
		"4": "ru",
		"5": "tr",
		"6": "hi",
		// "7": "es",
		// "8": "ar",

	};

	/**是否初始化过 */
	private _inited: boolean = false;
	/**语言，默认中文 */
	private _language: Language = Language.en;
	/**文本配置 */
	private _labelConfig = {};
	/**组件列表 */
	private _componentList = [];

	/**
	 * 设置语言
	 * @param language 语言
	 */
	public setLanguage(language: Language) {
		if (this._language == language) {
			return;
		}
		this._language = language;
		this.loadConfig();
	}

	/**加载配置，重置组件 */
	private loadConfig() {
		let url = this.getLabelPath(this._language);
		// resources.load(url, JsonAsset, (err, assets) => {
		resources.load(url, JsonAsset, (err, assets: JsonAsset) => {
			if (!err) {
				this._labelConfig = (assets as JsonAsset).json;
				for (let com of this._componentList) {
					com.resetValue();
				}
			} else {
				console.error("[i18nMgr] 文本配置不存在:", url);
			}
		});
	}

	/**
	 * 获取文本配置路径
	 * @param language 语言
	 * @returns 返回文本配置路径
	 */
	public getLabelPath(language: Language) {
		return "i18n/label/" + this.language_path[language];
	}

	/**
	 * 获取图片路径
	 * @param language 语言
	 * @param key  图片key
	 * @returns 返回图片路径
	 */
	public getSpritePath(language: Language, key) {
		return "i18n/sprite/" + this.language_path[language] + "/" + key + '/spriteFrame';
	}

	/**
	 * 添加组件
	 * @param componet 组件
	 */
	public add(component) {
		this._componentList.push(component);
	}

	/**
	 * 移除组件
	 * @param component 组件
	 */
	public remove(component) {
		let index = this._componentList.indexOf(component);
		if (index != -1) {
			this._componentList.splice(index, 1);
		}
	}

	/**
	 * 获取配置文本
	 * @param key key值
	 * @param params 传入参数
	 * @returns 返回字符串
	 */
	public getLabel(key: string, params: string[] = null) {
		this.checkInit();
		if (params == null || params.length == 0) {
			return this._labelConfig[key] || key;
		}
		let str = this._labelConfig[key] || key;
		for (let i = 0; i < params.length; i++) {
			let reg = new RegExp("%" + i, "g");
			str = str.replace(reg, params[i]);
		}
		return str;
	}

	/**
	 * 获取图片
	 * @param key key值
	 * @param cb 回调
	 * @param target 回调对象
	 * @returns 返回图片spriteFrame
	 */
	public getSpriteFrame(key: string, cb: Function, target: any) {
		this.checkInit();
		let url = this.getSpritePath(this._language, key);
		resources.load(url, SpriteFrame, (err, assets) => {
			// loader.loadRes(url, SpriteFrame, (err, assets) => {
			if (err == null) {
				cb.call(target, assets);
			} else {
				cb.call(target, null);
			}
		});
	}

	/**检查初始化 */
	private checkInit() {
		if (this._inited == false) {
			this._inited = true;
			this.loadConfig();
		}
	}
}

/**语言 */
export enum Language {
	/**英文 */
	en = 1,
	// /**巴西 */
	// pt = 2,
	// /**印尼 */
	// id = 3,
	/**俄罗斯 */
	ru = 4,
	/**土耳其 */
	tr = 5,
	/**印度 */
	hi = 6,
	// /**西班牙 */
	// es = 7,
	// /**阿拉伯 */
	// ar = 8,
}
