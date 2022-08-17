import { _decorator, Component, Node, RigidBody, PhysicsSystem, Vec3, EventTouch, __private, MeshRenderer, Material } from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = playerManer
 * DateTime = Fri Aug 05 2022 16:47:47 GMT+0800 (中国标准时间)
 * Author = keviiin
 * FileBasename = playerManer.ts
 * FileBasenameNoExtension = playerManer
 * URL = db://assets/scripts/playerManer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass("playerManer")
export class playerManer extends Component {
	@property({ type: Node, visible: true, displayName: "球节点", tooltip: "球节点" })
	ball: Node = null;

	@property({ type: Node })
	mainCamera: Node = null;

	@property({ type: Node })
	guideUI: Node = null;

	@property
	power: number = 11;

	gameStart: boolean = false;
	// 添加小球刚体变量
	ballRigidBody: RigidBody = null;

	// 材质
	@property({ type: Material })
	mtl: Material = null;

	ballWidth: number = 0;

	npcLever: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
	npcColor: ["#bedbfe", "#00bdff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f", "#000000"];
	onLoad() {
		console.log("player load");

		console.log("thisball materials:", this.ball.getComponent(MeshRenderer));
		// 物理系统实例
		PhysicsSystem.instance.enable = true;
		// 为小球添加线性推力
		this.ballRigidBody = this.ball.getComponent(RigidBody);

		// this.MTLCOPY();

		this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
		this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
	}
	// MTLCOPY() {
	// 	// 复制mtl
	// 	let mtl = this.getMaterial();
	// 	console.log("mtl start:", mtl);
	// 	let material = new Material();

	// 	mtl.copy(material);

	// 	this.ball.getComponent(MeshRenderer).setMaterial(material, 0);
	// 	mtl = material;
	// 	material.setProperty("mainColor", new Color(255, 0, 0, 255));

	// 	// 设置材质颜色参数
	// }
	// getMaterial() {
	// 	let meshRenderer = this.ball.getComponent(MeshRenderer);
	// 	if (!meshRenderer) {
	// 		return null;
	// 	}
	// 	let mat = this.node.getComponent(MeshRenderer).getMaterial(0);
	// 	return mat;
	// }
	touchStart(event: EventTouch) {
		this.gameStart = true;
		this.guideUI.active = false;
	}
	touchMove(event: EventTouch) {
		// 跟随手指移动
		let movePos = event.getLocation();
		let previosPos = event.getPreviousLocation();
		// let camera =
	}
	touchEnd(event: EventTouch) {
		console.log("touch end");
	}

	start() {
		// [3]
	}

	update(deltaTime: number) {
		// 原来需要持续给推力
		if (this.gameStart) {
			this.ballRigidBody.setAngularVelocity(new Vec3(-this.power, 0, 0));
		}
		if (this.ball.getPosition().z <= -20) {
			// 清除力
			this.ballRigidBody.setAngularVelocity(new Vec3(0, 0, 0));
		}

		// ball每秒z轴位移
		// this.ball.setPosition(this.ball.getPosition().x, this.ball.getPosition().y, this.ball.getPosition().z - deltaTime);
		// 超过30就停止
		// if(){
		// }
	}
}
