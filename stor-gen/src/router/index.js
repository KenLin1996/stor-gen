/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHashHistory,
  START_LOCATION,
} from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();

  if (from === START_LOCATION) {
    await user.profile();
  }
  next();
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

export default router;
