import { defineCustomElement } from "vue";

import "@fortawesome/fontawesome-free/css/all.min.css";

import GalleryCard from "./components/GalleryCard.ce.vue";
import GalleryManager from "./components/GalleryManager.ce.vue";
import GalleryCardCompact from "./components/GalleryCardCompat.ce.vue";
import InboundRequestsCe from "./components/InboundRequests.ce.vue";
import AdminDashboardCe from "./components/AdminDashboard.ce.vue";
import ChatWidgetCe from "./components/ChatWidget.ce.vue";
import ResourcesPanelCe from "./components/ResourcesPanel.ce.vue";
import ChatRoomCe from "./components/ChatRoom.ce.vue";

const GalleryCardElement = defineCustomElement(GalleryCard);
const GalleryManagerElement = defineCustomElement(GalleryManager);
const GalleryCardCompactElement = defineCustomElement(GalleryCardCompact);
const InboundRequestElement = defineCustomElement(InboundRequestsCe);
const AdminDashboardElement = defineCustomElement(AdminDashboardCe);
const ChatWidgetElement = defineCustomElement(ChatWidgetCe);
const ResourcesPanelElement = defineCustomElement(ResourcesPanelCe);
const ChatRoomElement = defineCustomElement(ChatRoomCe);

customElements.define("gallery-card", GalleryCardElement);
customElements.define("find-partner-view", GalleryManagerElement);
customElements.define("gallery-card-compact", GalleryCardCompactElement);
customElements.define("inbound-request", InboundRequestElement);
customElements.define("admin-dashboard", AdminDashboardElement);
customElements.define("chat-widget", ChatWidgetElement);
customElements.define("resources-panel", ResourcesPanelElement);
customElements.define("chat-room", ChatRoomElement);
