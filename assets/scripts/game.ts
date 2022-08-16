import { _decorator, Component, Node, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("game")
export class game extends Component {
	@property({ type: Prefab })
	road: Prefab = null;

	@property({ type: Node })
	roadParent: Node = null;

	onLoad() {
		console.log("game load");
		this.MAPINIT(10);
	}

	// 桥初始化
	MAPINIT(num) {
		console.log(num);

		// 循环 创建桥 30个
		for (let i = 0; i < num; i++) {
			let road = instantiate(this.road);
			road.parent = this.roadParent;
			road.setPosition(0, 0, -i);
		}
	}
	start() {
		console.log("game start");

		// [3]
	}
}
