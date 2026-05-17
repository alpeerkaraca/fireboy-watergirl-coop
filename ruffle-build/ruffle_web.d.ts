/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

type ReadableStreamType = "bytes";

export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
    readonly autoAllocateChunkSize: number;
    readonly type: ReadableStreamType;
}

export class IntoUnderlyingSink {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    abort(reason: any): Promise<any>;
    close(): Promise<any>;
    write(chunk: any): Promise<any>;
}

export class IntoUnderlyingSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

/**
 * r" An opaque handle to a `RuffleInstance` inside the pool.
 * r"
 * r" This type is exported to JS, and is used to interact with the library.
 */
export class RuffleHandle {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the web AudioContext used by this player.
     * Returns `None` if the audio backend does not use Web Audio.
     */
    audio_context(): AudioContext | undefined;
    call_exposed_callback(name: string, args: any[]): any;
    clear_custom_menu_items(): void;
    destroy(): void;
    /**
     * Switches to background tick mode, pausing the normal animation loop.
     * Use `tick_for_background` to advance the player while the tab is hidden.
     */
    enable_background_tick_mode(): void;
    has_focus(): boolean;
    is_playing(): boolean;
    /**
     * Returns whether the `simd128` target feature was enabled at build time.
     * This is intended to discriminate between the two WebAssembly module
     * versions, one of which uses WebAssembly extensions, and the other one
     * being "vanilla". `simd128` is used as proxy for most extensions, since
     * no other WebAssembly target feature is exposed to `cfg!`.
     */
    static is_wasm_simd_used(): boolean;
    /**
     * Play an arbitrary movie on this instance.
     *
     * This method should only be called once per player.
     */
    load_data(swf_data: Uint8Array, parameters: any, swf_name: string): void;
    pause(): void;
    play(): void;
    prepare_context_menu(): any;
    renderer_debug_info(): any;
    renderer_name(): any;
    /**
     * Leaves background tick mode and reschedules the normal animation loop.
     * Does not tick the core itself.
     */
    restart_animation_loop(): void;
    run_context_menu_callback(index: number): Promise<void>;
    set_fullscreen(is_fullscreen: boolean): void;
    set_trace_observer(observer: any): void;
    set_volume(value: number): void;
    /**
     * Simulates a key press — bypasses DOM events and injects directly into the player.
     * `code` should be a KeyboardEvent.code value like "KeyA", "KeyD", "KeyW", "ArrowLeft", etc.
     * This enables programmatic control of the Flash game (e.g., online multiplayer relay).
     */
    simulate_key_down(code: string): void;
    /**
     * Simulates a key release — the counterpart to `simulate_key_down`.
     */
    simulate_key_up(code: string): void;
    /**
     * Stream an arbitrary movie file from (presumably) the Internet.
     *
     * This method should only be called once per player.
     *
     * `parameters` are *extra* parameters to set on the LoaderInfo -
     * parameters from `movie_url` query parameters will be automatically added.
     */
    stream_from(movie_url: string, parameters: any): void;
    /**
     * Ticks the game core once. Intended to be called from a Web Worker loop
     * after calling `enable_background_tick_mode`.
     */
    tick_for_background(timestamp: number): void;
    volume(): number;
}

export class RuffleInstanceBuilder {
    /**
     ** Return copy of self without private attributes.
     */
    toJSON(): Object;
    /**
     * Return stringified version of self.
     */
    toString(): string;
    free(): void;
    [Symbol.dispose](): void;
    addFont(font_name: string, data: Uint8Array): void;
    addGamepadButtonMapping(button: string, keycode: number): void;
    addSocketProxy(host: string, port: number, proxy_url: string): void;
    addUrlRewriteRule(regexp: RegExp, replacement: string): void;
    build(parent: HTMLElement, js_player: any): Promise<any>;
    constructor();
    setAllowFullscreen(value: boolean): void;
    setAllowNetworking(value: string): void;
    setAllowScriptAccess(value: boolean): void;
    setBackgroundColor(value?: number | null): void;
    setBaseUrl(value?: string | null): void;
    setCompatibilityRules(value: boolean): void;
    setCredentialAllowList(value: string[]): void;
    setDefaultFont(default_name: string, fonts: any[]): void;
    setDeviceFontRenderer(device_font_renderer: string): void;
    setForceAlign(value: boolean): void;
    setForceScale(value: boolean): void;
    setFrameRate(value?: number | null): void;
    setLetterbox(value: string): void;
    setLogLevel(value: string): void;
    setMaxExecutionDuration(value: number): void;
    setOpenUrlMode(value: string): void;
    setPlayerRuntime(value: string): void;
    setPlayerVersion(value?: number | null): void;
    setPreferredRenderer(value?: string | null): void;
    setQuality(value: string): void;
    setScale(value: string): void;
    setScrollingBehavior(scrolling_behavior: string): void;
    setShowMenu(value: boolean): void;
    setStageAlign(value: string): void;
    setUpgradeToHttps(value: boolean): void;
    setVolume(value: number): void;
    setWmode(value?: string | null): void;
}

export class ZipWriter {
    free(): void;
    [Symbol.dispose](): void;
    addFile(name: string, bytes: Uint8Array): void;
    constructor();
    save(): Uint8Array;
}

export function global_init(): void;
