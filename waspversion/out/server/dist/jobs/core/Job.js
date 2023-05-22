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
var _Job_jobName, _Job_executorName;
/**
 * This is a definition of a job (think draft or invocable computation), not the running instance itself.
 * This can be submitted one or more times to be executed by some job executor via the same instance.
 * Once submitted, you get a SubmittedJob to track it later.
 */
export class Job {
    /**
     * @param {string} jobName - Job name, which should be unique per executor.
     * @param {string} executorName - The name of the executor that will run submitted jobs.
     */
    constructor(jobName, executorName) {
        _Job_jobName.set(this, void 0);
        _Job_executorName.set(this, void 0);
        __classPrivateFieldSet(this, _Job_jobName, jobName, "f");
        __classPrivateFieldSet(this, _Job_executorName, executorName, "f");
    }
    get jobName() {
        return __classPrivateFieldGet(this, _Job_jobName, "f");
    }
    get executorName() {
        return __classPrivateFieldGet(this, _Job_executorName, "f");
    }
    // NOTE: Subclasses must implement this method.
    delay(...args) {
        throw new Error('Subclasses must implement this method');
    }
    // NOTE: Subclasses must implement this method.
    async submit(...args) {
        throw new Error('Subclasses must implement this method');
    }
}
_Job_jobName = new WeakMap(), _Job_executorName = new WeakMap();
//# sourceMappingURL=Job.js.map