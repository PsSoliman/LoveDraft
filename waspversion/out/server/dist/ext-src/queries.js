import HttpError from '../core/HttpError.js';
export const getCoverLetter = async ({ id }, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.CoverLetter.findFirstOrThrow({
        where: {
            id,
            user: { id: context.user.id },
        },
    });
};
export const getCoverLetters = async ({ id }, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.CoverLetter.findMany({
        where: {
            job: { id },
            user: { id: context.user.id },
        },
    });
};
export const getJobs = async (_args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.Job.findMany({
        where: {
            user: { id: context.user.id },
        },
        include: {
            coverLetter: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
export const getJob = async ({ id }, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.Job.findFirstOrThrow({
        where: {
            id,
            user: { id: context.user.id },
        },
        include: {
            coverLetter: true,
        },
    });
};
export const getUserInfo = async (_args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.User.findUniqueOrThrow({
        where: {
            id: context.user.id,
        },
        select: {
            letters: true,
            id: true,
            email: true,
            hasPaid: true,
            notifyPaymentExpires: true,
            credits: true,
        },
    });
};
export const getCoverLetterCount = async (_args, context) => {
    return context.entities.CoverLetter.count();
};
//# sourceMappingURL=queries.js.map