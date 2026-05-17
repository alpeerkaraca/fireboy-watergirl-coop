/* @ts-self-types="./ruffle_web.d.ts" */
import * as wasm from "./ruffle_web_bg.wasm";
import { __wbg_set_wasm } from "./ruffle_web_bg.js";

__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    IntoUnderlyingByteSource, IntoUnderlyingSink, IntoUnderlyingSource, RuffleHandle, RuffleInstanceBuilder, ZipWriter, global_init
} from "./ruffle_web_bg.js";
