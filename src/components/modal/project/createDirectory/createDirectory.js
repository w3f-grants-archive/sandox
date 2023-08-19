import css from "./createDirectory.css";
css.install();

import Window from "../../../ui/window/window.js";
import {Tpl_createDirectory} from "./createDirectory.html";

/**
 * @param cfg				{Object}
 * @param cfg.onCreate		{Function}
 * @param cfg.parentNode	{Object}
 */
const createDirectory = cfg => new (class {
	#$window;
	#$createDirectory;
	#cfg;

	constructor() {
		this.#cfg = cfg;
		this.#$createDirectory = new Tpl_createDirectory({name: ''}, this);
		this.#$window = new Window({
			title: 'New directory',
			width: 340,
			height: 145,
			uiLock: true,
			$content: this.#$createDirectory
		});
		this.#$window.querySelector('input[name=name]').focus();
	};

	onKeyDown(e) {
		if (e.code === "Enter") {
			this.create();
		}
	}

	create() {
		if (this.#cfg.node.childNodes.find(item => item.title === this.#$createDirectory.model.data.name)) {
			alert('already exist');
			return;
		}
		this.#$window.close();
		this.#cfg.onCreate({
			name: this.#$createDirectory.model.data.name
		});
	}

	cancel() {
		this.#$window.close();
	}
})();


export default createDirectory;