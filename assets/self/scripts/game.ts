import { _decorator, Component, Node, Prefab, instantiate, Material, MeshRenderer, Color, Collider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("game")
export class game extends Component {
	// 材质
	@property({ type: Material })
	ball_mtl: Material = null;

	@property({ type: Prefab })
	road: Prefab = null;

	@property({ type: Prefab })
	npc: Prefab = null;

	@property({ type: Node })
	roadParent: Node = null;

	@property({ type: Node })
	npcParent: Node = null;

	npcLever = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
	npcColor = ["#bedbfeff", "#00bdffff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f"];
	onLoad() {
		console.log("game load");
		this.MAPINIT(20);

		this.BALLINIT(this.npcLever.length - 1);
		// 监听自定义事件
		// console.log(this.npcColor[1]);
	}

	// 桥初始化
	MAPINIT(num) {
		for (let i = 0; i < num; i++) {
			let road = instantiate(this.road);
			road.parent = this.roadParent;
			road.setPosition(0, 0, -i);
		}
	}

	// 桥上小球初始化
	BALLINIT(num) {
		for (let i = 0; i < num; i++) {
			let npc = instantiate(this.npc);

			npc.parent = this.npcParent;

			npc.setPosition(i % 2 == 0 ? 0.75 : -0.75, 3.5, -1 * (2.5 + 2.25 * i));
			// 最后一个 z = -1 * (3 + 2.25 * 9 )≈23
			// this.SETMTL(i);

			npc.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[i])));
			// 为小球添加分组
			npc.getComponent(Collider).attachedRigidBody.group = Math.pow(2, i + 1);
			// 分组要设置成2的group次方
			// 相当于

			// let npc1 = instantiate(this.npc);
			// npc1.parent = this.npcParent;
			// npc1.setPosition(i % 2 == 0 ? -0.8 : 0.8, 3.5, -1 * (2 + 2 * i));
			// npc1.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[i])));
			// npc1.getComponent(Collider).attachedRigidBody.group = this.npcLever[i];
		}
		// 遍历所有小球的group
		// for (let i = 0; i < num; i++) {
		// 	let npc = this.npcParent.children[i];
		// 	let group = npc.getComponent(Collider).attachedRigidBody.group;
		// 	console.log(group);
		// }
	}

	SETMTL(index) {
		// 复制mtl
		let mtl = this.ball_mtl;
		console.log("mtl start:", mtl);
		let material = new Material();
		material.initialize({
			effectName: index,
		});
		mtl.copy(material);
		material.setProperty("mainColor", new Color(255, 0, 0, 255));

		return material;
	}

	start() {
		console.log("game start");
	}

	// 设置resize回调
}
