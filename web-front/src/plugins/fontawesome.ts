import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTrash,
  faCircleInfo,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faCircleInfo, faPenToSquare);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});