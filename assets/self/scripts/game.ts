import { _decorator, Component, Node, Prefab, instantiate, Material, MeshRenderer, Color, Collider, find, Camera, Texture2D, Vec3 } from "cc";
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

	@property({ type: Texture2D })
	endlineTexture: Texture2D = null;

	npcLever = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
	npcColor = ["#bedbfeff", "#00bdffff", "#3ae474", "#8963ff", "#1eebff", "#017aff", "#0373ff", "#ff9bf7", "#ffb408", "#ff2eff", "#f8321f"];

	onLoad() {
		// set language 

		this.MAPINIT(14);

		this.BALLINIT(this.npcColor.length - 1);
		// add texture to role
		find("/player/player").getComponent(MeshRenderer).material.setProperty("albedoMap", this.textureBase[0]);
	}

	MAPINIT(num) {
		for (let i = 0; i < num; i++) {
			let road = instantiate(this.road);
			road.parent = this.roadParent;
			// road01
			// road.setPosition(0, 0, -i);
			// road02
			road.setPosition(0, 0, -i * 3);
			road.getChildByName("sideL").getComponent(MeshRenderer).material.setProperty("mainColor", new Color(146, 157, 243));
			road.getChildByName("sideR").getComponent(MeshRenderer).material.setProperty("mainColor", new Color(146, 157, 243));
			road.getChildByName("road").getComponent(MeshRenderer).material.setProperty("mainColor", new Color(211, 227, 243));
			if (i == num - 3) {
				road.getChildByName("road").getComponent(MeshRenderer).material.setProperty("albedoMap", this.endlineTexture);
				road.name = "endline";
			}
		}
		this.ENDLINEINIT();
		// init mutil color bridge
		for (let j = 0; j < this.textureBase.length; j++) {
			let road1 = instantiate(this.road);
			road1.parent = this.roadParent;
			//   position start -num*3
			road1.getChildByName("sideL").active = false;
			road1.getChildByName("sideR").active = false;
			road1.setPosition(0, 0, -num * 3 - j * 3);
			road1.name = "color_bridge" + Math.pow(2, j + 1);

			let child = road1.getChildByName("road");
			child.getComponent(MeshRenderer).material.setProperty("albedoMap", this.textureBase[j]);
			child.setWorldRotationFromEuler(0, -90, 90);

			child.setScale(new Vec3(0.05, 1, 1.5));
		}
	}

	ENDLINEINIT() {
		try {
		} catch (error) {
			console.error(error);
		}
	}
	BALLINIT(num) {
		for (let i = 0; i < num; i++) {
			let npc = instantiate(this.npc);
			npc.parent = this.npcParent;
			npc.setPosition(i % 2 == 0 ? 0.75 : -0.75, 3.5, -1 * (2.5 + 2.25 * i));
			npc.getComponent(Collider).attachedRigidBody.group = Math.pow(2, i + 1);
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
	}

	download() {
		console.log("download");
		// @ts-ignore
		linkToStore();
	}
}
