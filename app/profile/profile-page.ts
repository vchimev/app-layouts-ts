import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import * as observable from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";
import { EditableTextBase } from "tns-core-modules/ui/editable-text-base";
import * as platform from "tns-core-modules/platform";

export function onPageNavigatingTo(args: EventData) {
    let page = <Page>args.object;
    let viewModel = observable.fromObject({
        username: "ILoveNS",
        email: "team@mail.com",
        password: "password",
        bio: undefined,
        isPublic: true,
        showPassword: false
    });
    page.bindingContext = viewModel;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function onContentLoaded(args: EventData) {
    let view = <View>args.object;
}

export function onProfilePictureTapped(args: EventData) {
    notify("Change Image Tapped!");
}

export function onUpdateButtonTapped(args: EventData) {
    notify("Update Tapped!");
}

function notify(msg: string) {
    switch (platform.device.os) {
        case platform.platformNames.android:
            // android.widget.Toast.makeText(application.android.context, msg, android.widget.Toast.LENGTH_SHORT).show();
            break;
        case platform.platformNames.ios:
            console.log(msg);
            break;
    }
}

export function onShowPasswordTapped(args: EventData) {
    let view = <View>args.object;
    let viewModel = view.page.bindingContext
    viewModel.showPassword = !viewModel.showPassword;
}

let closeTimeout = 0;
export function onTextInputTapped(args: EventData) {
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(() => {
        closeTimeout = 0;
    }, 20);
}

export function onPageTapped(args: EventData) {
    let page = <Page>args.object;
    if (!closeTimeout) {
        closeTimeout = setTimeout(() => {
            page.getViewById<EditableTextBase>("username").dismissSoftInput();
            page.getViewById<EditableTextBase>("email").dismissSoftInput();
            page.getViewById<EditableTextBase>("password").dismissSoftInput();
            page.getViewById<EditableTextBase>("bio").dismissSoftInput();
            closeTimeout = 0;
        }, 20);
    }
}
