import { _decorator, Component, Node, Camera, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("headscript")
export class headscript extends Component {
	// 3d人物头顶的文字
	@property(Node)
	target: Node = null!;
	//3d摄像机
	@property(Camera)
	camera: Camera = null!;
	@property
	distance = 0;

	private _lastWPos: Vec3 = new Vec3();
	private _pos: Vec3 = new Vec3();

	update() {
		const wpos = this.target.worldPosition;
		// @ts-ignore
		if (!this.camera!._camera || this._lastWPos.equals(wpos)) {
			return;
		}

		this._lastWPos.set(wpos);
		const camera = this.camera!;
		// [HACK]
		// @ts-ignore
		camera._camera.update();
		camera.convertToUINode(wpos, this.node.parent!, this._pos);
		this.node.setPosition(this._pos);
		// @ts-ignore
		Vec3.transformMat4(this._pos, this.target.worldPosition, camera._camera!.matView);

		const ratio = this.distance / Math.abs(this._pos.z);

		const value = Math.floor(ratio * 100) / 100;
		this.node.setScale(value, value, 1);
	}
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
