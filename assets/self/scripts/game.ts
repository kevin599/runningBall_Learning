import { _decorator, Component, Node, Prefab, instantiate, director, System, SystemEvent, Material, MeshRenderer, Color } from "cc";
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
	npcColor = ["#bedbfeff", "#00bdffff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f", "#000000"];
	onLoad() {
		console.log("game load");
		this.MAPINIT(10);

		this.BALLINIT(this.npcLever.length);
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
			npc.setPosition(0, 4, -1 * (2 + 2 * i));
			// this.SETMTL(i);

			npc.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[i])));
		}
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
}
