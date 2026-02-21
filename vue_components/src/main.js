import { defineCustomElement } from "vue";

import "@fortawesome/fontawesome-free/css/all.min.css";

import faStyles from "@fortawesome/fontawesome-free/css/all.min.css?inline";

import GalleryCard from "./components/GalleryCard.ce.vue";
import GalleryManager from "./components/GalleryManager.ce.vue";
import GalleryCardCompact from "./components/GalleryCardCompat.ce.vue";
import NavbarCe from "./components/Navbar.ce.vue";
import ProfileCe from "./components/Profile.ce.vue";
import TimetableCe from "./components/Timetable.ce.vue";

const defineSafeElement = (name, component) => {
  const internalStyles = component.styles || [];

  const element = defineCustomElement({
    ...component,
    styles: [...internalStyles, faStyles],
  });

  customElements.define(name, element);
};
// Register elements with icon support
defineSafeElement("gallery-card", GalleryCard);
defineSafeElement("find-partner-view", GalleryManager);
defineSafeElement("gallery-card-compact", GalleryCardCompact);
// defineSafeElement("nav-bar", NavbarCe);
// defineSafeElement("profile", ProfileCe);
defineSafeElement("time-table", TimetableCe);
