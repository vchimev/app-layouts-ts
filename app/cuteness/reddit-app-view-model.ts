import { ImageSource, fromFile as imageSourceFromFile } from "tns-core-modules/image-source";
import { VirtualArray, ItemsLoading as virtualArrayItemsLoadingData } from "tns-core-modules/data/virtual-array";
import { Observable } from "tns-core-modules/data/observable";
import { Cache as ImageCache } from "tns-core-modules/ui/image-cache";

import { Data as RedditData } from "./reddit-model";
import { RedditViewModel } from "./reddit-item-view-model";

let aboutText = "Cuteness is sample app demonstrating the Progress's NativeScript for writing native mobile applications using JavaScript.";
export let defaultThumbnailImageSource = imageSourceFromFile("~/cuteness/res/reddit-logo.png");
export let defaultNoThumbnailImageSource = imageSourceFromFile("~/cuteness/res/no-image.png");

let redditUrl = "https://www.reddit.com/r/aww.json?limit=";
let after: string;
let ISSCROLLING = "isLoading";

// initialize the image cache for the main list
export let cache = new ImageCache();
cache.placeholder = defaultThumbnailImageSource;
cache.maxRequests = 5;

export class AppViewModel extends Observable {

    private _redditItems: VirtualArray<RedditViewModel>;
    get redditItems(): VirtualArray<RedditViewModel> {
        if (!this._redditItems) {
            this._redditItems = new VirtualArray<RedditViewModel>(1000);
            this._redditItems.loadSize = 50;
            this._redditItems.on(VirtualArray.itemsLoadingEvent, (args: virtualArrayItemsLoadingData) => {

                fetch(redditUrl + args.count + (after ? "&after=" + after : "")).then<RedditData>(response => response.json()).then(result => {

                    let itemsToLoad = result.data.children.map(i => {
                        return new RedditViewModel(i.data);
                    });

                    this._redditItems.load(args.index, itemsToLoad);

                    let lastItem = itemsToLoad[itemsToLoad.length - 1];
                    if (lastItem) {
                        after = itemsToLoad[itemsToLoad.length - 1].source.name;
                    }
                });
            });
        }

        return this._redditItems;
    }

    private _isScrolling = false;
    get isScrolling(): boolean {
        return this._isScrolling;
    }
    set isScrolling(value: boolean) {
        if (this._isScrolling !== value) {
            this._isScrolling = value;

            if (value) {
                cache.disableDownload();
            }
            else {
                cache.enableDownload();
            }

            this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: ISSCROLLING, value: value });
        }
    }

    get aboutText(): string {
        return aboutText;
    }

    get defaultThumbnailImageSource(): ImageSource {
        return defaultThumbnailImageSource;
    }

    get defaultNoThumbnailImageSource(): ImageSource {
        return defaultNoThumbnailImageSource;
    }
}
