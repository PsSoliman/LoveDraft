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
var _SubmittedJob_job, _SubmittedJob_jobId;
/**
 * This is the result of submitting a Job to some executor.
 * It can be used by callers to track things, or call executor-specific subclass functionality.
 */
export class SubmittedJob {
    /**
     * @param {Job} job - The Job that submitted work to an executor.
     * @param {string} jobId - A UUID for a submitted job in that executor's ecosystem.
     */
    constructor(job, jobId) {
        _SubmittedJob_job.set(this, void 0);
        _SubmittedJob_jobId.set(this, void 0);
        __classPrivateFieldSet(this, _SubmittedJob_job, job, "f");
        __classPrivateFieldSet(this, _SubmittedJob_jobId, jobId, "f");
    }
    get jobId() {
        return __classPrivateFieldGet(this, _SubmittedJob_jobId, "f");
    }
    get jobName() {
        return __classPrivateFieldGet(this, _SubmittedJob_job, "f").jobName;
    }
    get executorName() {
        return __classPrivateFieldGet(this, _SubmittedJob_job, "f").executorName;
    }
}
_SubmittedJob_job = new WeakMap(), _SubmittedJob_jobId = new WeakMap();
//# sourceMappingURL=SubmittedJob.js.map