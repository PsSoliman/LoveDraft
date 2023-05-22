var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SimpleJob_jobFn, _SimpleJob_delaySeconds;
import { sleep } from '../../utils.js';
import { Job } from './Job.js';
import { SubmittedJob } from './SubmittedJob.js';
export const SIMPLE_EXECUTOR_NAME = Symbol('Simple');
/**
 * A simple job mainly intended for testing. It will not submit work to any
 * job executor, but instead will simply invoke the underlying perform function.
 * It does not support `schedule`. It does not require any extra NPM dependencies
 * or infrastructure, however.
 */
class SimpleJob extends Job {
    /**
     *
     * @param {string} jobName - Name of the Job.
     * @param {fn} jobFn - The Job function to execute.
     * @param {int} delaySeconds - The number of seconds to delay invoking the Job function.
     */
    constructor(jobName, jobFn, delaySeconds = 0) {
        super(jobName, SIMPLE_EXECUTOR_NAME);
        _SimpleJob_jobFn.set(this, void 0);
        _SimpleJob_delaySeconds.set(this, void 0);
        __classPrivateFieldSet(this, _SimpleJob_jobFn, jobFn, "f");
        __classPrivateFieldSet(this, _SimpleJob_delaySeconds, delaySeconds, "f");
    }
    /**
     * @param {int} delaySeconds - Used to delay the processing of the job by some number of seconds.
     */
    delay(delaySeconds) {
        return new SimpleJob(this.jobName, __classPrivateFieldGet(this, _SimpleJob_jobFn, "f"), delaySeconds);
    }
    async submit(jobArgs) {
        sleep(__classPrivateFieldGet(this, _SimpleJob_delaySeconds, "f") * 1000).then(() => __classPrivateFieldGet(this, _SimpleJob_jobFn, "f").call(this, jobArgs));
        // NOTE: Dumb random ID generator, mainly so we don't have to add `uuid`
        // as a dependency in the server generator for something nobody will likely use.
        const jobId = (Math.random() + 1).toString(36).substring(7);
        return new SubmittedJob(this, jobId);
    }
}
_SimpleJob_jobFn = new WeakMap(), _SimpleJob_delaySeconds = new WeakMap();
export function createJob({ jobName, jobFn } = {}) {
    return new SimpleJob(jobName, jobFn);
}
//# sourceMappingURL=simpleJob.js.map