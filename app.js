import { FortuneModel } from './model.js';
import { FortuneView } from './view.js';
import { FortuneController } from './controller.js';

// 初始化應用
const app = new FortuneController(new FortuneModel(), new FortuneView());