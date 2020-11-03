import { HammerGestureConfig } from '@angular/platform-browser';
import * as hammer from 'hammerjs';

export class HammerConfig extends HammerGestureConfig {
    overrides = {
        swipe: { direction: hammer.DIRECTION_VERTICAL },
        pan: { direction: hammer.DIRECTION_VERTICAL },
        pinch: { enable: false },
        rotate: { enable: false }
    } as any;

    // buildHammer(element: HTMLElement) {
    //     const mc = new hammer(element, {
    //         touchAction: 'auto',
    //         inputClass: hammer.SUPPORT_POINTER_EVENTS ? hammer.PointerEventInput : hammer.TouchInput,
    //         recognizers: [
    //             [hammer.Swipe, {
    //                 direction: hammer.DIRECTION_VERTICAL
    //             }]
    //         ]
    //     });
    //     return mc;
    // }
}
