import { callExternalInterface, copyToAudioBufferInterleaved } from './ruffle-imports.js';


export class IntoUnderlyingByteSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
}
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;

export class IntoUnderlyingSink {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;

export class IntoUnderlyingSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;

/**
 * r" An opaque handle to a `RuffleInstance` inside the pool.
 * r"
 * r" This type is exported to JS, and is used to interact with the library.
 */
export class RuffleHandle {
    static __wrap(ptr) {
        const obj = Object.create(RuffleHandle.prototype);
        obj.__wbg_ptr = ptr;
        RuffleHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RuffleHandleFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rufflehandle_free(ptr, 0);
    }
    /**
     * Returns the web AudioContext used by this player.
     * Returns `None` if the audio backend does not use Web Audio.
     * @returns {AudioContext | undefined}
     */
    audio_context() {
        const ret = wasm.rufflehandle_audio_context(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} name
     * @param {any[]} args
     * @returns {any}
     */
    call_exposed_callback(name, args) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(args, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rufflehandle_call_exposed_callback(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    clear_custom_menu_items() {
        wasm.rufflehandle_clear_custom_menu_items(this.__wbg_ptr);
    }
    destroy() {
        wasm.rufflehandle_destroy(this.__wbg_ptr);
    }
    /**
     * Switches to background tick mode, pausing the normal animation loop.
     * Use `tick_for_background` to advance the player while the tab is hidden.
     */
    enable_background_tick_mode() {
        wasm.rufflehandle_enable_background_tick_mode(this.__wbg_ptr);
    }
    /**
     * @returns {boolean}
     */
    has_focus() {
        const ret = wasm.rufflehandle_has_focus(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    is_playing() {
        const ret = wasm.rufflehandle_is_playing(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns whether the `simd128` target feature was enabled at build time.
     * This is intended to discriminate between the two WebAssembly module
     * versions, one of which uses WebAssembly extensions, and the other one
     * being "vanilla". `simd128` is used as proxy for most extensions, since
     * no other WebAssembly target feature is exposed to `cfg!`.
     * @returns {boolean}
     */
    static is_wasm_simd_used() {
        const ret = wasm.rufflehandle_is_wasm_simd_used();
        return ret !== 0;
    }
    /**
     * Play an arbitrary movie on this instance.
     *
     * This method should only be called once per player.
     * @param {Uint8Array} swf_data
     * @param {any} parameters
     * @param {string} swf_name
     */
    load_data(swf_data, parameters, swf_name) {
        const ptr0 = passStringToWasm0(swf_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rufflehandle_load_data(this.__wbg_ptr, swf_data, parameters, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    pause() {
        wasm.rufflehandle_pause(this.__wbg_ptr);
    }
    play() {
        wasm.rufflehandle_play(this.__wbg_ptr);
    }
    /**
     * @returns {any}
     */
    prepare_context_menu() {
        const ret = wasm.rufflehandle_prepare_context_menu(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    renderer_debug_info() {
        const ret = wasm.rufflehandle_renderer_debug_info(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    renderer_name() {
        const ret = wasm.rufflehandle_renderer_name(this.__wbg_ptr);
        return ret;
    }
    /**
     * Leaves background tick mode and reschedules the normal animation loop.
     * Does not tick the core itself.
     */
    restart_animation_loop() {
        wasm.rufflehandle_restart_animation_loop(this.__wbg_ptr);
    }
    /**
     * @param {number} index
     * @returns {Promise<void>}
     */
    run_context_menu_callback(index) {
        const ret = wasm.rufflehandle_run_context_menu_callback(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * @param {boolean} is_fullscreen
     */
    set_fullscreen(is_fullscreen) {
        wasm.rufflehandle_set_fullscreen(this.__wbg_ptr, is_fullscreen);
    }
    /**
     * @param {any} observer
     */
    set_trace_observer(observer) {
        wasm.rufflehandle_set_trace_observer(this.__wbg_ptr, observer);
    }
    /**
     * @param {number} value
     */
    set_volume(value) {
        wasm.rufflehandle_set_volume(this.__wbg_ptr, value);
    }
    /**
     * Simulates a key press — bypasses DOM events and injects directly into the player.
     * `code` should be a KeyboardEvent.code value like "KeyA", "KeyD", "KeyW", "ArrowLeft", etc.
     * This enables programmatic control of the Flash game (e.g., online multiplayer relay).
     * @param {string} code
     */
    simulate_key_down(code) {
        const ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.rufflehandle_simulate_key_down(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Simulates a key release — the counterpart to `simulate_key_down`.
     * @param {string} code
     */
    simulate_key_up(code) {
        const ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.rufflehandle_simulate_key_up(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Stream an arbitrary movie file from (presumably) the Internet.
     *
     * This method should only be called once per player.
     *
     * `parameters` are *extra* parameters to set on the LoaderInfo -
     * parameters from `movie_url` query parameters will be automatically added.
     * @param {string} movie_url
     * @param {any} parameters
     */
    stream_from(movie_url, parameters) {
        const ptr0 = passStringToWasm0(movie_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rufflehandle_stream_from(this.__wbg_ptr, ptr0, len0, parameters);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Ticks the game core once. Intended to be called from a Web Worker loop
     * after calling `enable_background_tick_mode`.
     * @param {number} timestamp
     */
    tick_for_background(timestamp) {
        wasm.rufflehandle_tick_for_background(this.__wbg_ptr, timestamp);
    }
    /**
     * @returns {number}
     */
    volume() {
        const ret = wasm.rufflehandle_volume(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) RuffleHandle.prototype[Symbol.dispose] = RuffleHandle.prototype.free;

export class RuffleInstanceBuilder {
    toJSON() {
        return {
        };
    }
    toString() {
        return JSON.stringify(this);
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RuffleInstanceBuilderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ruffleinstancebuilder_free(ptr, 0);
    }
    /**
     * @param {string} font_name
     * @param {Uint8Array} data
     */
    addFont(font_name, data) {
        const ptr0 = passStringToWasm0(font_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addFont(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} button
     * @param {number} keycode
     */
    addGamepadButtonMapping(button, keycode) {
        const ptr0 = passStringToWasm0(button, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addGamepadButtonMapping(this.__wbg_ptr, ptr0, len0, keycode);
    }
    /**
     * @param {string} host
     * @param {number} port
     * @param {string} proxy_url
     */
    addSocketProxy(host, port, proxy_url) {
        const ptr0 = passStringToWasm0(host, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(proxy_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addSocketProxy(this.__wbg_ptr, ptr0, len0, port, ptr1, len1);
    }
    /**
     * @param {RegExp} regexp
     * @param {string} replacement
     */
    addUrlRewriteRule(regexp, replacement) {
        const ptr0 = passStringToWasm0(replacement, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addUrlRewriteRule(this.__wbg_ptr, regexp, ptr0, len0);
    }
    /**
     * @param {HTMLElement} parent
     * @param {any} js_player
     * @returns {Promise<any>}
     */
    build(parent, js_player) {
        const ret = wasm.ruffleinstancebuilder_build(this.__wbg_ptr, parent, js_player);
        return ret;
    }
    constructor() {
        const ret = wasm.ruffleinstancebuilder_new();
        this.__wbg_ptr = ret;
        RuffleInstanceBuilderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {boolean} value
     */
    setAllowFullscreen(value) {
        wasm.ruffleinstancebuilder_setAllowFullscreen(this.__wbg_ptr, value);
    }
    /**
     * @param {string} value
     */
    setAllowNetworking(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setAllowNetworking(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setAllowScriptAccess(value) {
        wasm.ruffleinstancebuilder_setAllowScriptAccess(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    setBackgroundColor(value) {
        wasm.ruffleinstancebuilder_setBackgroundColor(this.__wbg_ptr, isLikeNone(value) ? Number.MAX_SAFE_INTEGER : (value) >>> 0);
    }
    /**
     * @param {string | null} [value]
     */
    setBaseUrl(value) {
        var ptr0 = isLikeNone(value) ? 0 : passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setBaseUrl(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setCompatibilityRules(value) {
        wasm.ruffleinstancebuilder_setCompatibilityRules(this.__wbg_ptr, value);
    }
    /**
     * @param {string[]} value
     */
    setCredentialAllowList(value) {
        const ptr0 = passArrayJsValueToWasm0(value, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setCredentialAllowList(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} default_name
     * @param {any[]} fonts
     */
    setDefaultFont(default_name, fonts) {
        const ptr0 = passStringToWasm0(default_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(fonts, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setDefaultFont(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} device_font_renderer
     */
    setDeviceFontRenderer(device_font_renderer) {
        const ptr0 = passStringToWasm0(device_font_renderer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setDeviceFontRenderer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setForceAlign(value) {
        wasm.ruffleinstancebuilder_setForceAlign(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setForceScale(value) {
        wasm.ruffleinstancebuilder_setForceScale(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    setFrameRate(value) {
        wasm.ruffleinstancebuilder_setFrameRate(this.__wbg_ptr, !isLikeNone(value), isLikeNone(value) ? 0 : value);
    }
    /**
     * @param {string} value
     */
    setLetterbox(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setLetterbox(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setLogLevel(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setLogLevel(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} value
     */
    setMaxExecutionDuration(value) {
        wasm.ruffleinstancebuilder_setMaxExecutionDuration(this.__wbg_ptr, value);
    }
    /**
     * @param {string} value
     */
    setOpenUrlMode(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setOpenUrlMode(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setPlayerRuntime(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setPlayerRuntime(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number | null} [value]
     */
    setPlayerVersion(value) {
        wasm.ruffleinstancebuilder_setPlayerVersion(this.__wbg_ptr, isLikeNone(value) ? 0xFFFFFF : value);
    }
    /**
     * @param {string | null} [value]
     */
    setPreferredRenderer(value) {
        var ptr0 = isLikeNone(value) ? 0 : passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setPreferredRenderer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setQuality(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setQuality(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setScale(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setScale(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} scrolling_behavior
     */
    setScrollingBehavior(scrolling_behavior) {
        const ptr0 = passStringToWasm0(scrolling_behavior, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setScrollingBehavior(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setShowMenu(value) {
        wasm.ruffleinstancebuilder_setShowMenu(this.__wbg_ptr, value);
    }
    /**
     * @param {string} value
     */
    setStageAlign(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setStageAlign(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setUpgradeToHttps(value) {
        wasm.ruffleinstancebuilder_setUpgradeToHttps(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setVolume(value) {
        wasm.ruffleinstancebuilder_setVolume(this.__wbg_ptr, value);
    }
    /**
     * @param {string | null} [value]
     */
    setWmode(value) {
        var ptr0 = isLikeNone(value) ? 0 : passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setWmode(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) RuffleInstanceBuilder.prototype[Symbol.dispose] = RuffleInstanceBuilder.prototype.free;

export class ZipWriter {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ZipWriterFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_zipwriter_free(ptr, 0);
    }
    /**
     * @param {string} name
     * @param {Uint8Array} bytes
     */
    addFile(name, bytes) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.zipwriter_addFile(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    constructor() {
        const ret = wasm.zipwriter_new();
        this.__wbg_ptr = ret;
        ZipWriterFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint8Array}
     */
    save() {
        const ret = wasm.zipwriter_save(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) ZipWriter.prototype[Symbol.dispose] = ZipWriter.prototype.free;

export function global_init() {
    wasm.global_init();
}
export function __wbg_Error_3639a60ed15f87e7(arg0, arg1) {
    const ret = Error(getStringFromWasm0(arg0, arg1));
    return ret;
}
export function __wbg_Window_e0df001eddf1d3fa(arg0) {
    const ret = arg0.Window;
    return ret;
}
export function __wbg_WorkerGlobalScope_d731e9136c6c49a0(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
}
export function __wbg___wbindgen_add_1eb3937c5ec40af7(arg0, arg1) {
    const ret = arg0 + arg1;
    return ret;
}
export function __wbg___wbindgen_boolean_get_c3dd5c39f1b5a12b(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? v : undefined;
    return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
}
export function __wbg___wbindgen_debug_string_07cb72cfcc952e2b(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg___wbindgen_in_2617fa76397620d3(arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
}
export function __wbg___wbindgen_is_function_2f0fd7ceb86e64c5(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
}
export function __wbg___wbindgen_is_null_066086be3abe9bb3(arg0) {
    const ret = arg0 === null;
    return ret;
}
export function __wbg___wbindgen_is_string_eddc07a3efad52e6(arg0) {
    const ret = typeof(arg0) === 'string';
    return ret;
}
export function __wbg___wbindgen_is_undefined_244a92c34d3b6ec0(arg0) {
    const ret = arg0 === undefined;
    return ret;
}
export function __wbg___wbindgen_number_get_dd6d69a6079f26f1(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
export function __wbg___wbindgen_string_get_965592073e5d848c(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg___wbindgen_throw_9c75d47bf9e7731e(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
}
export function __wbg__wbg_cb_unref_158e43e869788cdc(arg0) {
    arg0._wbg_cb_unref();
}
export function __wbg_a_91ae80b40db336e3(arg0) {
    const ret = arg0.a;
    return ret;
}
export function __wbg_activeTexture_b8a63f4b51a716a9(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
}
export function __wbg_activeTexture_df98f0476a8d2771(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
}
export function __wbg_actualBoundingBoxLeft_55a6cc00cb20bd00(arg0) {
    const ret = arg0.actualBoundingBoxLeft;
    return ret;
}
export function __wbg_actualBoundingBoxRight_c7220d0816daca11(arg0) {
    const ret = arg0.actualBoundingBoxRight;
    return ret;
}
export function __wbg_addColorStop_ba4aad6fba5ad929() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addColorStop(arg1, getStringFromWasm0(arg2, arg3));
}, arguments); }
export function __wbg_addEventListener_a95e75babfc4f5a3() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments); }
export function __wbg_addEventListener_c4121a5d487870cb() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
}, arguments); }
export function __wbg_addPath_136f7ce9242399a4(arg0, arg1, arg2) {
    arg0.addPath(arg1, arg2);
}
export function __wbg_appendChild_f8e0d8251588e3d1() { return handleError(function (arg0, arg1) {
    const ret = arg0.appendChild(arg1);
    return ret;
}, arguments); }
export function __wbg_arrayBuffer_87e3ac06d961f7a0() { return handleError(function (arg0) {
    const ret = arg0.arrayBuffer();
    return ret;
}, arguments); }
export function __wbg_assign_5cfdf94435d586c2() { return handleError(function (arg0, arg1, arg2) {
    arg0.assign(getStringFromWasm0(arg1, arg2));
}, arguments); }
export function __wbg_attachShader_18d37e6a1936237b(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
}
export function __wbg_attachShader_ce0935c038866500(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
}
export function __wbg_b_83c2042f45903f01(arg0) {
    const ret = arg0.b;
    return ret;
}
export function __wbg_baseURI_d60edfd363c4f726() { return handleError(function (arg0, arg1) {
    const ret = arg1.baseURI;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_beginQuery_57423f952238d42b(arg0, arg1, arg2) {
    arg0.beginQuery(arg1 >>> 0, arg2);
}
export function __wbg_beginRenderPass_373f34636d157c43() { return handleError(function (arg0, arg1) {
    const ret = arg0.beginRenderPass(arg1);
    return ret;
}, arguments); }
export function __wbg_bezierCurveTo_b1a834f4b5b56527(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.bezierCurveTo(arg1, arg2, arg3, arg4, arg5, arg6);
}
export function __wbg_bindAttribLocation_da2a20a747100943(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
}
export function __wbg_bindAttribLocation_eff3edd4a7818b2a(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
}
export function __wbg_bindBufferRange_a1e77739561685ab(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
}
export function __wbg_bindBuffer_a77c5c8cfa41f082(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
}
export function __wbg_bindBuffer_baae5a34a697efa6(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
}
export function __wbg_bindFramebuffer_5724927db7943266(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
}
export function __wbg_bindFramebuffer_fb9ea036031ad65f(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
}
export function __wbg_bindRenderbuffer_7e84f06129c44e35(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
}
export function __wbg_bindRenderbuffer_84ad4e2c1b3e50b2(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
}
export function __wbg_bindSampler_7259ad45d0345a23(arg0, arg1, arg2) {
    arg0.bindSampler(arg1 >>> 0, arg2);
}
export function __wbg_bindTexture_d4affe751f64c567(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
}
export function __wbg_bindTexture_f6ae9f2a0b12117c(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
}
export function __wbg_bindVertexArrayOES_b92f6239378bda5e(arg0, arg1) {
    arg0.bindVertexArrayOES(arg1);
}
export function __wbg_bindVertexArray_7dd4cc73efaa5b02(arg0, arg1) {
    arg0.bindVertexArray(arg1);
}
export function __wbg_blendColor_1bff6ee57033e115(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
}
export function __wbg_blendColor_cd047fc76ce752b0(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
}
export function __wbg_blendEquationSeparate_640fe636515888eb(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_blendEquationSeparate_b401e331f08b4a35(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_blendEquation_1dbe2aef71b7c075(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
}
export function __wbg_blendEquation_23d0345f106752af(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
}
export function __wbg_blendFuncSeparate_94c2b2c25a28ce3e(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
}
export function __wbg_blendFuncSeparate_e23244e1cc1ea452(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
}
export function __wbg_blendFunc_0836984f8f914802(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_blendFunc_eb0a56441acebc3e(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_blitFramebuffer_e7efe944be8d2b25(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
}
export function __wbg_body_6929614c20dfa7b0(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_body_9a319c5d4ea2d0d8(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_bufferData_27fc020b0a028600(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
}
export function __wbg_bufferData_3c4758594f55b1f4(arg0, arg1, arg2, arg3, arg4) {
    arg0.bufferData(arg1 >>> 0, getArrayU8FromWasm0(arg2, arg3), arg4 >>> 0);
}
export function __wbg_bufferData_611ad2765f706c85(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
}
export function __wbg_bufferData_9cef1bde6d07b2e7(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
}
export function __wbg_bufferData_d3f76b87295685cb(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
}
export function __wbg_bufferSubData_11b45dd61c816637(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
}
export function __wbg_bufferSubData_85fcbd0682ecfbe6(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
}
export function __wbg_buffer_9ee17426fe5a5d65(arg0) {
    const ret = arg0.buffer;
    return ret;
}
export function __wbg_button_9121eff76035e6f3(arg0) {
    const ret = arg0.button;
    return ret;
}
export function __wbg_buttons_c4b0491af6752e80(arg0) {
    const ret = arg0.buttons;
    return ret;
}
export function __wbg_byobRequest_178b64c09a0bee03(arg0) {
    const ret = arg0.byobRequest;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_byteLength_1f57c71e64ee0180(arg0) {
    const ret = arg0.byteLength;
    return ret;
}
export function __wbg_byteOffset_648d0af273024f3d(arg0) {
    const ret = arg0.byteOffset;
    return ret;
}
export function __wbg_c_5ae2e27e9a0083f9(arg0) {
    const ret = arg0.c;
    return ret;
}
export function __wbg_callExternalInterface_81dbff8863dba8c4() { return handleError(function (arg0, arg1, arg2, arg3) {
    var v0 = getArrayJsValueFromWasm0(arg2, arg3).slice();
    wasm.__wbindgen_free(arg2, arg3 * 4, 4);
    const ret = callExternalInterface(getStringFromWasm0(arg0, arg1), v0);
    return ret;
}, arguments); }
export function __wbg_callFSCommand_f1117b80477a0e5b() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.callFSCommand(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    return ret;
}, arguments); }
export function __wbg_call_a41d6421b30a32c5() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_call_add9e5a76382e668() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments); }
export function __wbg_cancelAnimationFrame_44f7b2b0c5c39988() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments); }
export function __wbg_clearBufferfv_f3f9113132f1fcf2(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_clearBufferiv_d2f793f8673febc9(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
}
export function __wbg_clearBufferuiv_7b92c9e5c5786765(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
}
export function __wbg_clearColor_5f4381baabb1ca19(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearColor(arg1, arg2, arg3, arg4);
}
export function __wbg_clearDepth_3856b90de145bade(arg0, arg1) {
    arg0.clearDepth(arg1);
}
export function __wbg_clearDepth_8bd1a97b6d503fee(arg0, arg1) {
    arg0.clearDepth(arg1);
}
export function __wbg_clearRect_4c8837d514ced7c2(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearRect(arg1, arg2, arg3, arg4);
}
export function __wbg_clearRect_ff21a25636146bdd(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearRect(arg1, arg2, arg3, arg4);
}
export function __wbg_clearStencil_13383248806f46ce(arg0, arg1) {
    arg0.clearStencil(arg1);
}
export function __wbg_clearStencil_1e7ff35a31d7916a(arg0, arg1) {
    arg0.clearStencil(arg1);
}
export function __wbg_clear_4ea2bcc891545cba(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
}
export function __wbg_clear_aba32769af482a1b(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
}
export function __wbg_click_55d5b1ef01462a6b(arg0) {
    arg0.click();
}
export function __wbg_clientHeight_b28e869e5fd49d9e(arg0) {
    const ret = arg0.clientHeight;
    return ret;
}
export function __wbg_clientWaitSync_5a73eb00e846b6e7(arg0, arg1, arg2, arg3) {
    const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
    return ret;
}
export function __wbg_clientWidth_48d7ce129509fbcc(arg0) {
    const ret = arg0.clientWidth;
    return ret;
}
export function __wbg_clip_13e7bb714b67d841(arg0, arg1, arg2) {
    arg0.clip(arg1, __wbindgen_enum_CanvasWindingRule[arg2]);
}
export function __wbg_clipboardData_1651ed0a9e8a1d12(arg0) {
    const ret = arg0.clipboardData;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_clipboard_ed0015a88db5242e(arg0) {
    const ret = arg0.clipboard;
    return ret;
}
export function __wbg_closePath_3e2030e12cc2efc3(arg0) {
    arg0.closePath();
}
export function __wbg_closeVirtualKeyboard_c0682659b2beb550(arg0) {
    arg0.closeVirtualKeyboard();
}
export function __wbg_close_1dd84b3ac8a28727() { return handleError(function (arg0) {
    const ret = arg0.close();
    return ret;
}, arguments); }
export function __wbg_close_63e009c5a75f5597() { return handleError(function (arg0) {
    arg0.close();
}, arguments); }
export function __wbg_close_931d0c62e2aab92c() { return handleError(function (arg0) {
    arg0.close();
}, arguments); }
export function __wbg_close_94697e2da7a3d00b() { return handleError(function (arg0, arg1) {
    arg0.close(arg1);
}, arguments); }
export function __wbg_close_de471367367aa5cb() { return handleError(function (arg0) {
    arg0.close();
}, arguments); }
export function __wbg_close_f1af935d7d7cec78() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.close(arg1, getStringFromWasm0(arg2, arg3));
}, arguments); }
export function __wbg_code_5ad85ce0561e0bb5(arg0, arg1) {
    const ret = arg1.code;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_code_be6f339819ebb2c4(arg0) {
    const ret = arg0.code;
    return ret;
}
export function __wbg_colorMask_360d34a1b73138ff(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
}
export function __wbg_colorMask_982ef6eda4803a18(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
}
export function __wbg_compileShader_50b61cd1b374d531(arg0, arg1) {
    arg0.compileShader(arg1);
}
export function __wbg_compileShader_bedba6a7869aa58d(arg0, arg1) {
    arg0.compileShader(arg1);
}
export function __wbg_compressedTexSubImage2D_79f87c415191cb5b(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
}
export function __wbg_compressedTexSubImage2D_a9f8677e599cf1d4(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
}
export function __wbg_compressedTexSubImage2D_eadf1d97b9426788(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
}
export function __wbg_compressedTexSubImage3D_101015bd664c7388(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
}
export function __wbg_compressedTexSubImage3D_fa1a576896bbdaa1(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
}
export function __wbg_configure_5f8d366dd0269ccb() { return handleError(function (arg0, arg1) {
    arg0.configure(arg1);
}, arguments); }
export function __wbg_configure_b39d6ec9527208fd() { return handleError(function (arg0, arg1) {
    arg0.configure(arg1);
}, arguments); }
export function __wbg_confirm_478c88bd23d6b541() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.confirm(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_connect_b0c6d44e9984ca8e() { return handleError(function (arg0, arg1) {
    const ret = arg0.connect(arg1);
    return ret;
}, arguments); }
export function __wbg_contains_89b774e57b8d9af4(arg0, arg1) {
    const ret = arg0.contains(arg1);
    return ret;
}
export function __wbg_copyBufferSubData_6091c9cc936cc895(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
}
export function __wbg_copyBufferToBuffer_293ca0a0d09a2280() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4);
}, arguments); }
export function __wbg_copyBufferToBuffer_321eb0198eb9c268() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
}, arguments); }
export function __wbg_copyBufferToTexture_c51059dc3ace2a4b() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.copyBufferToTexture(arg1, arg2, arg3);
}, arguments); }
export function __wbg_copyTexSubImage2D_5562ca0ba8f1ef9d(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
}
export function __wbg_copyTexSubImage2D_8950f8d58b0f216b(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
}
export function __wbg_copyTexSubImage3D_c947f39e5a487ca6(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
}
export function __wbg_copyTextureToBuffer_f5501895b13306e1() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.copyTextureToBuffer(arg1, arg2, arg3);
}, arguments); }
export function __wbg_copyTextureToTexture_facf8ecdb9559cb0() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.copyTextureToTexture(arg1, arg2, arg3);
}, arguments); }
export function __wbg_copyToAudioBufferInterleaved_1aa87e8d83ec135a(arg0, arg1, arg2) {
    copyToAudioBufferInterleaved(arg0, getArrayF32FromWasm0(arg1, arg2));
}
export function __wbg_copyTo_8253cadb93cb26bf(arg0, arg1, arg2) {
    const ret = arg0.copyTo(getArrayU8FromWasm0(arg1, arg2));
    return ret;
}
export function __wbg_createBindGroupLayout_f5bb5a31b2ac11bf() { return handleError(function (arg0, arg1) {
    const ret = arg0.createBindGroupLayout(arg1);
    return ret;
}, arguments); }
export function __wbg_createBindGroup_2290306cfa413c74(arg0, arg1) {
    const ret = arg0.createBindGroup(arg1);
    return ret;
}
export function __wbg_createBufferSource_3114c0146231317b() { return handleError(function (arg0) {
    const ret = arg0.createBufferSource();
    return ret;
}, arguments); }
export function __wbg_createBuffer_5e53e4a1f2e73720() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.createBuffer(arg1 >>> 0, arg2 >>> 0, arg3);
    return ret;
}, arguments); }
export function __wbg_createBuffer_68a72615fda09cc7(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createBuffer_88aa6747ef1e21b9(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createBuffer_e2b25dd1471f92f7() { return handleError(function (arg0, arg1) {
    const ret = arg0.createBuffer(arg1);
    return ret;
}, arguments); }
export function __wbg_createCommandEncoder_80578730e7314357(arg0, arg1) {
    const ret = arg0.createCommandEncoder(arg1);
    return ret;
}
export function __wbg_createElementNS_edf667dff759d26c() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    return ret;
}, arguments); }
export function __wbg_createElement_679cad83bb50288c() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_createFramebuffer_23e3175822f864b1(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createFramebuffer_c2281f7a61864dc1(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createLinearGradient_03b776cc085406fa(arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.createLinearGradient(arg1, arg2, arg3, arg4);
    return ret;
}
export function __wbg_createObjectURL_ff4de9deb3f8d0a6() { return handleError(function (arg0, arg1) {
    const ret = URL.createObjectURL(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_createPattern_0a31066e2bf5293e() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.createPattern(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_createPipelineLayout_0ef251301bed0c34(arg0, arg1) {
    const ret = arg0.createPipelineLayout(arg1);
    return ret;
}
export function __wbg_createProgram_932959b0abef3889(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createProgram_f56205ff1949c737(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createQuery_81134d4c0289efff(arg0) {
    const ret = arg0.createQuery();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createRadialGradient_370efd7ef3903eef() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    const ret = arg0.createRadialGradient(arg1, arg2, arg3, arg4, arg5, arg6);
    return ret;
}, arguments); }
export function __wbg_createRenderPipeline_f9f8aa23f50f8a9c() { return handleError(function (arg0, arg1) {
    const ret = arg0.createRenderPipeline(arg1);
    return ret;
}, arguments); }
export function __wbg_createRenderbuffer_64db55d91178c45e(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createRenderbuffer_e1819b7725afd261(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createSampler_27c37a8245da51a4(arg0, arg1) {
    const ret = arg0.createSampler(arg1);
    return ret;
}
export function __wbg_createSampler_89b9dfd6d2672bdd(arg0) {
    const ret = arg0.createSampler();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createShaderModule_eb21a131dfb0d4dc(arg0, arg1) {
    const ret = arg0.createShaderModule(arg1);
    return ret;
}
export function __wbg_createShader_195b98e391086cfb(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createShader_3ea04d442da25990(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createTexture_284160f981e0075f() { return handleError(function (arg0, arg1) {
    const ret = arg0.createTexture(arg1);
    return ret;
}, arguments); }
export function __wbg_createTexture_4663e5c6298a6e63(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createTexture_fa18817b4d49b838(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createVertexArrayOES_4861cd2ff06b47e8(arg0) {
    const ret = arg0.createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createVertexArray_565bc081065d93bc(arg0) {
    const ret = arg0.createVertexArray();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_createView_b09749798973b0f5() { return handleError(function (arg0, arg1) {
    const ret = arg0.createView(arg1);
    return ret;
}, arguments); }
export function __wbg_ctrlKey_7b559591aa96b86e(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
}
export function __wbg_cullFace_5858a2cdcb4d6678(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
}
export function __wbg_cullFace_bc83cd82280de65c(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
}
export function __wbg_currentTarget_bb872bc8f8c7bf95(arg0) {
    const ret = arg0.currentTarget;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_currentTime_6bf7644ca0c23256(arg0) {
    const ret = arg0.currentTime;
    return ret;
}
export function __wbg_d_57d7f1f74cd2e348(arg0) {
    const ret = arg0.d;
    return ret;
}
export function __wbg_data_4a14fad4c5f216c4(arg0) {
    const ret = arg0.data;
    return ret;
}
export function __wbg_data_a8804167f4745f97(arg0, arg1) {
    const ret = arg1.data;
    const ptr1 = passArray8ToWasm0(ret, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_decodeQueueSize_5200b1db355e36d1(arg0) {
    const ret = arg0.decodeQueueSize;
    return ret;
}
export function __wbg_decode_cd44a498840d76fe() { return handleError(function (arg0, arg1) {
    arg0.decode(arg1);
}, arguments); }
export function __wbg_deleteBuffer_340d7884968a79eb(arg0, arg1) {
    arg0.deleteBuffer(arg1);
}
export function __wbg_deleteBuffer_62138c27aeb02ca4(arg0, arg1) {
    arg0.deleteBuffer(arg1);
}
export function __wbg_deleteFramebuffer_9323713779c2b4c0(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
}
export function __wbg_deleteFramebuffer_d38950c53be54c1a(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
}
export function __wbg_deleteProgram_366007e5f2730fe6(arg0, arg1) {
    arg0.deleteProgram(arg1);
}
export function __wbg_deleteProgram_e06461448fa9fcd8(arg0, arg1) {
    arg0.deleteProgram(arg1);
}
export function __wbg_deleteQuery_9796d0734523df41(arg0, arg1) {
    arg0.deleteQuery(arg1);
}
export function __wbg_deleteRenderbuffer_74b7cdd428872286(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
}
export function __wbg_deleteRenderbuffer_c423ff0c6692949e(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
}
export function __wbg_deleteSampler_e4128c6eac83e159(arg0, arg1) {
    arg0.deleteSampler(arg1);
}
export function __wbg_deleteShader_79c915b05ea4ad40(arg0, arg1) {
    arg0.deleteShader(arg1);
}
export function __wbg_deleteShader_ccada46126dd1be7(arg0, arg1) {
    arg0.deleteShader(arg1);
}
export function __wbg_deleteSync_dfb44dc88ea1932e(arg0, arg1) {
    arg0.deleteSync(arg1);
}
export function __wbg_deleteTexture_6842b6a68ffbf944(arg0, arg1) {
    arg0.deleteTexture(arg1);
}
export function __wbg_deleteTexture_a65962a610fc9b21(arg0, arg1) {
    arg0.deleteTexture(arg1);
}
export function __wbg_deleteVertexArrayOES_4a422146dd3f144e(arg0, arg1) {
    arg0.deleteVertexArrayOES(arg1);
}
export function __wbg_deleteVertexArray_b61169e5f2c2ea0f(arg0, arg1) {
    arg0.deleteVertexArray(arg1);
}
export function __wbg_delete_9d505332259798bd() { return handleError(function (arg0, arg1, arg2) {
    delete arg0[getStringFromWasm0(arg1, arg2)];
}, arguments); }
export function __wbg_deltaMode_5590354c617f6678(arg0) {
    const ret = arg0.deltaMode;
    return ret;
}
export function __wbg_deltaY_02a7c4ae29ceeff0(arg0) {
    const ret = arg0.deltaY;
    return ret;
}
export function __wbg_depthFunc_82a306f59663800e(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
}
export function __wbg_depthFunc_a57c17fc802d1235(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
}
export function __wbg_depthMask_41d40746e5457105(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
}
export function __wbg_depthMask_c3c5be00f8a01171(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
}
export function __wbg_depthRange_1d642629ac479679(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
}
export function __wbg_depthRange_8cccdaa76e6e9aac(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
}
export function __wbg_destination_a7fb84721246ff2f(arg0) {
    const ret = arg0.destination;
    return ret;
}
export function __wbg_destroy_ebf527bbd86ae58b(arg0) {
    arg0.destroy();
}
export function __wbg_devicePixelRatio_3a60c85ae6458d68(arg0) {
    const ret = arg0.devicePixelRatio;
    return ret;
}
export function __wbg_disableVertexAttribArray_5bff9d65cf5682e0(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
}
export function __wbg_disableVertexAttribArray_9daed4d59eb86bc4(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
}
export function __wbg_disable_3827edd0ebc3906f(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
}
export function __wbg_disable_b0f20ab1b990a65d(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
}
export function __wbg_dispatchEvent_62b7eaa3eef4c3e8() { return handleError(function (arg0, arg1) {
    const ret = arg0.dispatchEvent(arg1);
    return ret;
}, arguments); }
export function __wbg_displayClipboardModal_a17f664d754d3709(arg0, arg1) {
    arg0.displayClipboardModal(arg1 !== 0);
}
export function __wbg_displayMessage_35e77cfff496fe01(arg0, arg1, arg2) {
    arg0.displayMessage(getStringFromWasm0(arg1, arg2));
}
export function __wbg_displayRestoredFromBfcacheMessage_34e3e5032da0dfc4(arg0) {
    arg0.displayRestoredFromBfcacheMessage();
}
export function __wbg_displayRootMovieDownloadFailedMessage_15b60b3026653921(arg0, arg1, arg2, arg3) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg2;
        deferred0_1 = arg3;
        arg0.displayRootMovieDownloadFailedMessage(arg1 !== 0, getStringFromWasm0(arg2, arg3));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
}
export function __wbg_displayUnsupportedVideo_52b5ecce3671b51b(arg0, arg1, arg2) {
    arg0.displayUnsupportedVideo(getStringFromWasm0(arg1, arg2));
}
export function __wbg_document_69bb6a2f7927d532(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_done_b1afd6201ac045e0(arg0) {
    const ret = arg0.done;
    return ret;
}
export function __wbg_drawArraysInstancedANGLE_e78464097a007492(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
}
export function __wbg_drawArraysInstanced_12b5ac123880f1e5(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
}
export function __wbg_drawArrays_c160958534316d96(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
}
export function __wbg_drawArrays_d5a5cd7c06a36bac(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
}
export function __wbg_drawBuffersWEBGL_d978b4ef20df9e6e(arg0, arg1) {
    arg0.drawBuffersWEBGL(arg1);
}
export function __wbg_drawBuffers_5038e68debaf8a7b(arg0, arg1) {
    arg0.drawBuffers(arg1);
}
export function __wbg_drawElementsInstancedANGLE_bd601b8a575a0d76(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
}
export function __wbg_drawElementsInstanced_a08ae5f7e875b98e(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
}
export function __wbg_drawElements_d671a6f35766a1f5(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
}
export function __wbg_drawImage_3cc3374fb41535dd() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.drawImage(arg1, arg2, arg3);
}, arguments); }
export function __wbg_drawIndexed_a60a41b2b0ffdadf(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
}
export function __wbg_drawingBufferHeight_ed1c3c49d12365f1(arg0) {
    const ret = arg0.drawingBufferHeight;
    return ret;
}
export function __wbg_drawingBufferWidth_bbb037c303a2a7a0(arg0) {
    const ret = arg0.drawingBufferWidth;
    return ret;
}
export function __wbg_e_07161042f10f7624(arg0) {
    const ret = arg0.e;
    return ret;
}
export function __wbg_enableVertexAttribArray_16defb159a05d60a(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
}
export function __wbg_enableVertexAttribArray_7d4003fc258faa30(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
}
export function __wbg_enable_b4b249f77a13393c(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
}
export function __wbg_enable_f95f0e6bcdef4ad4(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
}
export function __wbg_endQuery_62edf1b38fcc333e(arg0, arg1) {
    arg0.endQuery(arg1 >>> 0);
}
export function __wbg_end_c269ebd826210ed1(arg0) {
    arg0.end();
}
export function __wbg_enqueue_6c7cd543c0f3828e() { return handleError(function (arg0, arg1) {
    arg0.enqueue(arg1);
}, arguments); }
export function __wbg_entries_bb9843ba73dc70d6(arg0) {
    const ret = Object.entries(arg0);
    return ret;
}
export function __wbg_error_a6fa202b58aa1cd3(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
}
export function __wbg_execCommand_9fb7055fb2d6583d() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.execCommand(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_f_d287d930c6641dcc(arg0) {
    const ret = arg0.f;
    return ret;
}
export function __wbg_features_a239101d9dc0c094(arg0) {
    const ret = arg0.features;
    return ret;
}
export function __wbg_features_cb4af4c41720c5e5(arg0) {
    const ret = arg0.features;
    return ret;
}
export function __wbg_fenceSync_09fc77121a1d209f(arg0, arg1, arg2) {
    const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_fetch_f36631298df17a02(arg0, arg1) {
    const ret = arg0.fetch(arg1);
    return ret;
}
export function __wbg_files_a01b423b50707815(arg0) {
    const ret = arg0.files;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_fillRect_9219f775d7e8e73e(arg0, arg1, arg2, arg3, arg4) {
    arg0.fillRect(arg1, arg2, arg3, arg4);
}
export function __wbg_fillText_6d1a4715d8d662d0() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
}, arguments); }
export function __wbg_fill_5a24d889bd878933(arg0, arg1, arg2) {
    arg0.fill(arg1, __wbindgen_enum_CanvasWindingRule[arg2]);
}
export function __wbg_finish_073e2bc456a4b625(arg0) {
    const ret = arg0.finish();
    return ret;
}
export function __wbg_finish_e43b1b48427f2db0(arg0, arg1) {
    const ret = arg0.finish(arg1);
    return ret;
}
export function __wbg_flush_0d413f47f0da2a94(arg0) {
    arg0.flush();
}
export function __wbg_flush_8de681f5248a68b9(arg0) {
    arg0.flush();
}
export function __wbg_focus_6762263125dcbbcf() { return handleError(function (arg0, arg1) {
    arg0.focus(arg1);
}, arguments); }
export function __wbg_focus_6fb3e144d2c12c7f() { return handleError(function (arg0) {
    arg0.focus();
}, arguments); }
export function __wbg_fontBoundingBoxAscent_affa96c213c0488c(arg0) {
    const ret = arg0.fontBoundingBoxAscent;
    return ret;
}
export function __wbg_fontBoundingBoxDescent_a9a41cad7bb276a8(arg0) {
    const ret = arg0.fontBoundingBoxDescent;
    return ret;
}
export function __wbg_format_446db0c67d4487b5(arg0) {
    const ret = arg0.format;
    return isLikeNone(ret) ? 24 : ((__wbindgen_enum_VideoPixelFormat.indexOf(ret) + 1 || 24) - 1);
}
export function __wbg_framebufferRenderbuffer_752640e03bd3d58a(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
}
export function __wbg_framebufferRenderbuffer_9f6574538b6fa528(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
}
export function __wbg_framebufferTexture2D_474e2bcbb9e69c73(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
}
export function __wbg_framebufferTexture2D_a4ba52d04ab93226(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
}
export function __wbg_framebufferTextureLayer_032548119c55333f(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
}
export function __wbg_framebufferTextureMultiviewOVR_3568fd6a3321abd2(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
}
export function __wbg_fromEntries_e9b52c3928464f81() { return handleError(function (arg0) {
    const ret = Object.fromEntries(arg0);
    return ret;
}, arguments); }
export function __wbg_frontFace_040302cde4275976(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
}
export function __wbg_frontFace_a50be5df32f82489(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
}
export function __wbg_getAttribLocation_60f2b86a8668c51e(arg0, arg1, arg2, arg3) {
    const ret = arg0.getAttribLocation(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
}
export function __wbg_getBufferSubData_cfc147848ea9a204(arg0, arg1, arg2, arg3) {
    arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
}
export function __wbg_getContext_5d4707454276e47f() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_getContext_6afffb087ba015e7() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_getContext_6ce4459fd5f498a9() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_getContext_f17252002286474d() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_getCurrentTexture_7edbea16b438c9fc() { return handleError(function (arg0) {
    const ret = arg0.getCurrentTexture();
    return ret;
}, arguments); }
export function __wbg_getData_9557835f7d36eb7f() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.getData(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_getError_db99f4c7ea234014(arg0) {
    const ret = arg0.getError();
    return ret;
}
export function __wbg_getExtension_2d682233c0ac7827() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_getExtension_6e629f74e6223ae8() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_getGamepads_015e883edab3d776() { return handleError(function (arg0) {
    const ret = arg0.getGamepads();
    return ret;
}, arguments); }
export function __wbg_getImageData_35fd0d058765eff4() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.getImageData(arg1, arg2, arg3, arg4);
    return ret;
}, arguments); }
export function __wbg_getIndexedParameter_0dba1754b6a586e8() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
    return ret;
}, arguments); }
export function __wbg_getMappedRange_191c0084744858f0() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getMappedRange(arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_getObjectId_07fd15ece4b45992(arg0, arg1) {
    const ret = arg1.getObjectId();
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_getParameter_4249f979fb9b2034() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments); }
export function __wbg_getParameter_8154b8b3c2249843() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments); }
export function __wbg_getPreferredCanvasFormat_56e30944cc798353(arg0) {
    const ret = arg0.getPreferredCanvasFormat();
    return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
}
export function __wbg_getProgramInfoLog_88521473263984bd(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_getProgramInfoLog_f93553deba23cccc(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_getProgramParameter_3a2cbacda36e0528(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
}
export function __wbg_getProgramParameter_a00a3869258b814e(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
}
export function __wbg_getQueryParameter_417092b320c7d84a(arg0, arg1, arg2) {
    const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
    return ret;
}
export function __wbg_getRandomValues_3f44b700395062e5() { return handleError(function (arg0, arg1) {
    globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
}, arguments); }
export function __wbg_getReader_9facd4f899beac89() { return handleError(function (arg0) {
    const ret = arg0.getReader();
    return ret;
}, arguments); }
export function __wbg_getRootNode_b85e042d0cfb800f(arg0) {
    const ret = arg0.getRootNode();
    return ret;
}
export function __wbg_getShaderInfoLog_25f08216f6d590f6(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_getShaderInfoLog_b7bfd2186bdd39a2(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_getShaderParameter_96635c982831e95b(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
}
export function __wbg_getShaderParameter_d7c32caac818946c(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
}
export function __wbg_getSupportedExtensions_362130232fc99d22(arg0) {
    const ret = arg0.getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_getSupportedProfiles_df08bd5d0fab9196(arg0) {
    const ret = arg0.getSupportedProfiles();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_getSyncParameter_e41eea811d52b07c(arg0, arg1, arg2) {
    const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
    return ret;
}
export function __wbg_getTime_e599bee315e19eba(arg0) {
    const ret = arg0.getTime();
    return ret;
}
export function __wbg_getTimezoneOffset_d843b3968046e734(arg0) {
    const ret = arg0.getTimezoneOffset();
    return ret;
}
export function __wbg_getUniformBlockIndex_0cfb97b93f26175b(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
}
export function __wbg_getUniformLocation_1d6a81965f118597(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_getUniformLocation_484ff1965b8e30f4(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_get_41476db20fef99a8() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_get_472f47b0525d6e68() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1[getStringFromWasm0(arg2, arg3)];
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_get_652f640b3b0b6e3e(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
}
export function __wbg_get_6aaf7ff105162d98() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.get(getStringFromWasm0(arg2, arg3));
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_get_a6a7ef761f5bd232(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_get_d7ae012434eecc9e(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_get_done_2088079830fb242e(arg0) {
    const ret = arg0.done;
    return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
}
export function __wbg_get_unchecked_be562b1421656321(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
}
export function __wbg_get_value_52f4b39f58a812ed(arg0) {
    const ret = arg0.value;
    return ret;
}
export function __wbg_gpu_7c0927abcc96dd45(arg0) {
    const ret = arg0.gpu;
    return ret;
}
export function __wbg_has_3a6f31f647e0ba22() { return handleError(function (arg0, arg1) {
    const ret = Reflect.has(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_has_abf74d2b4f3e578e(arg0, arg1, arg2) {
    const ret = arg0.has(getStringFromWasm0(arg1, arg2));
    return ret;
}
export function __wbg_headers_54559890f6876c99(arg0) {
    const ret = arg0.headers;
    return ret;
}
export function __wbg_headers_de17f740bce997ae(arg0) {
    const ret = arg0.headers;
    return ret;
}
export function __wbg_height_1d58cd47763299ec(arg0) {
    const ret = arg0.height;
    return ret;
}
export function __wbg_height_900decaf28c42054(arg0) {
    const ret = arg0.height;
    return ret;
}
export function __wbg_height_cabad5f3c8f25559(arg0) {
    const ret = arg0.height;
    return ret;
}
export function __wbg_height_f036cb27636625f6(arg0) {
    const ret = arg0.height;
    return ret;
}
export function __wbg_host_4c1f4b789926d154(arg0) {
    const ret = arg0.host;
    return ret;
}
export function __wbg_href_53712054c453ff9f() { return handleError(function (arg0, arg1) {
    const ret = arg1.href;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_includes_169ece041f52c741(arg0, arg1, arg2) {
    const ret = arg0.includes(arg1, arg2);
    return ret;
}
export function __wbg_instanceof_ArrayBuffer_eab9f28fbec23477(arg0) {
    let result;
    try {
        result = arg0 instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_CanvasRenderingContext2d_b433938013de3a1e(arg0) {
    let result;
    try {
        result = arg0 instanceof CanvasRenderingContext2D;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Error_5e21755e9d9cbee5(arg0) {
    let result;
    try {
        result = arg0 instanceof Error;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_GamepadButton_8c744db616c78f92(arg0) {
    let result;
    try {
        result = arg0 instanceof GamepadButton;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Gamepad_8432edf7ba4c6cf2(arg0) {
    let result;
    try {
        result = arg0 instanceof Gamepad;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_GpuAdapter_5e451ad6596e2784(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUAdapter;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_GpuCanvasContext_f70ee27f49f4f884(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUCanvasContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlAnchorElement_c1af389504decfa9(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLAnchorElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlButtonElement_6c7fed069c771fa5(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLButtonElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlCanvasElement_0ac74d5643067956(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlDocument_d90878f58c812d12(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLDocument;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlElement_ca58d4b8fb43f464(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlFormElement_85f3b1cc8568aa8b(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLFormElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlInputElement_d829a3cb28c8ad8f(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLInputElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_HtmlTextAreaElement_9536984478b3941d(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLTextAreaElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Node_6aeb01a4887fa16b(arg0) {
    let result;
    try {
        result = arg0 instanceof Node;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_OffscreenCanvasRenderingContext2d_23f7ce578afab75f(arg0) {
    let result;
    try {
        result = arg0 instanceof OffscreenCanvasRenderingContext2D;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Response_370b83aa6c17e88a(arg0) {
    let result;
    try {
        result = arg0 instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_ShadowRoot_52c7974a7a27fd4c(arg0) {
    let result;
    try {
        result = arg0 instanceof ShadowRoot;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_WebGl2RenderingContext_fbfd73b8b9465e2d(arg0) {
    let result;
    try {
        result = arg0 instanceof WebGL2RenderingContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_WebGlRenderingContext_357861107f42b13c(arg0) {
    let result;
    try {
        result = arg0 instanceof WebGLRenderingContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Window_4153c1818a1c0c0b(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_invalidateFramebuffer_f64698548fae8275() { return handleError(function (arg0, arg1, arg2) {
    arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
}, arguments); }
export function __wbg_inverse_af7510603c7ee4c0(arg0) {
    const ret = arg0.inverse();
    return ret;
}
export function __wbg_isActive_ae8b13cab9702e7c(arg0) {
    const ret = arg0.isActive;
    return ret;
}
export function __wbg_isArray_c6c6ef8308995bcf(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
}
export function __wbg_isVirtualKeyboardFocused_98e7b132a03df14b(arg0) {
    const ret = arg0.isVirtualKeyboardFocused();
    return ret;
}
export function __wbg_is_e9826d240a8d86ea(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
}
export function __wbg_key_2e79b9dbd4550ab3(arg0, arg1) {
    const ret = arg1.key;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_label_0abc44bf8d3a3e99(arg0, arg1) {
    const ret = arg1.label;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_language_2f20c76888b8bc2e(arg0, arg1) {
    const ret = arg1.language;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_lastModified_592998a913e0328b(arg0) {
    const ret = arg0.lastModified;
    return ret;
}
export function __wbg_length_0a6ce016dc1460b0(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_length_1a58ded22d95ac5d(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_length_ba3c032602efe310(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_length_f3b8e74fce8baae2(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_limits_764638d29dec49d4(arg0) {
    const ret = arg0.limits;
    return ret;
}
export function __wbg_limits_ea7aa423b3575ea6(arg0) {
    const ret = arg0.limits;
    return ret;
}
export function __wbg_lineTo_38170d4d8d32765f(arg0, arg1, arg2) {
    arg0.lineTo(arg1, arg2);
}
export function __wbg_linkProgram_76940d17b54d375b(arg0, arg1) {
    arg0.linkProgram(arg1);
}
export function __wbg_linkProgram_ba72b321b45bac4c(arg0, arg1) {
    arg0.linkProgram(arg1);
}
export function __wbg_localStorage_11b5275c3ad2bab7() { return handleError(function (arg0) {
    const ret = arg0.localStorage;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_location_0f18c0567ac29e07(arg0) {
    const ret = arg0.location;
    return ret;
}
export function __wbg_location_d080430e3f643f93(arg0) {
    const ret = arg0.location;
    return ret;
}
export function __wbg_log_0c201ade58bb55e1(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
}
export function __wbg_log_ce2c4456b290c5e7(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.log(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
}
export function __wbg_mapAsync_1be2f9e8f464f69e(arg0, arg1, arg2, arg3) {
    const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
    return ret;
}
export function __wbg_mark_b4d943f3bc2d2404(arg0, arg1) {
    performance.mark(getStringFromWasm0(arg0, arg1));
}
export function __wbg_maxBindGroups_c439abd1498fc924(arg0) {
    const ret = arg0.maxBindGroups;
    return ret;
}
export function __wbg_maxBindingsPerBindGroup_186292f383c7b982(arg0) {
    const ret = arg0.maxBindingsPerBindGroup;
    return ret;
}
export function __wbg_maxBufferSize_87b76aa2842d0e8e(arg0) {
    const ret = arg0.maxBufferSize;
    return ret;
}
export function __wbg_maxColorAttachmentBytesPerSample_2ba81ae1e2742413(arg0) {
    const ret = arg0.maxColorAttachmentBytesPerSample;
    return ret;
}
export function __wbg_maxColorAttachments_1ec5191521ef0d22(arg0) {
    const ret = arg0.maxColorAttachments;
    return ret;
}
export function __wbg_maxComputeInvocationsPerWorkgroup_ee67a82206d412d2(arg0) {
    const ret = arg0.maxComputeInvocationsPerWorkgroup;
    return ret;
}
export function __wbg_maxComputeWorkgroupSizeX_0b2b16b802f85a14(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeX;
    return ret;
}
export function __wbg_maxComputeWorkgroupSizeY_00d8aeba9472fdb2(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeY;
    return ret;
}
export function __wbg_maxComputeWorkgroupSizeZ_351fd9dab4c07321(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeZ;
    return ret;
}
export function __wbg_maxComputeWorkgroupStorageSize_881d2b675868eb68(arg0) {
    const ret = arg0.maxComputeWorkgroupStorageSize;
    return ret;
}
export function __wbg_maxComputeWorkgroupsPerDimension_21c223eca6bd6d6b(arg0) {
    const ret = arg0.maxComputeWorkgroupsPerDimension;
    return ret;
}
export function __wbg_maxDynamicStorageBuffersPerPipelineLayout_7155d3f7a514a157(arg0) {
    const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
    return ret;
}
export function __wbg_maxDynamicUniformBuffersPerPipelineLayout_76dee9028eaa5322(arg0) {
    const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
    return ret;
}
export function __wbg_maxSampledTexturesPerShaderStage_78d018dcd0b999c8(arg0) {
    const ret = arg0.maxSampledTexturesPerShaderStage;
    return ret;
}
export function __wbg_maxSamplersPerShaderStage_0e3ad4d70194a7c2(arg0) {
    const ret = arg0.maxSamplersPerShaderStage;
    return ret;
}
export function __wbg_maxStorageBufferBindingSize_30a1e5c0b8fcd992(arg0) {
    const ret = arg0.maxStorageBufferBindingSize;
    return ret;
}
export function __wbg_maxStorageBuffersPerShaderStage_d77703e9a0d5960e(arg0) {
    const ret = arg0.maxStorageBuffersPerShaderStage;
    return ret;
}
export function __wbg_maxStorageTexturesPerShaderStage_c09e7daf1141067e(arg0) {
    const ret = arg0.maxStorageTexturesPerShaderStage;
    return ret;
}
export function __wbg_maxTextureArrayLayers_44d8badedb4e5245(arg0) {
    const ret = arg0.maxTextureArrayLayers;
    return ret;
}
export function __wbg_maxTextureDimension1D_6d1ff8e56b9cf824(arg0) {
    const ret = arg0.maxTextureDimension1D;
    return ret;
}
export function __wbg_maxTextureDimension2D_5ef5830837d92b7c(arg0) {
    const ret = arg0.maxTextureDimension2D;
    return ret;
}
export function __wbg_maxTextureDimension3D_cfdebbf2b20068cd(arg0) {
    const ret = arg0.maxTextureDimension3D;
    return ret;
}
export function __wbg_maxUniformBufferBindingSize_63dc0c714d2fcebe(arg0) {
    const ret = arg0.maxUniformBufferBindingSize;
    return ret;
}
export function __wbg_maxUniformBuffersPerShaderStage_a52382f8a7dfc816(arg0) {
    const ret = arg0.maxUniformBuffersPerShaderStage;
    return ret;
}
export function __wbg_maxVertexAttributes_4c83ac8c1d442e1c(arg0) {
    const ret = arg0.maxVertexAttributes;
    return ret;
}
export function __wbg_maxVertexBufferArrayStride_955879053ec672f8(arg0) {
    const ret = arg0.maxVertexBufferArrayStride;
    return ret;
}
export function __wbg_maxVertexBuffers_0bb014e62f100c6c(arg0) {
    const ret = arg0.maxVertexBuffers;
    return ret;
}
export function __wbg_measureText_29ad84bd45ab9fce() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.measureText(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_measure_84362959e621a2c1() { return handleError(function (arg0, arg1, arg2, arg3) {
    let deferred0_0;
    let deferred0_1;
    let deferred1_0;
    let deferred1_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        deferred1_0 = arg2;
        deferred1_1 = arg3;
        performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}, arguments); }
export function __wbg_message_609b498da776cb30(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_message_d5628ca19de920d3(arg0) {
    const ret = arg0.message;
    return ret;
}
export function __wbg_metaKey_ef659f8598121617(arg0) {
    const ret = arg0.metaKey;
    return ret;
}
export function __wbg_minStorageBufferOffsetAlignment_6ed09762e603ac3a(arg0) {
    const ret = arg0.minStorageBufferOffsetAlignment;
    return ret;
}
export function __wbg_minUniformBufferOffsetAlignment_02579f79815cf83c(arg0) {
    const ret = arg0.minUniformBufferOffsetAlignment;
    return ret;
}
export function __wbg_moveTo_775205633ddeda4c(arg0, arg1, arg2) {
    arg0.moveTo(arg1, arg2);
}
export function __wbg_name_bf92195f4668ab6e(arg0) {
    const ret = arg0.name;
    return ret;
}
export function __wbg_name_d6396501ec1b2634(arg0, arg1) {
    const ret = arg1.name;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_navigator_83daf29f5beb4064(arg0) {
    const ret = arg0.navigator;
    return ret;
}
export function __wbg_navigator_f3468c6dc9006b7c(arg0) {
    const ret = arg0.navigator;
    return ret;
}
export function __wbg_new_0_e486ec9936f7edbf() {
    const ret = new Date();
    return ret;
}
export function __wbg_new_227d7c05414eb861() {
    const ret = new Error();
    return ret;
}
export function __wbg_new_2fad8ca02fd00684() {
    const ret = new Object();
    return ret;
}
export function __wbg_new_3baa8d9866155c79() {
    const ret = new Array();
    return ret;
}
export function __wbg_new_3eec9936293dfbe5() { return handleError(function (arg0) {
    const ret = new VideoDecoder(arg0);
    return ret;
}, arguments); }
export function __wbg_new_71b820e9c1f9ee88() { return handleError(function (arg0, arg1) {
    const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments); }
export function __wbg_new_8391b5e553d0a96c() { return handleError(function () {
    const ret = new DOMMatrix();
    return ret;
}, arguments); }
export function __wbg_new_8454eee672b2ba6e(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
}
export function __wbg_new_8fe895d1008898df() { return handleError(function () {
    const ret = new Path2D();
    return ret;
}, arguments); }
export function __wbg_new_a6b46eaf9085fbeb() { return handleError(function () {
    const ret = new lAudioContext();
    return ret;
}, arguments); }
export function __wbg_new_ad3fcf44d8adc659() { return handleError(function (arg0) {
    const ret = new EncodedVideoChunk(arg0);
    return ret;
}, arguments); }
export function __wbg_new_b47e026ba742fe65(arg0) {
    const ret = new Date(arg0);
    return ret;
}
export function __wbg_new_c9ea13ea803a692e(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
}
export function __wbg_new_e6faaf6e832d3086() { return handleError(function (arg0, arg1) {
    const ret = new OffscreenCanvas(arg0 >>> 0, arg1 >>> 0);
    return ret;
}, arguments); }
export function __wbg_new_eb8acd9352be84ba(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return wasm_bindgen__convert__closures_____invoke__h1799a4864efc802e(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = 0;
    }
}
export function __wbg_new_f72d941edde9004a() { return handleError(function () {
    const ret = new FileReader();
    return ret;
}, arguments); }
export function __wbg_new_from_slice_5a173c243af2e823(arg0, arg1) {
    const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
    return ret;
}
export function __wbg_new_typed_1137602701dc87d4(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return wasm_bindgen__convert__closures_____invoke__h1799a4864efc802e(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = 0;
    }
}
export function __wbg_new_with_array64_ebed6c818adead9a() { return handleError(function (arg0, arg1) {
    const ret = new DOMMatrix(getArrayF64FromWasm0(arg0, arg1));
    return ret;
}, arguments); }
export function __wbg_new_with_buffer_source_sequence_and_options_ae382d18b4062cb9() { return handleError(function (arg0, arg1) {
    const ret = new Blob(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_new_with_byte_offset_and_length_643e5e9e2fb6b1ad(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
}
export function __wbg_new_with_event_init_dict_e7e35e245afe2c0f() { return handleError(function (arg0, arg1, arg2) {
    const ret = new CloseEvent(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
}, arguments); }
export function __wbg_new_with_str_and_init_da311e12114f4d1e() { return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
}, arguments); }
export function __wbg_new_with_sw_5e6d952cd14c2540() { return handleError(function (arg0, arg1) {
    const ret = new ImageData(arg0 >>> 0, arg1 >>> 0);
    return ret;
}, arguments); }
export function __wbg_new_with_u8_array_sequence_842a392b7fb38231() { return handleError(function (arg0) {
    const ret = new Blob(arg0);
    return ret;
}, arguments); }
export function __wbg_new_with_u8_array_sequence_and_options_c6e4ee91abe99c28() { return handleError(function (arg0, arg1) {
    const ret = new Blob(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_new_with_u8_clamped_array_a04fccdf314e082f() { return handleError(function (arg0, arg1, arg2) {
    const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0);
    return ret;
}, arguments); }
export function __wbg_next_aacee310bcfe6461() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments); }
export function __wbg_now_e7c6795a7f81e10f(arg0) {
    const ret = arg0.now();
    return ret;
}
export function __wbg_of_96154841226db59c(arg0, arg1) {
    const ret = Array.of(arg0, arg1);
    return ret;
}
export function __wbg_of_cc555051dc9558d3(arg0) {
    const ret = Array.of(arg0);
    return ret;
}
export function __wbg_offsetX_82fc22093c7c8f69(arg0) {
    const ret = arg0.offsetX;
    return ret;
}
export function __wbg_offsetY_85ccf92600a65e15(arg0) {
    const ret = arg0.offsetY;
    return ret;
}
export function __wbg_ok_b6a9978bb5f66f33(arg0) {
    const ret = arg0.ok;
    return ret;
}
export function __wbg_onCallbackAvailable_ac46190246d68d25(arg0, arg1, arg2) {
    arg0.onCallbackAvailable(getStringFromWasm0(arg1, arg2));
}
export function __wbg_onSubmittedWorkDone_7d532ba1f20a64b3(arg0) {
    const ret = arg0.onSubmittedWorkDone();
    return ret;
}
export function __wbg_openVirtualKeyboard_795acf3188ac509a(arg0) {
    arg0.openVirtualKeyboard();
}
export function __wbg_open_57a414ebb14ce52f() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_ownKeys_dd2c03c9cc6df40f() { return handleError(function (arg0) {
    const ret = Reflect.ownKeys(arg0);
    return ret;
}, arguments); }
export function __wbg_panic_833e996051509869(arg0, arg1) {
    arg0.panic(arg1);
}
export function __wbg_parentElement_3173449d6895ac49(arg0) {
    const ret = arg0.parentElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_performance_3fcf6e32a7e1ed0a(arg0) {
    const ret = arg0.performance;
    return ret;
}
export function __wbg_persisted_e198bc1b0ea7bac3(arg0) {
    const ret = arg0.persisted;
    return ret;
}
export function __wbg_pixelStorei_7feec34442803b9d(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
}
export function __wbg_pixelStorei_c1200ded9741bf0c(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
}
export function __wbg_platform_fc7c0edb3b7904b1() { return handleError(function (arg0, arg1) {
    const ret = arg1.platform;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_pointerId_18e43d42a0114b4d(arg0) {
    const ret = arg0.pointerId;
    return ret;
}
export function __wbg_polygonOffset_47749ec8af0d2b41(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
}
export function __wbg_polygonOffset_b95607b79068742b(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
}
export function __wbg_pressed_f3474d2085f7d3f1(arg0) {
    const ret = arg0.pressed;
    return ret;
}
export function __wbg_preventDefault_2c34c219d9b04b86(arg0) {
    arg0.preventDefault();
}
export function __wbg_protocol_c716aad919991716() { return handleError(function (arg0, arg1) {
    const ret = arg1.protocol;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments); }
export function __wbg_prototypesetcall_fd4050e806e1d519(arg0, arg1, arg2) {
    Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
}
export function __wbg_push_60a5366c0bb22a7d(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
}
export function __wbg_putImageData_53885fb2ac0fd589() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.putImageData(arg1, arg2, arg3);
}, arguments); }
export function __wbg_quadraticCurveTo_5f1383f01c6d1617(arg0, arg1, arg2, arg3, arg4) {
    arg0.quadraticCurveTo(arg1, arg2, arg3, arg4);
}
export function __wbg_queryCounterEXT_59f99c87fee637c5(arg0, arg1, arg2) {
    arg0.queryCounterEXT(arg1, arg2 >>> 0);
}
export function __wbg_querySelectorAll_a9cd19a1a678838e() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_querySelector_0da7c0e8616bb830() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_querySelector_a3b1f840e2672b49() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_queueMicrotask_40ac6ffc2848ba77(arg0) {
    queueMicrotask(arg0);
}
export function __wbg_queueMicrotask_74d092439f6494c1(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
}
export function __wbg_queue_5eda23116e5d3adb(arg0) {
    const ret = arg0.queue;
    return ret;
}
export function __wbg_readAsArrayBuffer_bba4049b8e4da9e5() { return handleError(function (arg0, arg1) {
    arg0.readAsArrayBuffer(arg1);
}, arguments); }
export function __wbg_readBuffer_84ed375e14adc17b(arg0, arg1) {
    arg0.readBuffer(arg1 >>> 0);
}
export function __wbg_readPixels_11033ecd686150e1() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments); }
export function __wbg_readPixels_2a027d81502b271d() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments); }
export function __wbg_readPixels_4b968779f2667722() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments); }
export function __wbg_readText_a4824d87bc13b214(arg0) {
    const ret = arg0.readText();
    return ret;
}
export function __wbg_read_ac2e4325f1799cbe(arg0) {
    const ret = arg0.read();
    return ret;
}
export function __wbg_readyState_be3cc9403da6c6ae(arg0) {
    const ret = arg0.readyState;
    return ret;
}
export function __wbg_reason_fe958bcb63725f3b(arg0, arg1) {
    const ret = arg1.reason;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_rect_057eb8bb1b4e1065(arg0, arg1, arg2, arg3, arg4) {
    arg0.rect(arg1, arg2, arg3, arg4);
}
export function __wbg_redirected_19d071a2b30d58b0(arg0) {
    const ret = arg0.redirected;
    return ret;
}
export function __wbg_relatedTarget_a23adb14b641e9bf(arg0) {
    const ret = arg0.relatedTarget;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_releaseLock_9e0ebc0b5270a358(arg0) {
    arg0.releaseLock();
}
export function __wbg_releasePointerCapture_0171c4f005b48e0b() { return handleError(function (arg0, arg1) {
    arg0.releasePointerCapture(arg1);
}, arguments); }
export function __wbg_reloadWithCanvasRenderer_6af25096759b676a(arg0) {
    arg0.reloadWithCanvasRenderer();
}
export function __wbg_removeChild_e2533909b124fb03() { return handleError(function (arg0, arg1) {
    const ret = arg0.removeChild(arg1);
    return ret;
}, arguments); }
export function __wbg_removeEventListener_2ce4c0697d2b692c() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments); }
export function __wbg_removeEventListener_a31eca79e765e831() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
}, arguments); }
export function __wbg_remove_cd0727e0f0c757f2(arg0) {
    arg0.remove();
}
export function __wbg_renderbufferStorageMultisample_9da92038eb665169(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
}
export function __wbg_renderbufferStorage_05386df6e2563674(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
}
export function __wbg_renderbufferStorage_d6a0a682d9abfb81(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
}
export function __wbg_replace_4d82ab9e1577c85f(arg0, arg1, arg2, arg3) {
    const ret = arg0.replace(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
}
export function __wbg_requestAdapter_8efca1b953fd13aa(arg0, arg1) {
    const ret = arg0.requestAdapter(arg1);
    return ret;
}
export function __wbg_requestAnimationFrame_d187174d7b146805() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments); }
export function __wbg_requestDevice_290c73161fe959d5(arg0, arg1) {
    const ret = arg0.requestDevice(arg1);
    return ret;
}
export function __wbg_resetTransform_74f91932db23ee27() { return handleError(function (arg0) {
    arg0.resetTransform();
}, arguments); }
export function __wbg_resolve_9feb5d906ca62419(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
}
export function __wbg_respond_e7e53102735b2ae2() { return handleError(function (arg0, arg1) {
    arg0.respond(arg1 >>> 0);
}, arguments); }
export function __wbg_restore_5bff5e1cc672e792(arg0) {
    arg0.restore();
}
export function __wbg_result_e7ec4b77fce00cc7() { return handleError(function (arg0) {
    const ret = arg0.result;
    return ret;
}, arguments); }
export function __wbg_resume_60c7fdf589dd7208() { return handleError(function (arg0) {
    const ret = arg0.resume();
    return ret;
}, arguments); }
export function __wbg_revokeObjectURL_d718fc1cb4e2de0c() { return handleError(function (arg0, arg1) {
    URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
}, arguments); }
export function __wbg_rufflehandle_new(arg0) {
    const ret = RuffleHandle.__wrap(arg0);
    return ret;
}
export function __wbg_sampleRate_b7f221c5b3d93248(arg0) {
    const ret = arg0.sampleRate;
    return ret;
}
export function __wbg_samplerParameterf_178aec788cd2ecdc(arg0, arg1, arg2, arg3) {
    arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
}
export function __wbg_samplerParameteri_e3b690956f1fe1b3(arg0, arg1, arg2, arg3) {
    arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
}
export function __wbg_save_512a4b0787b6682e(arg0) {
    arg0.save();
}
export function __wbg_scissor_219285a5ff24f19f(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
}
export function __wbg_scissor_927c37be50cfe886(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
}
export function __wbg_search_f00bd5a955d6edef(arg0, arg1) {
    const ret = arg0.search(arg1);
    return ret;
}
export function __wbg_select_927acac8ae793dcb(arg0) {
    arg0.select();
}
export function __wbg_send_0edb796d05cd3239() { return handleError(function (arg0, arg1, arg2) {
    arg0.send(getStringFromWasm0(arg1, arg2));
}, arguments); }
export function __wbg_send_c422d0aa0cb71d09() { return handleError(function (arg0, arg1, arg2) {
    arg0.send(getArrayU8FromWasm0(arg1, arg2));
}, arguments); }
export function __wbg_setAttributeNS_64801dc57f3fc7e4() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setAttributeNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
}, arguments); }
export function __wbg_setAttribute_50dcf32d70e1628c() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments); }
export function __wbg_setBindGroup_29f4a44dff76f1a4(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
}
export function __wbg_setBindGroup_35a4830ac2c27742() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
}, arguments); }
export function __wbg_setFullscreen_62f810b3b6353b3c() { return handleError(function (arg0, arg1) {
    arg0.setFullscreen(arg1 !== 0);
}, arguments); }
export function __wbg_setIndexBuffer_924197dc97dbb679(arg0, arg1, arg2, arg3, arg4) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
}
export function __wbg_setIndexBuffer_a400322dea5437f7(arg0, arg1, arg2, arg3) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
}
export function __wbg_setMetadata_e143bb000c55e5fc(arg0, arg1) {
    arg0.setMetadata(arg1);
}
export function __wbg_setPipeline_e6ea6756d71b19a7(arg0, arg1) {
    arg0.setPipeline(arg1);
}
export function __wbg_setPointerCapture_2b94acd286b2f0af() { return handleError(function (arg0, arg1) {
    arg0.setPointerCapture(arg1);
}, arguments); }
export function __wbg_setProperty_d6673329a267577b() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments); }
export function __wbg_setScissorRect_eeb4f61d4b860d7a(arg0, arg1, arg2, arg3, arg4) {
    arg0.setScissorRect(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
}
export function __wbg_setStencilReference_54f732c89e8ab296(arg0, arg1) {
    arg0.setStencilReference(arg1 >>> 0);
}
export function __wbg_setTimeout_5649894f2c7b3d11() { return handleError(function (arg0, arg1) {
    const ret = arg0.setTimeout(arg1);
    return ret;
}, arguments); }
export function __wbg_setTransform_5641892d550382b1(arg0, arg1) {
    arg0.setTransform(arg1);
}
export function __wbg_setTransform_f25014a0bb3cb050() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setTransform(arg1, arg2, arg3, arg4, arg5, arg6);
}, arguments); }
export function __wbg_setVertexBuffer_58f30a4873b36907(arg0, arg1, arg2, arg3) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
}
export function __wbg_setVertexBuffer_7aa508f017477005(arg0, arg1, arg2, arg3, arg4) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
}
export function __wbg_set_0574e274b35c5501(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
}
export function __wbg_set_5337f8ac82364a3f() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_set_6be42768c690e380(arg0, arg1, arg2) {
    arg0[arg1] = arg2;
}
export function __wbg_set_83a7b12c27c42bbf() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0[getStringFromWasm0(arg1, arg2)] = getStringFromWasm0(arg3, arg4);
}, arguments); }
export function __wbg_set_959f043b9152efeb() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments); }
export function __wbg_set_a_6f1653ca7319cdcf(arg0, arg1) {
    arg0.a = arg1;
}
export function __wbg_set_a_746a3b968f300e29(arg0, arg1) {
    arg0.a = arg1;
}
export function __wbg_set_accept_8f18df12eb452436(arg0, arg1, arg2) {
    arg0.accept = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_access_cbee993a36feed10(arg0, arg1) {
    arg0.access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
}
export function __wbg_set_action_8d4039f2c6df61a3(arg0, arg1, arg2) {
    arg0.action = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_address_mode_u_38e255cd89ce1977(arg0, arg1) {
    arg0.addressModeU = __wbindgen_enum_GpuAddressMode[arg1];
}
export function __wbg_set_address_mode_v_513f843d6e3c9dbd(arg0, arg1) {
    arg0.addressModeV = __wbindgen_enum_GpuAddressMode[arg1];
}
export function __wbg_set_address_mode_w_801f70901a90ed5a(arg0, arg1) {
    arg0.addressModeW = __wbindgen_enum_GpuAddressMode[arg1];
}
export function __wbg_set_alpha_0a28ffc800461787(arg0, arg1) {
    arg0.alpha = arg1;
}
export function __wbg_set_alpha_mode_55b4f33e93691fe8(arg0, arg1) {
    arg0.alphaMode = __wbindgen_enum_GpuCanvasAlphaMode[arg1];
}
export function __wbg_set_alpha_to_coverage_enabled_ec44695cc0d0e961(arg0, arg1) {
    arg0.alphaToCoverageEnabled = arg1 !== 0;
}
export function __wbg_set_array_layer_count_e774b6d4a5334e63(arg0, arg1) {
    arg0.arrayLayerCount = arg1 >>> 0;
}
export function __wbg_set_array_stride_11c840b41b728354(arg0, arg1) {
    arg0.arrayStride = arg1;
}
export function __wbg_set_aspect_2503cdfcdcc17373(arg0, arg1) {
    arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
}
export function __wbg_set_attributes_ac1030b589bf253a(arg0, arg1) {
    arg0.attributes = arg1;
}
export function __wbg_set_b0d9dc239ecdb765(arg0, arg1, arg2) {
    arg0.set(getArrayU8FromWasm0(arg1, arg2));
}
export function __wbg_set_b_d5b23064b0492744(arg0, arg1) {
    arg0.b = arg1;
}
export function __wbg_set_base_array_layer_f64cdadf250d1a9b(arg0, arg1) {
    arg0.baseArrayLayer = arg1 >>> 0;
}
export function __wbg_set_base_mip_level_74fc97c2aaf8fc33(arg0, arg1) {
    arg0.baseMipLevel = arg1 >>> 0;
}
export function __wbg_set_beginning_of_pass_write_index_348e7f2f53a86db0(arg0, arg1) {
    arg0.beginningOfPassWriteIndex = arg1 >>> 0;
}
export function __wbg_set_binaryType_8564bdba0fbec720(arg0, arg1) {
    arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
}
export function __wbg_set_bind_group_layouts_6f13eb021a550053(arg0, arg1) {
    arg0.bindGroupLayouts = arg1;
}
export function __wbg_set_binding_2240d98479c0c256(arg0, arg1) {
    arg0.binding = arg1 >>> 0;
}
export function __wbg_set_binding_5296904f2a4c7e25(arg0, arg1) {
    arg0.binding = arg1 >>> 0;
}
export function __wbg_set_blend_4aea897cd7d3c0f8(arg0, arg1) {
    arg0.blend = arg1;
}
export function __wbg_set_body_aaff4f5f9991f342(arg0, arg1) {
    arg0.body = arg1;
}
export function __wbg_set_buffer_1bd0e833202ec144(arg0, arg1) {
    arg0.buffer = arg1;
}
export function __wbg_set_buffer_2e7d1f7814caf92b(arg0, arg1) {
    arg0.buffer = arg1;
}
export function __wbg_set_buffer_ba8ed06078d347f7(arg0, arg1) {
    arg0.buffer = arg1;
}
export function __wbg_set_buffer_fc9285180932669f(arg0, arg1) {
    arg0.buffer = arg1;
}
export function __wbg_set_buffers_72754529595d4bc0(arg0, arg1) {
    arg0.buffers = arg1;
}
export function __wbg_set_bytes_per_row_5fedf5a2d44b8482(arg0, arg1) {
    arg0.bytesPerRow = arg1 >>> 0;
}
export function __wbg_set_bytes_per_row_9425e8d6a11b52dc(arg0, arg1) {
    arg0.bytesPerRow = arg1 >>> 0;
}
export function __wbg_set_capture_6ffe11b1432c36b9(arg0, arg1) {
    arg0.capture = arg1 !== 0;
}
export function __wbg_set_className_082eb2aab61070f2(arg0, arg1, arg2) {
    arg0.className = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_clear_value_1171de96edbc21fe(arg0, arg1) {
    arg0.clearValue = arg1;
}
export function __wbg_set_code_27a25a855d3fbc6d(arg0, arg1, arg2) {
    arg0.code = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_code_b3f2e4b3b783123c(arg0, arg1) {
    arg0.code = arg1;
}
export function __wbg_set_codec_0e80baa8068bf6ee(arg0, arg1, arg2) {
    arg0.codec = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_color_attachments_4516b6dfb4ad987b(arg0, arg1) {
    arg0.colorAttachments = arg1;
}
export function __wbg_set_color_f2ac28bdc576c010(arg0, arg1) {
    arg0.color = arg1;
}
export function __wbg_set_compare_2c8ee8ccaa2b6b5d(arg0, arg1) {
    arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
}
export function __wbg_set_compare_cbf49b43d3211833(arg0, arg1) {
    arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
}
export function __wbg_set_count_53854513da5c0e04(arg0, arg1) {
    arg0.count = arg1 >>> 0;
}
export function __wbg_set_credentials_f31e4d30b974ce14(arg0, arg1) {
    arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
}
export function __wbg_set_cull_mode_3852dd4cff56dd90(arg0, arg1) {
    arg0.cullMode = __wbindgen_enum_GpuCullMode[arg1];
}
export function __wbg_set_d_c2d0d3986368be5e(arg0, arg1) {
    arg0.d = arg1;
}
export function __wbg_set_data_194f1c291c1b0a8f(arg0, arg1) {
    arg0.data = arg1;
}
export function __wbg_set_depth_bias_c20861a58fc2b8d9(arg0, arg1) {
    arg0.depthBias = arg1;
}
export function __wbg_set_depth_bias_clamp_eecc04d702f9402e(arg0, arg1) {
    arg0.depthBiasClamp = arg1;
}
export function __wbg_set_depth_bias_slope_scale_b2a251d3d4c65018(arg0, arg1) {
    arg0.depthBiasSlopeScale = arg1;
}
export function __wbg_set_depth_clear_value_fca9e379a0cdff8f(arg0, arg1) {
    arg0.depthClearValue = arg1;
}
export function __wbg_set_depth_compare_7883e52aad39b925(arg0, arg1) {
    arg0.depthCompare = __wbindgen_enum_GpuCompareFunction[arg1];
}
export function __wbg_set_depth_fail_op_1d11c8e03d061484(arg0, arg1) {
    arg0.depthFailOp = __wbindgen_enum_GpuStencilOperation[arg1];
}
export function __wbg_set_depth_load_op_7e95e67c69e09c5e(arg0, arg1) {
    arg0.depthLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
}
export function __wbg_set_depth_or_array_layers_36ef1df107b6b651(arg0, arg1) {
    arg0.depthOrArrayLayers = arg1 >>> 0;
}
export function __wbg_set_depth_read_only_0c5e726b56520b08(arg0, arg1) {
    arg0.depthReadOnly = arg1 !== 0;
}
export function __wbg_set_depth_stencil_17e2d1710f4e07ae(arg0, arg1) {
    arg0.depthStencil = arg1;
}
export function __wbg_set_depth_stencil_attachment_a7b5eca74b7ddcfb(arg0, arg1) {
    arg0.depthStencilAttachment = arg1;
}
export function __wbg_set_depth_store_op_1b4cc257f121a4e7(arg0, arg1) {
    arg0.depthStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
}
export function __wbg_set_depth_write_enabled_1551f99ae66d959e(arg0, arg1) {
    arg0.depthWriteEnabled = arg1 !== 0;
}
export function __wbg_set_description_87b37c7481fe9852(arg0, arg1) {
    arg0.description = arg1;
}
export function __wbg_set_device_846227515bb0301a(arg0, arg1) {
    arg0.device = arg1;
}
export function __wbg_set_dimension_7454baa9c745cf06(arg0, arg1) {
    arg0.dimension = __wbindgen_enum_GpuTextureDimension[arg1];
}
export function __wbg_set_dimension_9d314669636abc65(arg0, arg1) {
    arg0.dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
}
export function __wbg_set_download_77c90743be563640(arg0, arg1, arg2) {
    arg0.download = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_dst_factor_8397030245674624(arg0, arg1) {
    arg0.dstFactor = __wbindgen_enum_GpuBlendFactor[arg1];
}
export function __wbg_set_end_of_pass_write_index_4600a261d0317ecb(arg0, arg1) {
    arg0.endOfPassWriteIndex = arg1 >>> 0;
}
export function __wbg_set_entries_4d13c932343146c3(arg0, arg1) {
    arg0.entries = arg1;
}
export function __wbg_set_entries_7e6b569918b11bf4(arg0, arg1) {
    arg0.entries = arg1;
}
export function __wbg_set_entry_point_7248ed25fb9070c7(arg0, arg1, arg2) {
    arg0.entryPoint = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_entry_point_b01eb3970a1dcb95(arg0, arg1, arg2) {
    arg0.entryPoint = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_error_0802d2ce2a302943(arg0, arg1) {
    arg0.error = arg1;
}
export function __wbg_set_external_texture_cf6cf39036321145(arg0, arg1) {
    arg0.externalTexture = arg1;
}
export function __wbg_set_f614f6a0608d1d1d(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
}
export function __wbg_set_fail_op_ac8f2b4c077715b1(arg0, arg1) {
    arg0.failOp = __wbindgen_enum_GpuStencilOperation[arg1];
}
export function __wbg_set_fillStyle_6564a82b72a38a9c(arg0, arg1) {
    arg0.fillStyle = arg1;
}
export function __wbg_set_fillStyle_a3656c7c5d4ad803(arg0, arg1, arg2) {
    arg0.fillStyle = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_fillStyle_a37bbe1a6cf22936(arg0, arg1) {
    arg0.fillStyle = arg1;
}
export function __wbg_set_fillStyle_f2dd6e6182484100(arg0, arg1, arg2) {
    arg0.fillStyle = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_filter_73c9d4b507a71b7f(arg0, arg1, arg2) {
    arg0.filter = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_font_38efcddbe831b07e(arg0, arg1, arg2) {
    arg0.font = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_format_12bcbdd3428cd4b5(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
}
export function __wbg_set_format_1fc8a436841b29c8(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
}
export function __wbg_set_format_2a42ed14de233ae5(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuVertexFormat[arg1];
}
export function __wbg_set_format_3759d043ddc658d4(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
}
export function __wbg_set_format_b08e529cc1612d7b(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
}
export function __wbg_set_format_e0cf5a237864edb6(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
}
export function __wbg_set_format_ffa0a97f114a945a(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
}
export function __wbg_set_fragment_703ddd6f5db6e4af(arg0, arg1) {
    arg0.fragment = arg1;
}
export function __wbg_set_front_face_17a3723085696d9a(arg0, arg1) {
    arg0.frontFace = __wbindgen_enum_GpuFrontFace[arg1];
}
export function __wbg_set_g_4cc3b3e3231ca6f8(arg0, arg1) {
    arg0.g = arg1;
}
export function __wbg_set_globalAlpha_58134ccb891b6e21(arg0, arg1) {
    arg0.globalAlpha = arg1;
}
export function __wbg_set_globalCompositeOperation_5df253492507d568() { return handleError(function (arg0, arg1, arg2) {
    arg0.globalCompositeOperation = getStringFromWasm0(arg1, arg2);
}, arguments); }
export function __wbg_set_has_dynamic_offset_dc25aba64b9bd3ff(arg0, arg1) {
    arg0.hasDynamicOffset = arg1 !== 0;
}
export function __wbg_set_height_77937c921db92223(arg0, arg1) {
    arg0.height = arg1 >>> 0;
}
export function __wbg_set_height_89a4ecd0f9cc3dfa(arg0, arg1) {
    arg0.height = arg1 >>> 0;
}
export function __wbg_set_height_ac705ece3aa08c95(arg0, arg1) {
    arg0.height = arg1 >>> 0;
}
export function __wbg_set_href_f3e914f049af5c7f(arg0, arg1, arg2) {
    arg0.href = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_id_f1257005d3691e07(arg0, arg1, arg2) {
    arg0.id = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_imageSmoothingEnabled_4bc0c7e39aa4d5f5(arg0, arg1) {
    arg0.imageSmoothingEnabled = arg1 !== 0;
}
export function __wbg_set_innerHTML_faa6730a8fd54513(arg0, arg1, arg2) {
    arg0.innerHTML = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_innerText_f576815d138c00a8(arg0, arg1, arg2) {
    arg0.innerText = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_10bd19b972ff1ba6(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_16cff4ff3c381368(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_343ceab4761679d7(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_403725ced930414e(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_62b82f9361718fb9(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_7d448e8a777d0d37(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_900e563567315063(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_98bef61fcbcecdde(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_9d2ce197e447a967(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_b5d7ff5f8e4fbaac(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_ba288fbac1259847(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_e1bd2437f39d21f3(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_label_e4debe6dc9ea319b(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_layout_53be3643dc5dbbbe(arg0, arg1) {
    arg0.layout = arg1;
}
export function __wbg_set_layout_ca5f863d331bb6b4(arg0, arg1) {
    arg0.layout = arg1;
}
export function __wbg_set_lineCap_c6d038d4ea8817be(arg0, arg1, arg2) {
    arg0.lineCap = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_lineJoin_b8a8805d19729450(arg0, arg1, arg2) {
    arg0.lineJoin = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_lineWidth_da5d8942373f2ea0(arg0, arg1) {
    arg0.lineWidth = arg1;
}
export function __wbg_set_load_op_91d2cbf2912c96fd(arg0, arg1) {
    arg0.loadOp = __wbindgen_enum_GpuLoadOp[arg1];
}
export function __wbg_set_lod_max_clamp_01800ff5df00cc8e(arg0, arg1) {
    arg0.lodMaxClamp = arg1;
}
export function __wbg_set_lod_min_clamp_fe71be084b04bd97(arg0, arg1) {
    arg0.lodMinClamp = arg1;
}
export function __wbg_set_mag_filter_a6df09d1943d5caa(arg0, arg1) {
    arg0.magFilter = __wbindgen_enum_GpuFilterMode[arg1];
}
export function __wbg_set_mapped_at_creation_eb954cf5fdb9bc25(arg0, arg1) {
    arg0.mappedAtCreation = arg1 !== 0;
}
export function __wbg_set_mask_47a41aae6631771f(arg0, arg1) {
    arg0.mask = arg1 >>> 0;
}
export function __wbg_set_max_anisotropy_418bd200a56097a0(arg0, arg1) {
    arg0.maxAnisotropy = arg1;
}
export function __wbg_set_method_0eea8a5597775fa1(arg0, arg1, arg2) {
    arg0.method = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_method_f8f5b83e986b1b35(arg0, arg1, arg2) {
    arg0.method = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_min_binding_size_d0315b751370234c(arg0, arg1) {
    arg0.minBindingSize = arg1;
}
export function __wbg_set_min_filter_5b27a7eb3f5ea88a(arg0, arg1) {
    arg0.minFilter = __wbindgen_enum_GpuFilterMode[arg1];
}
export function __wbg_set_mip_level_b50dccbd04935c98(arg0, arg1) {
    arg0.mipLevel = arg1 >>> 0;
}
export function __wbg_set_mip_level_count_307eb64d9d29e3a6(arg0, arg1) {
    arg0.mipLevelCount = arg1 >>> 0;
}
export function __wbg_set_mip_level_count_fe7f73daa6021aaa(arg0, arg1) {
    arg0.mipLevelCount = arg1 >>> 0;
}
export function __wbg_set_mipmap_filter_e1543204e8199db0(arg0, arg1) {
    arg0.mipmapFilter = __wbindgen_enum_GpuMipmapFilterMode[arg1];
}
export function __wbg_set_miterLimit_4e8adbd5d769ae4b(arg0, arg1) {
    arg0.miterLimit = arg1;
}
export function __wbg_set_module_9afd1b80ff72cee9(arg0, arg1) {
    arg0.module = arg1;
}
export function __wbg_set_module_ffe8f8e909e9fdcf(arg0, arg1) {
    arg0.module = arg1;
}
export function __wbg_set_multiple_ae3a579b1d29afb5(arg0, arg1) {
    arg0.multiple = arg1 !== 0;
}
export function __wbg_set_multisample_957afdd96685c6f5(arg0, arg1) {
    arg0.multisample = arg1;
}
export function __wbg_set_multisampled_84e304d3a68838ea(arg0, arg1) {
    arg0.multisampled = arg1 !== 0;
}
export function __wbg_set_name_9d07c1aabdc3a988(arg0, arg1, arg2) {
    arg0.name = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_offset_157c6bc4fd6ec4b1(arg0, arg1) {
    arg0.offset = arg1;
}
export function __wbg_set_offset_3e78f3e530cf8049(arg0, arg1) {
    arg0.offset = arg1;
}
export function __wbg_set_offset_616ad7dfa51d50e0(arg0, arg1) {
    arg0.offset = arg1;
}
export function __wbg_set_offset_bea112c360dc7f2b(arg0, arg1) {
    arg0.offset = arg1;
}
export function __wbg_set_once_fcee75a9cee91051(arg0, arg1) {
    arg0.once = arg1 !== 0;
}
export function __wbg_set_onclick_ada9d9c22fe0889a(arg0, arg1) {
    arg0.onclick = arg1;
}
export function __wbg_set_onended_06c86af2fa3d6657(arg0, arg1) {
    arg0.onended = arg1;
}
export function __wbg_set_onload_c9a63f15203a3a20(arg0, arg1) {
    arg0.onload = arg1;
}
export function __wbg_set_operation_6c5fd88df90bc7b2(arg0, arg1) {
    arg0.operation = __wbindgen_enum_GpuBlendOperation[arg1];
}
export function __wbg_set_optimize_for_latency_419dcb36feca6f1f(arg0, arg1) {
    arg0.optimizeForLatency = arg1 !== 0;
}
export function __wbg_set_origin_dec4f4c36f9f79f6(arg0, arg1) {
    arg0.origin = arg1;
}
export function __wbg_set_output_4dfe578b1af7a470(arg0, arg1) {
    arg0.output = arg1;
}
export function __wbg_set_pass_op_461dabd5ee4ea1b7(arg0, arg1) {
    arg0.passOp = __wbindgen_enum_GpuStencilOperation[arg1];
}
export function __wbg_set_passive_1f0fadba279c8e8d(arg0, arg1) {
    arg0.passive = arg1 !== 0;
}
export function __wbg_set_power_preference_a4ce891b22ea2b05(arg0, arg1) {
    arg0.powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
}
export function __wbg_set_prevent_scroll_dfb52e4139931299(arg0, arg1) {
    arg0.preventScroll = arg1 !== 0;
}
export function __wbg_set_primitive_eb8abbc5e7f278a4(arg0, arg1) {
    arg0.primitive = arg1;
}
export function __wbg_set_query_set_849fb32875f137d7(arg0, arg1) {
    arg0.querySet = arg1;
}
export function __wbg_set_r_5fa0f548248c394c(arg0, arg1) {
    arg0.r = arg1;
}
export function __wbg_set_reason_45f516cd7e366fae(arg0, arg1, arg2) {
    arg0.reason = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_required_features_98a83c7003fd73d5(arg0, arg1) {
    arg0.requiredFeatures = arg1;
}
export function __wbg_set_resolve_target_1ff405e060e2d32e(arg0, arg1) {
    arg0.resolveTarget = arg1;
}
export function __wbg_set_resource_1409c14d4d6b5a50(arg0, arg1) {
    arg0.resource = arg1;
}
export function __wbg_set_rows_per_image_8104dfe1b042a530(arg0, arg1) {
    arg0.rowsPerImage = arg1 >>> 0;
}
export function __wbg_set_rows_per_image_9cfda8920e669db0(arg0, arg1) {
    arg0.rowsPerImage = arg1 >>> 0;
}
export function __wbg_set_sample_count_95a9892a60894677(arg0, arg1) {
    arg0.sampleCount = arg1 >>> 0;
}
export function __wbg_set_sample_type_f8f7b39d62e7b29c(arg0, arg1) {
    arg0.sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
}
export function __wbg_set_sampler_a2277e90dfe7395f(arg0, arg1) {
    arg0.sampler = arg1;
}
export function __wbg_set_shader_location_cdbcf5cf84a6cbcb(arg0, arg1) {
    arg0.shaderLocation = arg1 >>> 0;
}
export function __wbg_set_size_6f271c4c28c18e1b(arg0, arg1) {
    arg0.size = arg1;
}
export function __wbg_set_size_7ec162511b3bad1f(arg0, arg1) {
    arg0.size = arg1;
}
export function __wbg_set_size_ca765d983baccefd(arg0, arg1) {
    arg0.size = arg1;
}
export function __wbg_set_src_factor_e96f05a25f8383ed(arg0, arg1) {
    arg0.srcFactor = __wbindgen_enum_GpuBlendFactor[arg1];
}
export function __wbg_set_stencil_back_5c8971274cbcddcf(arg0, arg1) {
    arg0.stencilBack = arg1;
}
export function __wbg_set_stencil_clear_value_89ba97b367fa1385(arg0, arg1) {
    arg0.stencilClearValue = arg1 >>> 0;
}
export function __wbg_set_stencil_front_69f85bf4a6f02cb2(arg0, arg1) {
    arg0.stencilFront = arg1;
}
export function __wbg_set_stencil_load_op_a3e2c3a6f20d4da5(arg0, arg1) {
    arg0.stencilLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
}
export function __wbg_set_stencil_read_mask_86a08afb2665c29b(arg0, arg1) {
    arg0.stencilReadMask = arg1 >>> 0;
}
export function __wbg_set_stencil_read_only_dd058fe8c6a1f6ae(arg0, arg1) {
    arg0.stencilReadOnly = arg1 !== 0;
}
export function __wbg_set_stencil_store_op_87c97415636844c9(arg0, arg1) {
    arg0.stencilStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
}
export function __wbg_set_stencil_write_mask_7844d8a057a87a58(arg0, arg1) {
    arg0.stencilWriteMask = arg1 >>> 0;
}
export function __wbg_set_step_mode_285f2e428148f3b4(arg0, arg1) {
    arg0.stepMode = __wbindgen_enum_GpuVertexStepMode[arg1];
}
export function __wbg_set_storage_texture_373b9fc0e534dd33(arg0, arg1) {
    arg0.storageTexture = arg1;
}
export function __wbg_set_store_op_94575f47253d270d(arg0, arg1) {
    arg0.storeOp = __wbindgen_enum_GpuStoreOp[arg1];
}
export function __wbg_set_strip_index_format_aeb7aa0e95e6285d(arg0, arg1) {
    arg0.stripIndexFormat = __wbindgen_enum_GpuIndexFormat[arg1];
}
export function __wbg_set_strokeStyle_0578ffd0fa2002db(arg0, arg1) {
    arg0.strokeStyle = arg1;
}
export function __wbg_set_strokeStyle_0c875f356fdb7507(arg0, arg1) {
    arg0.strokeStyle = arg1;
}
export function __wbg_set_strokeStyle_cee0bcfd92da6363(arg0, arg1, arg2) {
    arg0.strokeStyle = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_tabIndex_2ae06d048487bc20(arg0, arg1) {
    arg0.tabIndex = arg1;
}
export function __wbg_set_target_8dde7bce2d14fdc7(arg0, arg1, arg2) {
    arg0.target = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_targets_93553735385af349(arg0, arg1) {
    arg0.targets = arg1;
}
export function __wbg_set_texture_6003a9e79918bf8a(arg0, arg1) {
    arg0.texture = arg1;
}
export function __wbg_set_texture_c5a457625c071b25(arg0, arg1) {
    arg0.texture = arg1;
}
export function __wbg_set_timestamp_262e7b4da20a2ac9(arg0, arg1) {
    arg0.timestamp = arg1;
}
export function __wbg_set_timestamp_writes_0603b32a31ee6205(arg0, arg1) {
    arg0.timestampWrites = arg1;
}
export function __wbg_set_topology_5e4eb809635ea291(arg0, arg1) {
    arg0.topology = __wbindgen_enum_GpuPrimitiveTopology[arg1];
}
export function __wbg_set_type_0e707d4c06fc2b7b(arg0, arg1) {
    arg0.type = __wbindgen_enum_GpuSamplerBindingType[arg1];
}
export function __wbg_set_type_3c0e8567f705b9d7(arg0, arg1, arg2) {
    arg0.type = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_type_69749b4388f04c05(arg0, arg1) {
    arg0.type = __wbindgen_enum_EncodedVideoChunkType[arg1];
}
export function __wbg_set_type_6fe4c5f460401ee0(arg0, arg1) {
    arg0.type = __wbindgen_enum_GpuBufferBindingType[arg1];
}
export function __wbg_set_type_9cc8db71b8673ad7(arg0, arg1, arg2) {
    arg0.type = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_unclipped_depth_e9a2451e4fa0277a(arg0, arg1) {
    arg0.unclippedDepth = arg1 !== 0;
}
export function __wbg_set_usage_5abd566becc087bb(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
}
export function __wbg_set_usage_61967f166fba5e13(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
}
export function __wbg_set_usage_d0a75d4429098a06(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
}
export function __wbg_set_usage_f0bb325677668e77(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
}
export function __wbg_set_value_7489a44e4e85075f(arg0, arg1, arg2) {
    arg0.value = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_value_ce1801dbd625fe96(arg0, arg1, arg2) {
    arg0.value = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_vertex_2525cfcd959b2add(arg0, arg1) {
    arg0.vertex = arg1;
}
export function __wbg_set_view_57d232eea19739c3(arg0, arg1) {
    arg0.view = arg1;
}
export function __wbg_set_view_dimension_49cfda500f1dea55(arg0, arg1) {
    arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
}
export function __wbg_set_view_dimension_a669c29ec3b0813a(arg0, arg1) {
    arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
}
export function __wbg_set_view_ffadd767d5e9b839(arg0, arg1) {
    arg0.view = arg1;
}
export function __wbg_set_view_formats_70a1fcabcd34282a(arg0, arg1) {
    arg0.viewFormats = arg1;
}
export function __wbg_set_view_formats_83865b9cdfda5cb6(arg0, arg1) {
    arg0.viewFormats = arg1;
}
export function __wbg_set_visibility_088046ee77c33b1d(arg0, arg1) {
    arg0.visibility = arg1 >>> 0;
}
export function __wbg_set_width_d2ec5d6689655fa9(arg0, arg1) {
    arg0.width = arg1 >>> 0;
}
export function __wbg_set_width_da52058a27694474(arg0, arg1) {
    arg0.width = arg1 >>> 0;
}
export function __wbg_set_width_e96e07f8255ad913(arg0, arg1) {
    arg0.width = arg1 >>> 0;
}
export function __wbg_set_write_mask_76041c03688571cd(arg0, arg1) {
    arg0.writeMask = arg1 >>> 0;
}
export function __wbg_set_x_fdd6aca9a2390926(arg0, arg1) {
    arg0.x = arg1 >>> 0;
}
export function __wbg_set_y_410a18c5811abf4c(arg0, arg1) {
    arg0.y = arg1 >>> 0;
}
export function __wbg_set_z_f7f1ae8afd3a9308(arg0, arg1) {
    arg0.z = arg1 >>> 0;
}
export function __wbg_shaderSource_0aa654ee0e007aa6(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
}
export function __wbg_shaderSource_d9de9139056756aa(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
}
export function __wbg_shiftKey_2380f1b5c0ab0a0d(arg0) {
    const ret = arg0.shiftKey;
    return ret;
}
export function __wbg_stack_3b0d974bbf31e44f(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_start_cd7b8ea71ca7ac8a() { return handleError(function (arg0, arg1) {
    arg0.start(arg1);
}, arguments); }
export function __wbg_state_48162d6afb9f52fe(arg0) {
    const ret = arg0.state;
    return (__wbindgen_enum_CodecState.indexOf(ret) + 1 || 4) - 1;
}
export function __wbg_static_accessor_GLOBAL_THIS_1c7f1bd6c6941fdb() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_static_accessor_GLOBAL_e039bc914f83e74e() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_static_accessor_SELF_8bf8c48c28420ad5() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_static_accessor_WINDOW_6aeee9b51652ee0f() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_statusText_2d5691a1cc828900(arg0, arg1) {
    const ret = arg1.statusText;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_status_157e67ab07d01f8a(arg0) {
    const ret = arg0.status;
    return ret;
}
export function __wbg_stencilFuncSeparate_4530c49bf8cb1460(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
}
export function __wbg_stencilFuncSeparate_bf34f60e3f110bfe(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
}
export function __wbg_stencilFunc_e367e26d8241b51e(arg0, arg1, arg2, arg3) {
    arg0.stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
}
export function __wbg_stencilMaskSeparate_229cbef7cc83cadb(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_stencilMaskSeparate_9b1653193ff288f7(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_stencilMask_8c221e4c375209c5(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
}
export function __wbg_stencilMask_c5d4a74ffb068fe9(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
}
export function __wbg_stencilOpSeparate_3a474db0945a2c9e(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
}
export function __wbg_stencilOpSeparate_f9ac7d0ce34b49cc(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
}
export function __wbg_stencilOp_bb975b3d2c56121c(arg0, arg1, arg2, arg3) {
    arg0.stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
}
export function __wbg_stringify_7fd5cae8859a6f10() { return handleError(function (arg0) {
    const ret = JSON.stringify(arg0);
    return ret;
}, arguments); }
export function __wbg_stroke_d08ec8a4fd5de644(arg0, arg1) {
    arg0.stroke(arg1);
}
export function __wbg_style_ad734f3851a343fb(arg0) {
    const ret = arg0.style;
    return ret;
}
export function __wbg_submit_21302eebe551e30d(arg0, arg1) {
    arg0.submit(arg1);
}
export function __wbg_submit_66eb8db3fe67c321() { return handleError(function (arg0) {
    arg0.submit();
}, arguments); }
export function __wbg_suppressContextMenu_fcbf2013014d4cd2(arg0) {
    arg0.suppressContextMenu();
}
export function __wbg_suspend_52df7cf9a7b9e0d6() { return handleError(function (arg0) {
    const ret = arg0.suspend();
    return ret;
}, arguments); }
export function __wbg_texImage2D_1d87cc5a34709e21() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texImage2D_8325ec05b789d75e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texImage2D_939565a1220dd61e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9 === 0 ? undefined : getArrayU8FromWasm0(arg9, arg10));
}, arguments); }
export function __wbg_texImage2D_bd39197f40b2fcce() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texImage2D_ed29b013f38f9067() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9 === 0 ? undefined : getArrayU8FromWasm0(arg9, arg10));
}, arguments); }
export function __wbg_texImage3D_b99062125306e0a5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments); }
export function __wbg_texImage3D_cc1e3c97cd187460() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments); }
export function __wbg_texParameteri_4a0747bf8e13f69d(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
}
export function __wbg_texParameteri_9e9659537a5f6420(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
}
export function __wbg_texStorage2D_68a718b3fe4fe8e1(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
}
export function __wbg_texStorage3D_8ddd8de7b3efc66d(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
}
export function __wbg_texSubImage2D_050bb40fcaf0d432() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_10b80906c76b2340() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_316bed6ee52b841d() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_3422d34fb3b08ab7() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_4d363b1f09791d02() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_8c565ab572b8e793() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_96f5b172e2bd5235() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_e474295e2473c615() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage2D_fd8f22b27fcc3390() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments); }
export function __wbg_texSubImage3D_02cd8e0ce4a498bf() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_286dba65215a1ed5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_3c046d3816ff7ac5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_63d52a5f007110c2() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_70bf1337a948082e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_71d4eaf8afa1000b() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_8285b442f7afc502() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_texSubImage3D_aba4a822ce927a93() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments); }
export function __wbg_then_20a157d939b514f5(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
}
export function __wbg_then_5ef9b762bc91555c(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
}
export function __wbg_then_7ebd9021bf33072f(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
}
export function __wbg_toString_8d874489bad7e5a2(arg0) {
    const ret = arg0.toString();
    return ret;
}
export function __wbg_transform_0f8e35c0c3625687() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.transform(arg1, arg2, arg3, arg4, arg5, arg6);
}, arguments); }
export function __wbg_uniform1f_d9aa0dc2f3d488ff(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
}
export function __wbg_uniform1f_ea4312ab8da5d8c4(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
}
export function __wbg_uniform1fv_78a27ec7ef1fe9dd(arg0, arg1, arg2, arg3) {
    arg0.uniform1fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform1i_8901d038c64b0846(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
}
export function __wbg_uniform1i_bbb9a97ff88cb229(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
}
export function __wbg_uniform1ui_567e99d35204c615(arg0, arg1, arg2) {
    arg0.uniform1ui(arg1, arg2 >>> 0);
}
export function __wbg_uniform2fv_2ac9861002424218(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform2fv_fc947a484cd09cba(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform2iv_1d17307290cff22b(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
}
export function __wbg_uniform2iv_a40dabbc376f9258(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
}
export function __wbg_uniform2uiv_ea3846a859bc1b16(arg0, arg1, arg2, arg3) {
    arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
}
export function __wbg_uniform3fv_4c3ad296700bc6d2(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform3fv_4c4762e638099fa9(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform3iv_2a7a198f04b3402d(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
}
export function __wbg_uniform3iv_aa32a164a3182218(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
}
export function __wbg_uniform3uiv_c09a04d6f6c79d84(arg0, arg1, arg2, arg3) {
    arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
}
export function __wbg_uniform4f_2e8758dde1755426(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
}
export function __wbg_uniform4f_4fa9b0e1d5e37cc8(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
}
export function __wbg_uniform4fv_24ac5b11edbfa9f7(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform4fv_2e2ddfcf5a547136(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
}
export function __wbg_uniform4iv_2103c8a85a8b0dd8(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
}
export function __wbg_uniform4iv_3cb8853c728f9a45(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
}
export function __wbg_uniform4uiv_46ee978fe8703aaf(arg0, arg1, arg2, arg3) {
    arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
}
export function __wbg_uniformBlockBinding_bcefd2aef80c40ab(arg0, arg1, arg2, arg3) {
    arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
}
export function __wbg_uniformMatrix2fv_0c4f0f8be58e53fc(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix2fv_a832f1d01c1474e0(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix2x3fv_4751a02fab689bba(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix2x4fv_d5869e7ed3ec9948(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix3fv_18b77dec8d4083f6(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix3fv_37240e6bf86a07fe(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix3x2fv_5d97f011461fbdcd(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix3x4fv_c04455753c617f36(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix4fv_0669f12fa9ed38ab(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix4fv_174a0c07d7d262e6(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix4x2fv_52bb86fa40a5d268(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_uniformMatrix4x3fv_505928f7d73da1ba(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
}
export function __wbg_unmap_b819b8b402db13cc(arg0) {
    arg0.unmap();
}
export function __wbg_url_a0e994e7d0317efc(arg0, arg1) {
    const ret = arg1.url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_useProgram_330a8a331113dc40(arg0, arg1) {
    arg0.useProgram(arg1);
}
export function __wbg_useProgram_72d15c6d8466e299(arg0, arg1) {
    arg0.useProgram(arg1);
}
export function __wbg_userActivation_17f01c0424ba6817(arg0) {
    const ret = arg0.userActivation;
    return ret;
}
export function __wbg_value_f852716acdeb3e82(arg0) {
    const ret = arg0.value;
    return ret;
}
export function __wbg_values_55b059c6d0a36ae9(arg0) {
    const ret = arg0.values();
    return ret;
}
export function __wbg_vertexAttribDivisorANGLE_1bec2625956dfe3e(arg0, arg1, arg2) {
    arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_vertexAttribDivisor_6b78656d66a0b972(arg0, arg1, arg2) {
    arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
}
export function __wbg_vertexAttribIPointer_d7e970f0df5969cf(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
}
export function __wbg_vertexAttribPointer_53d25cb342bec3e0(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
}
export function __wbg_vertexAttribPointer_734b53a3b8f492ca(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
}
export function __wbg_view_16bd97d49793e1a9(arg0) {
    const ret = arg0.view;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_viewport_454df83d0d2cf558(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
}
export function __wbg_viewport_d56ad9cd4b4e71ca(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
}
export function __wbg_visibleRect_a9e28db47b426247(arg0) {
    const ret = arg0.visibleRect;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_wasClean_92b4133f985dfae0(arg0) {
    const ret = arg0.wasClean;
    return ret;
}
export function __wbg_width_73079be53f70e8ba(arg0) {
    const ret = arg0.width;
    return ret;
}
export function __wbg_width_7b9880491bd7c987(arg0) {
    const ret = arg0.width;
    return ret;
}
export function __wbg_width_7c985ca9f3cc024f(arg0) {
    const ret = arg0.width;
    return ret;
}
export function __wbg_width_bb0a84dddb1bba27(arg0) {
    const ret = arg0.width;
    return ret;
}
export function __wbg_width_f75fee5f49cb52c9(arg0) {
    const ret = arg0.width;
    return ret;
}
export function __wbg_writeTexture_340cfbecd9544755() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.writeTexture(arg1, arg2, arg3, arg4);
}, arguments); }
export function __wbindgen_cast_0000000000000001(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 6726, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h6f930efddb5b95c4);
    return ret;
}
export function __wbindgen_cast_0000000000000002(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 8736, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h7fd8962544137257);
    return ret;
}
export function __wbindgen_cast_0000000000000003(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [F64], shim_idx: 644, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__hf1aa8f987754b092);
    return ret;
}
export function __wbindgen_cast_0000000000000004(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("ClipboardEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738);
    return ret;
}
export function __wbindgen_cast_0000000000000005(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("CloseEvent")], shim_idx: 1598, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4);
    return ret;
}
export function __wbindgen_cast_0000000000000006(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("DOMException")], shim_idx: 1675, ret: Unit, inner_ret: Some(Unit) }, mutable: false }) -> Externref`.
    const ret = makeClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h672e615c57ebab65);
    return ret;
}
export function __wbindgen_cast_0000000000000007(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 1598, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4_6);
    return ret;
}
export function __wbindgen_cast_0000000000000008(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("FocusEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_7);
    return ret;
}
export function __wbindgen_cast_0000000000000009(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("KeyboardEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_8);
    return ret;
}
export function __wbindgen_cast_000000000000000a(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 1598, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4_9);
    return ret;
}
export function __wbindgen_cast_000000000000000b(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("PageTransitionEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_10);
    return ret;
}
export function __wbindgen_cast_000000000000000c(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("PointerEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_11);
    return ret;
}
export function __wbindgen_cast_000000000000000d(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("VideoFrame")], shim_idx: 1675, ret: Unit, inner_ret: Some(Unit) }, mutable: false }) -> Externref`.
    const ret = makeClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h672e615c57ebab65_12);
    return ret;
}
export function __wbindgen_cast_000000000000000e(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("WebGLContextEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_13);
    return ret;
}
export function __wbindgen_cast_000000000000000f(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("WheelEvent")], shim_idx: 641, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_14);
    return ret;
}
export function __wbindgen_cast_0000000000000010(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1532, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0cf4e63682b96e25);
    return ret;
}
export function __wbindgen_cast_0000000000000011(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1600, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h045a9b5c0617baa2);
    return ret;
}
export function __wbindgen_cast_0000000000000012(arg0) {
    // Cast intrinsic for `F64 -> Externref`.
    const ret = arg0;
    return ret;
}
export function __wbindgen_cast_0000000000000013(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
    const ret = getArrayF32FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000014(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(I16)) -> NamedExternref("Int16Array")`.
    const ret = getArrayI16FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000015(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(I32)) -> NamedExternref("Int32Array")`.
    const ret = getArrayI32FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000016(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(I8)) -> NamedExternref("Int8Array")`.
    const ret = getArrayI8FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000017(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(U16)) -> NamedExternref("Uint16Array")`.
    const ret = getArrayU16FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000018(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
    const ret = getArrayU32FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000019(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
    const ret = getArrayU8FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_000000000000001a(arg0, arg1) {
    // Cast intrinsic for `Ref(String) -> Externref`.
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_externrefs;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
}
const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));
function wasm_bindgen__convert__closures_____invoke__h0cf4e63682b96e25(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0cf4e63682b96e25(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h045a9b5c0617baa2(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h045a9b5c0617baa2(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h6f930efddb5b95c4(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h6f930efddb5b95c4(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h672e615c57ebab65(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h672e615c57ebab65(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4_6(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4_6(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_7(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_7(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_8(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_8(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4_9(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__had0e7a1e873961b4_9(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_10(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_10(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_11(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_11(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h672e615c57ebab65_12(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h672e615c57ebab65_12(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_13(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_13(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_14(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0be39a5bffb41738_14(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h7fd8962544137257(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__h7fd8962544137257(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen__convert__closures_____invoke__h1799a4864efc802e(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures_____invoke__h1799a4864efc802e(arg0, arg1, arg2, arg3);
}

function wasm_bindgen__convert__closures_____invoke__hf1aa8f987754b092(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__hf1aa8f987754b092(arg0, arg1, arg2);
}


const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];


const __wbindgen_enum_CanvasWindingRule = ["nonzero", "evenodd"];


const __wbindgen_enum_CodecState = ["unconfigured", "configured", "closed"];


const __wbindgen_enum_EncodedVideoChunkType = ["key", "delta"];


const __wbindgen_enum_GpuAddressMode = ["clamp-to-edge", "repeat", "mirror-repeat"];


const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"];


const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];


const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];


const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];


const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];


const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];


const __wbindgen_enum_GpuFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];


const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];


const __wbindgen_enum_GpuLoadOp = ["load", "clear"];


const __wbindgen_enum_GpuMipmapFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];


const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];


const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];


const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];


const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];


const __wbindgen_enum_GpuStoreOp = ["store", "discard"];


const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];


const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];


const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];


const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];


const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];


const __wbindgen_enum_GpuVertexFormat = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"];


const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];


const __wbindgen_enum_ReadableStreamType = ["bytes"];


const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];


const __wbindgen_enum_VideoPixelFormat = ["I420", "I420P10", "I420P12", "I420A", "I420AP10", "I420AP12", "I422", "I422P10", "I422P12", "I422A", "I422AP10", "I422AP12", "I444", "I444P10", "I444P12", "I444A", "I444AP10", "I444AP12", "NV12", "RGBA", "RGBX", "BGRA", "BGRX"];
const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr, 1));
const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr, 1));
const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr, 1));
const RuffleHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rufflehandle_free(ptr, 1));
const RuffleInstanceBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ruffleinstancebuilder_free(ptr, 1));
const ZipWriterFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_zipwriter_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

let cachedInt16ArrayMemory0 = null;
function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.byteLength === 0) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

let cachedInt8ArrayMemory0 = null;
function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedUint8ClampedArrayMemory0 = null;
function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;


let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}
