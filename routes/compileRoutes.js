import express from 'express';
import { compileCode } from '../controller/compileController.js';

const route = express.Router();

route.post('/',compileCode)
export default route