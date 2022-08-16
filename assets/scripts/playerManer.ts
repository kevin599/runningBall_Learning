import { _decorator, Component, Node, RigidBody, PhysicsSystem, Vec3 } from "cc";
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
	// [1]
	// dummy = '';

	// [2]
	@property({ type: Node, visible: true, displayName: "球节点", tooltip: "球节点" })
	ball: Node = null;

	@property
	speed: number = 10;

	// 添加小球刚体变量
	ballRigidBody: RigidBody = null;

	onLoad() {
		console.log("player load");

		// 物理系统实例
		PhysicsSystem.instance.enable = true;
		// 为小球添加线性推力
		this.ballRigidBody = this.ball.getComponent(RigidBody);
		// 别开重力了
		// this.ballRigidBody.useGravity = true;
		// 添加线性推力
		this.ballRigidBody.setAngularVelocity(new Vec3(0, 0, 5));
	}

	start() {
		// [3]
	}

	update(deltaTime: number) {
		// ball每秒z轴位移
		// this.ball.setPosition(this.ball.getPosition().x, this.ball.getPosition().y, this.ball.getPosition().z - deltaTime);
        // 超过30就停止
        // if(){
            

        // }
	}
}
