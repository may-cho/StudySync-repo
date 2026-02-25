import { defineCustomElement } from "vue";

import "@fortawesome/fontawesome-free/css/all.min.css";

import faStyles from "@fortawesome/fontawesome-free/css/all.min.css?inline";

import GalleryCard from "./components/GalleryCard.ce.vue";
import GalleryManager from "./components/GalleryManager.ce.vue";
import GalleryCardCompact from "./components/GalleryCardCompat.ce.vue";
import InboundRequestsCe from "./components/InboundRequests.ce.vue";
import AdminDashboardCe from "./components/AdminDashboard.ce.vue";

const GalleryCardElement = defineCustomElement(GalleryCard);
const GalleryManagerElement = defineCustomElement(GalleryManager);
const GalleryCardCompactElement = defineCustomElement(GalleryCardCompact);
const InboundRequestElement = defineCustomElement(InboundRequestsCe);
const AdminDashboardElement = defineCustomElement(AdminDashboardCe);

customElements.define("gallery-card", GalleryCardElement);
customElements.define("find-partner-view", GalleryManagerElement);
customElements.define("gallery-card-compact", GalleryCardCompactElement);
customElements.define("inbound-request", InboundRequestElement);
customElements.define("admin-dashboard", AdminDashboardElement);
