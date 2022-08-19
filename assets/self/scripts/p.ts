import { _decorator, Component, Node, SphereCollider, ICollisionEvent, Collider, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("p")
export class p extends Component {
	public start() {
		let collider = this.node.getComponent(Collider);
		// 监听触发事件
		collider.on("onCollisionEnter", this.onCollision, this);
	}
	private onCollision(event: ICollisionEvent) {
		// 获取碰撞物体的的group
		// let group = event.otherCollider.node;
		// console.log(group.name);
		// let group = event.selfCollider.attachedRigidBody.group;
		// let attach_group = event.otherCollider.getGroup();
		// // console.log("other:", attach_group);
		// switch (attach_group) {
		// 	case 1:
		// 		console.log("is road");
		// 		break;
		// 	case 2:
		// 		console.log("is 2");
		// 		this.node.scale = new Vec3(1.1, 1.1, 1.1);
		// 		// 消失
		// 		event.otherCollider.node.active = false;
		//         // event.selfCollider.setGroup = 3;
		// 		break;
		// 	case 4:
		// 		console.log("is 4");
		// 		break;
		// 	default:
		// 		break;
		// }
	}
}
