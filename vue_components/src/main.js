import { defineCustomElement } from "vue";

import GalleryCard from "./components/GalleryCard.ce.vue";
import GalleryManager from "./components/GalleryManager.ce.vue";
import GalleryCardCompact from "./components/GalleryCardCompat.ce.vue";
const GalleryCardElement = defineCustomElement(GalleryCard);
const GalleryManagerElement = defineCustomElement(GalleryManager);
const GalleryCardCompactElement = defineCustomElement(GalleryCardCompact);

customElements.define("gallery-card", GalleryCardElement);
customElements.define("find-partner-view", GalleryManagerElement);
customElements.define("gallery-card-compact", GalleryCardCompactElement);
