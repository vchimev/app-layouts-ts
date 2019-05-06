import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { View } from "tns-core-modules/ui/core/view";
import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { HomeViewModel } from "./dock-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();

    // Animations
    page.getViewById("container").eachChild(child => {
        child.className = "btn";
        child.className = "btn-animated";
        return true;
    });
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function onTap(args: EventData) {
    let button = <View>args.object;
    let className = button.className.replace("-animated", "").replace("2", "");
    button.className = className;
    button.className = className + "-animated2";
}
