import {
	_decorator,
	Component,
	Node,
	RigidBody,
	Vec3,
	EventTouch,
	__private,
	MeshRenderer,
	Material,
	Collider,
	SphereCollider,
	ICollisionEvent,
	Color,
	CCFloat,
	screen,
	Vec2,
	Size,
	view,
	director,
	tween,
	Prefab,
	instantiate,
	Texture2D,
	find,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("playerManer")
export class playerManer extends Component {
	@property({ type: Node })
	ball: Node = null;

	@property({ type: Node })
	mainCamera: Node = null;

	@property({ type: Prefab })
	caidai: Prefab = null;

	@property({ type: Node })
	guideUI: Node = null;

	@property({ type: Node })
	h_ui: Node = null;

	@property({ type: Node })
	pop: Node = null;

	@property({ type: Node })
	camera: Node = null;

	@property
	power: number = 11;

	@property
	borderDis: number = 1.2;

	gameStart: boolean = false;

	ballRigidBody: RigidBody = null;

	@property({ type: Material })
	mtl: Material = null;

	@property({ type: CCFloat })
	scale: number = 0.01;

	curLeverNum: number = 0;

	ballWidth: number = 0;

	gameEnd: boolean = false;

	winSize: Size = null;

	touchStartPos: Vec2 = new Vec2();

	touchMovePos: Vec2 = new Vec2();

	disBewteenBallAndCamera: number = 0;
	@property({ type: Texture2D })
	textureBase: Texture2D[] = [];

	endline: Node = null;
	npcLever = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
	npcColor = ["#bedbfe", "#00bdff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f"];
	onLoad() {
		this.endline = find("/road").getChildByName("endline");

		this.ballRigidBody = this.ball.getComponent(RigidBody);
		this.ball.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[0])));

		this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
		this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
		let coll = this.ball.getComponent(SphereCollider);
		coll.enabled = true;
		coll.on("onCollisionEnter", this.onCollisionEnter, this);
		if (screen.windowSize.x >= screen.windowSize.y) {
			this.h_ui.active = true;
			this.pop.setScale(new Vec3(1, 1, 1));
			this.guideUI.setScale(new Vec3(1, 1, 1));
			console.log("pop un scale");
		} else {
			this.h_ui.active = false;
			this.pop.setScale(new Vec3(1.6, 1.6, 1));
			this.guideUI.setScale(new Vec3(1.6, 1.6, 1));
			console.log("pop scale");
		}

		// 监听转屏
		view.setResizeCallback(() => {
			console.log("resize");

			if (screen.windowSize.x >= screen.windowSize.y) {
				this.h_ui.active = true;
				this.pop.setScale(new Vec3(1, 1, 1));
				this.guideUI.setScale(new Vec3(1, 1, 1));
				console.log("pop un scale");
			} else {
				console.log("pop scale");
				this.h_ui.active = false;
				this.pop.setScale(new Vec3(1.6, 1.6, 1));
				this.guideUI.setScale(new Vec3(1.6, 1.6, 1));
			}
		});

		director.once("end", this.end, this);
		director.once("popshow", this.popShow, this);
		director.once("toEndLine", this.TOENDLINE, this);
	}

	end() {
		// console.log(" emit end");
		let caidaiprefab = instantiate(this.caidai);
		caidaiprefab.setRotationFromEuler(new Vec3(0, -90, 0));
		caidaiprefab.setParent(this.ball);

		this.gameEnd = true;
	}

	onCollisionEnter(event: ICollisionEvent) {
		let other_attach_group = event.otherCollider.getGroup();
		let self_attach_group = event.selfCollider.getGroup();

		// console.log("碰撞到的小球分组:", other_attach_group);
		if (self_attach_group == other_attach_group) {
			switch (other_attach_group) {
				case 1:
					if (this.ball.getPosition().x <= -this.borderDis) {
						this.ball.setPosition(-this.borderDis, this.ball.getPosition().y, this.ball.getPosition().z);
					} else if (this.ball.getPosition().x >= this.borderDis) {
						this.ball.setPosition(this.borderDis, this.ball.getPosition().y, this.ball.getPosition().z);
					}
					break;
				case 2:
					++this.curLeverNum;
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 4:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 8:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 16:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 32:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 64:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 128:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 256:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 512:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 1024:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					break;
				case 2048:
					++this.curLeverNum;
					// this.updateLever(this.curLeverNum);
					this.updateLever(this.curLeverNum, event.otherCollider.node);
					// 消失
					event.otherCollider.node.active = false;
					// 发射游戏结束事件
					director.emit("end");
					break;
				default:
					// console.log("is default");

					break;
			}
		}
	}

	touchStart(event: EventTouch) {
		this.gameStart = true;
		this.guideUI.active = false;
		// 获取初次点击屏幕的坐标，获取手指移动距离
		// 将移动距离转化为 小球的x轴移动的距离
		// 获取屏幕宽高
		this.winSize = screen.windowSize;
		// console.log(this.winSize);

		// 获取手指在屏幕上的坐标
		this.touchStartPos = event.getLocation();
		// console.log("touchStart:", this.touchStartPos);
	}
	touchMove(event: EventTouch) {
		// 用上一次的位置减去现在的位置，得到移动的距离
		let startLocation = event.getStartLocation();
		let previousLocation = event.getPreviousLocation();
		let movePos = event.getLocation();
		let touchMoveDis = movePos.subtract(previousLocation);
		// console.log("touchDis:", touchMoveDis);
		// 设置小球的x坐标
		let ballPos = this.ball.getPosition();
		this.ball.setPosition(ballPos.x + touchMoveDis.x / 100, ballPos.y);
	}
	touchEnd(event: EventTouch) {}

	start() {
		// [3]
		//获取相机的世界坐标
		let cameraWorldPos = this.camera.getWorldPosition();
		let ballWorldPos = this.ball.getWorldPosition();
		//获取相机与小球的距离
		let dis = ballWorldPos.subtract(cameraWorldPos).length();
		this.disBewteenBallAndCamera = dis;
		// console.log("dis:", dis);
	}

	update(deltaTime: number) {
		if (this.gameStart) {
			this.ballRigidBody.setAngularVelocity(new Vec3(-this.power, 0, 0));
		}
		if (this.ball.getPosition().z <= this.endline.getPosition().z) {
			// 清除力
			director.emit("toEndLine");
			this.ballRigidBody.setAngularVelocity(new Vec3(0, 0, 0));

			this.gameEnd = true;
		}
		if (this.ball.getPosition().y < 0 && this.gameStart) {
			director.emit("popshow");
			director.emit("end");

			// 清除力
			this.ballRigidBody.setAngularVelocity(new Vec3(0, 0, 0));
			this.gameStart = false;
			this.gameEnd = true;
		}
	}

	lateUpdate(deltaTime: number) {
		// 摄像机移动
		if (this.gameStart) {
			let cameraWorldPos = this.camera.getWorldPosition();
			let ballWorldPos = this.ball.getWorldPosition();
			// //获取相机与小球的距离
			let dis = ballWorldPos.subtract(cameraWorldPos).length();

			let sub = this.disBewteenBallAndCamera - dis;
			//摄像机抖动
			this.camera.setPosition(this.camera.getPosition().x, this.camera.getPosition().y, this.camera.getPosition().z + sub / 10);
		}
	}

	updateLever(lever: number, other_node?: Node) {
		this.ball.getComponent(Collider).attachedRigidBody.group = Math.pow(2, lever + 1);
		let ball_lever = this.ball.getComponent(Collider).attachedRigidBody.group;

		// 获取scale
		let scale = this.ball.getScale();
		// 设置scale 涨大
		this.ball.setScale(new Vec3(scale.x + this.scale, scale.y + this.scale, scale.z + this.scale));
		// 球变色
		// this.ball.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[lever])));
		// this.ball.getComponent(MeshRenderer).material.setProperty("albedoMap", other_node.getComponent(MeshRenderer).material.getProperty("albedoMap"));
		this.ball.getComponent(MeshRenderer).material.setProperty("albedoMap", this.textureBase[lever]);

		if (ball_lever == this.npcLever[this.npcLever.length - 1]) {
			this.TOENDLINE();
		}
	}

	popShow() {
		this.pop.setScale(new Vec3(0, 0, 0));
		this.pop.active = true;
		//缓动 把pop放大
		tween(this.pop)
			.to(0.5, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	TOENDLINE() {
		this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
		this.node.off(Node.EventType.TOUCH_MOVE, this.touchMove, this);
		this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);
		let P: Vec3 = this.ball.getPosition();
		this.ball.setPosition(0, P.y, P.z);
		let end_lever = this.GET_BALL_LEVER();
		// console.log(this.GET_BALL_LEVER());
		this.ballRigidBody.setLinearVelocity(new Vec3(0, 0, -this.power / 2));
		// this.ballRigidBody.setAngularVelocity(new Vec3(-this.power * 2, 0, 0));

		let cb = function () {
			// this.ballRigidBody.setLinearVelocity(new Vec3(0, 0, -this.power / 2));
			this.ballRigidBody.setAngularVelocity(new Vec3(-2 * this.power, 0, 0));
			let end_p: Vec3 = this.GET_END_P(end_lever);
			if (this.ball.getPosition().z <= end_p.z) {
				console.log("end");
				this.gameStart = false;
				this.ballRigidBody.clearState();
				this.unscheduleAllCallbacks();
				this.ball.setPosition(new Vec3(0, this.ball.getPosition().y, end_p.z + 1));
				this.ball.setRotationFromEuler(new Vec3(0, -90, 60));
				director.emit("end");
				setTimeout(() => {
					director.emit("popshow");
				}, 700);
			}
		};
		this.schedule(cb, 0.01);
	}
	GET_BALL_LEVER() {
		return this.ball.getComponent(Collider).attachedRigidBody.group;
	}

	GET_END_P(num: Number): Vec3 {
		return find("road")
			.getChildByName("color_bridge" + num)
			.getPosition();
	}
}
