import { _decorator, Component, Node, SphereCollider, ICollisionEvent, Collider } from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = p
 * DateTime = Wed Aug 17 2022 19:53:28 GMT+0800 (中国标准时间)
 * Author = keviiin
 * FileBasename = p.ts
 * FileBasenameNoExtension = p
 * URL = db://assets/self/scripts/p.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass("p")
export class p extends Component {
	// [1]
	// dummy = '';

	// [2]
	// @property
	// serializableDummy = 0;

	// start() {
	// 	let coll = this.node.getComponent(SphereCollider);
	// 	coll.enabled = true;
	// 	// coll.on("onCollisionEnter", this.onCollisionEnter, this);
	// }
	// // onCollisionEnter(event) {
	// // 	console.log("onCollisionEnter");
	// // }

	// onCollisionEnter() {
	// 	console.log("onCollisionEnter");
	// }
	// update (deltaTime: number) {
	//     // [4]
	// }

	public start() {
		let collider = this.node.getComponent(Collider);
		// 监听触发事件
		collider.on("onCollisionEnter", this.onCollision, this);
	}

	private onCollision(event: ICollisionEvent) {
		// 获取碰撞的group
		// let group = event.contacts.selfCollider
        // console.log(group);
        
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
