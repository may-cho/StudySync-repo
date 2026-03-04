import { defineCustomElement } from "vue";

import "@fortawesome/fontawesome-free/css/all.min.css";

import GalleryCard from "./components/GalleryCard.ce.vue";
import GalleryManager from "./components/GalleryManager.ce.vue";
import GalleryCardCompact from "./components/GalleryCardCompat.ce.vue";
import InboundRequestsCe from "./components/InboundRequests.ce.vue";
import AdminDashboardCe from "./components/AdminDashboard.ce.vue";
import ChatRoomCe from "./components/ChatRoom.ce.vue";

import PostCardCe from "./components/PostCard.ce.vue";
import GroupPageCe from "./components/GroupPage.ce.vue";
import PostDetailsCe from "./components/PostDetails.ce.vue";

const GalleryCardElement = defineCustomElement(GalleryCard);
const GalleryManagerElement = defineCustomElement(GalleryManager);
const GalleryCardCompactElement = defineCustomElement(GalleryCardCompact);
const InboundRequestElement = defineCustomElement(InboundRequestsCe);
const AdminDashboardElement = defineCustomElement(AdminDashboardCe);
const ChatRoomElement = defineCustomElement(ChatRoomCe);
const PostCardElement = defineCustomElement(PostCardCe);
const GroupPageElement = defineCustomElement(GroupPageCe);
const PostDetailsElement = defineCustomElement(PostDetailsCe);
// This function runs when the Vue button is clicked
const handleConnect = (studentId) => {
  // Leave this empty or just log it.
  // The GalleryCard.ce.vue is handling the logic now.
  console.log("Connect initiated for profile:", studentId);
};

customElements.define("gallery-card", GalleryCardElement);
customElements.define("find-partner-view", GalleryManagerElement);
customElements.define("gallery-card-compact", GalleryCardCompactElement);
customElements.define("inbound-request", InboundRequestElement);
customElements.define("admin-dashboard", AdminDashboardElement);
customElements.define("chat-room", ChatRoomElement);

customElements.define("post-card", PostCardElement);
customElements.define("group-page", GroupPageElement);
customElements.define("post-details", PostDetailsElement);
