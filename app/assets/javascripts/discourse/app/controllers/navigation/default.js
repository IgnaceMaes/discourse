import { tracked } from "@glimmer/tracking";
import Controller, { inject as controller } from "@ember/controller";
import { dependentKeyCompat } from "@ember/object/compat";
import { inject as service } from "@ember/service";
import { calculateFilterMode } from "discourse/lib/filter-mode";
import { TRACKED_QUERY_PARAM_VALUE } from "discourse/lib/topic-list-tracked-filter";

export default class NavigationDefaultController extends Controller {
  @service router;
  @service composer;
  @controller discovery;

  @tracked category;
  @tracked filterType;
  @tracked noSubcategories;

  @dependentKeyCompat
  get filterMode() {
    return calculateFilterMode({
      category: this.category,
      filterType: this.filterType,
      noSubcategories: this.noSubcategories,
    });
  }

  get skipCategoriesNavItem() {
    return this.router.currentRoute.queryParams.f === TRACKED_QUERY_PARAM_VALUE;
  }
}
