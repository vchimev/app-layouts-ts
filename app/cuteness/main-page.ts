import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { topmost } from "tns-core-modules/ui/frame";

import { AppViewModel } from "./reddit-app-view-model";

let appViewModel = new AppViewModel();

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

// Event handler for Page "loaded" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = appViewModel;
}

// Navigate to the details page with context set to the data item for specified index
export function listViewItemTap(args: ItemEventData) {
    topmost().navigate({
        moduleName: "cuteness/details-page",
        bindingContext: appViewModel.redditItems.getItem(args.index)
    });
}

// export function listViewLoadMoreItems(args: ObservableEventData) {
//     // Increase model items length with model items loadSize property value
//     //appViewModel.redditItems.length += appViewModel.redditItems.loadSize;
// }
