import "spin-wheel";
import { ref, useSSRContext } from "vue";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "vue/server-renderer";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="gui-wrapper" data-v-c7916d85><p data-v-c7916d85>Click-drag (or touch-flick) to spin the wheel.</p><div data-v-c7916d85><button data-v-c7916d85>Spin</button><p data-v-c7916d85><label data-v-c7916d85>Theme:</label><select data-v-c7916d85></select></p></div></div><div class="wheel-wrapper" data-v-c7916d85></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7916d85"]]);
export {
  index as default
};
//# sourceMappingURL=index-ClKOPoNm.js.map
