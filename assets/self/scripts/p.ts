import { _decorator, Component, Collider } from "cc";
const { ccclass } = _decorator;

@ccclass("p")
export class p extends Component {
	public start() {
		let collider = this.node.getComponent(Collider);
		// 监听触发事件
		collider.on("onCollisionEnter", this.onCollision, this);
	}
	private onCollision() {}
}
