import {
	_decorator,
	Component,
	Node,
	RigidBody,
	PhysicsSystem,
	Vec3,
	EventTouch,
	__private,
	MeshRenderer,
	Material,
	Collider,
	SphereCollider,
	Director,
	ICollisionEvent,
	v3,
	Color,
	CCFloat,
	Camera,
	director,
	screen,
	Vec2,
	Size,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("playerManer")
export class playerManer extends Component {
	@property({ type: Node, visible: true, displayName: "球节点", tooltip: "球节点" })
	ball: Node = null;

	@property({ type: Node })
	mainCamera: Node = null;

	@property({ type: Node })
	guideUI: Node = null;

	@property({ type: Node })
	camera: Node = null;

	@property
	power: number = 11;

	gameStart: boolean = false;
	// 添加小球刚体变量
	ballRigidBody: RigidBody = null;

	// 材质
	@property({ type: Material })
	mtl: Material = null;

	@property({ type: CCFloat, displayName: "合成小球涨大scale", tooltip: "当前scale增加当前系数" })
	scale: number = 0.01;

	curLeverNum: number = 0;

	ballWidth: number = 0;

	// 屏幕
	winSize: Size = null;
	// 手指初次点击的屏幕坐标
	touchStartPos: Vec2 = new Vec2();
	// 手指移动位置坐标
	touchMovePos: Vec2 = new Vec2();

	disBewteenBallAndCamera: number = 0;

	npcLever = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
	npcColor = ["#bedbfe", "#00bdff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f"];
	onLoad() {
		console.log("player load");

		this.init();
		// 物理系统实例
		// PhysicsSystem.instance.enable = true;
		// 为小球添加线性推力
		this.ballRigidBody = this.ball.getComponent(RigidBody);
		// var manager = Director.getCollisionManager();
		// manager.enabled = true;
		// 开启碰撞检测
		// Director.collisionManager.enabled = true;
		// this.MTLCOPY();

		this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
		this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
		let coll = this.ball.getComponent(SphereCollider);
		coll.enabled = true;
		coll.on("onCollisionEnter", this.onCollisionEnter, this);
	}
	init() {}
	onCollisionEnter(event: ICollisionEvent) {
		let attach_group = event.otherCollider.getGroup();
		// console.log("other:", attach_group);
		switch (attach_group) {
			case 1:
				break;
			case 2:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 4:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 8:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 16:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 32:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 64:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 128:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 256:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 512:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 1024:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			case 2048:
				++this.curLeverNum;
				this.updateLever(this.curLeverNum);
				// 消失
				event.otherCollider.node.active = false;
				break;
			default:
				console.log("is default");

				break;
		}
	}

	touchStart(event: EventTouch) {
		this.gameStart = true;
		this.guideUI.active = false;
		// 获取初次点击屏幕的坐标，获取手指移动距离
		// 将移动距离转化为 小球的x轴移动的距离
		// 获取屏幕宽高
		this.winSize = screen.windowSize;
		console.log(this.winSize);

		// 获取手指在屏幕上的坐标
		this.touchStartPos = event.getLocation();
		console.log("touchStart:", this.touchStartPos);
	}
	touchMove(event: EventTouch) {
		// console.log("getStartLocation", event.getStartLocation());

		// console.log("getPreviousLocation", event.getPreviousLocation());

		// this.touchMovePos = event.getLocation();
		// console.log("movePos:", this.touchMovePos);
		// // 获取手指移动的距离
		// let touchMoveDis = this.touchMovePos.subtract(this.touchStartPos);
		// console.log("touchDis:", touchMoveDis);
		// 用上一次的位置减去现在的位置，得到移动的距离
		let startLocation = event.getStartLocation();
		let previousLocation = event.getPreviousLocation();
		let movePos = event.getLocation();
		let touchMoveDis = movePos.subtract(previousLocation);
		console.log("touchDis:", touchMoveDis);
		// 设置小球的x坐标
		let ballPos = this.ball.getPosition();
		this.ball.setPosition(ballPos.x + touchMoveDis.x / 100, ballPos.y);
	}
	touchEnd(event: EventTouch) {
		console.log("touch end");
	}

	start() {
		// [3]
		//获取相机的世界坐标
		let cameraWorldPos = this.camera.getWorldPosition();
		let ballWorldPos = this.ball.getWorldPosition();
		//获取相机与小球的距离
		let dis = ballWorldPos.subtract(cameraWorldPos).length();
		this.disBewteenBallAndCamera = dis;
		console.log("dis:", dis);
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
	}

	lateUpdate(deltaTime: number) {
		// //获取相机的世界坐标
		let cameraWorldPos = this.camera.getWorldPosition();
		let ballWorldPos = this.ball.getWorldPosition();
		// //获取相机与小球的距离
		let dis = ballWorldPos.subtract(cameraWorldPos).length();

		let sub = this.disBewteenBallAndCamera - dis;

		this.camera.setPosition(this.camera.getPosition().x, this.camera.getPosition().y, this.camera.getPosition().z + sub / 10);
		//设置相机的距离
		// this.camera.setWorldPosition(cameraWorldPos.x, cameraWorldPos.y, -dis);
	}

	updateLever(lever: number) {
		// 设置分组
		this.ball.getComponent(Collider).attachedRigidBody.group = this.npcLever[lever];
		// console.log(this.ball.getComponent(Collider).getGroup());
		// 获取scale
		let scale = this.ball.getScale();
		// 设置scale 涨大
		this.ball.setScale(new Vec3(scale.x + this.scale, scale.y + this.scale, scale.z + this.scale));
		// 球变色
		this.ball.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[lever])));
	}
}

// 相机跟随小球
// 获取相机的世界坐标
// 获取小球的世界坐标
// 计算两者之间的距离
// 保持两者之间的距离
