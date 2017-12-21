import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class TrackerService {
    promiseList: Array<Promise<any> | Subscription> = [];
    delayPromise: number | any;
    durationPromise: number | any;
    delayJustFinished: boolean = false;
    minDuration: number;

    reset(options: IPromiseTrackerOptions) {
        this.minDuration = options.minDuration;

        this.promiseList = [];
        options.promiseList.forEach(promise => {
            if (!promise || promise['busyFulfilled']) {
                return;
            }
            this.addPromise(promise);
        });

        if (this.promiseList.length === 0) {
            return;
        }

        this.delayJustFinished = false;
        if (options.delay) {
            this.delayPromise = setTimeout(
                () => {
                    this.delayPromise = undefined;
                    this.delayJustFinished = true;
                },
                options.delay
            );
        }
        if (options.minDuration) {
            this.durationPromise = setTimeout(
                () => {
                    this.durationPromise = undefined;
                },
                options.minDuration + (options.delay || 0)
            );
        }
    }

    isActive() {
        if (this.delayPromise) {
            return false;
        }

        if (!this.delayJustFinished) {
            if (this.durationPromise) {
                return true;
            }
            return this.promiseList.length > 0;
        }

        this.delayJustFinished = false;
        if (this.promiseList.length === 0) {
            this.durationPromise = undefined;
        }
        return this.promiseList.length > 0;
    }

    private addPromise(promise: Promise<any> | Subscription) {
        if (this.promiseList.indexOf(promise) !== -1) {
            return;
        }

        this.promiseList.push(promise);

        if (promise instanceof Promise) {
            promise.then.call(
                promise,
                () => this.finishPromise(promise),
                () => this.finishPromise(promise)
            );
        } else {
            promise.add(() => this.finishPromise(promise));
        }
    }

    private finishPromise(promise: Promise<any> | Subscription) {
        promise['busyFulfilled'] = true;
        const index = this.promiseList.indexOf(promise);
        if (index === -1) {
            return;
        }
        this.promiseList.splice(index, 1);
    }

}

export interface IPromiseTrackerOptions {
    minDuration: number;
    delay: number;
    promiseList: Promise<any>[];
}
