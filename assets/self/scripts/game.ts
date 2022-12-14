import {
	_decorator,
	Component,
	Node,
	Prefab,
	instantiate,
	Material,
	MeshRenderer,
	Color,
	Collider,
	Script,
	RichText,
	find,
	Camera,
	UITransform,
	math,
	Texture2D,
	director,
	loader,
} from "cc";
import { headscript } from "./headscript";
const { ccclass, property } = _decorator;

@ccclass("game")
export class game extends Component {
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

	@property({ type: Camera })
	mainCamera: Camera = null;

	@property({ type: Texture2D })
	textureBase: Texture2D[] = [];

	npcLever = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
	npcColor = ["#bedbfeff", "#00bdffff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f"];

	onLoad() {
		console.log("game load");
		this.MAPINIT(30);

		this.BALLINIT(this.npcColor.length - 1);
		find("/player/player").getComponent(MeshRenderer).material.setProperty("albedoMap", this.textureBase[0]);
	}

	// 桥初始化
	MAPINIT(num) {
		for (let i = 0; i < num; i++) {
			let road = instantiate(this.road);
			road.parent = this.roadParent;
			// road01
			// road.setPosition(0, 0, -i);
			// road02
			road.setPosition(0, 0, -i * 3);
			road.getChildByName("road").getComponent(MeshRenderer).material.setProperty("mainColor", new Color(211, 227, 243));
			road.getChildByName("sideL").getComponent(MeshRenderer).material.setProperty("mainColor", new Color(146, 157, 243));
			road.getChildByName("sideR").getComponent(MeshRenderer).material.setProperty("mainColor", new Color(146, 157, 243));
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

			// npc.getComponent(MeshRenderer).material.setProperty("mainColor", new Color(new Color().fromHEX(this.npcColor[i])));
			// 为小球添加分组
			npc.getComponent(Collider).attachedRigidBody.group = Math.pow(2, i + 1);

			// npc 贴图
			let pass = npc.getComponent(MeshRenderer).material.passes[0];
			// pass.properties.albedoMap.value = this.textureBase[0];
			npc.getComponent(MeshRenderer).material.setProperty("albedoMap", this.textureBase[i]);
		}
	}

	SETMTL(index) {
		// 复制mtl
		let mtl = this.ball_mtl;
		let material = new Material();
		material.initialize({
			effectName: index,
		});
		mtl.copy(material);
		material.setProperty("mainColor", new Color(255, 0, 0, 255));

		return material;
	}

	setDiyMtl(node: Node, color: Color) {
		let mtl = this.ball_mtl;
		let material = new Material();
		material.initialize({
			effectName: "diy",
		});
		mtl.copy(material);
		material.setProperty("mainColor", color);

		return material;
	}

	start() {
		console.log("game start");
	}

	download() {
		console.log("download");
		gameDownload();
	}

	// addRichText(num: Number, node: Node) {
	// 	// node.setComponent
	// 	// script.carema = main carema
	// 	// script.target = npc:Node.children(name:playertext)
	// 	// script mount in uitext:Node(RichText)
	// 	// 1 new uinode richtext into canvas
	// 	let richtext = instantiate(this.uiRichText);
	// 	richtext.setParent(find("/Canvas"));
	// 	richtext.name = `richText${num}`;
	// 	richtext.getComponent(RichText).string = `<outline color=#1d2b3e width=1><b>${num}</b></outline>`;
	// 	// 2 script mount in uinode
	// 	richtext.addComponent(headscript);
	// 	// set carema , target
	// 	let script = richtext.getComponent(headscript);
	// 	script.camera = this.mainCamera;
	// 	script.target = node.getChildByName("playertext");
	// 	script.distance = 5;
	// }
}
