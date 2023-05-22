import { generateAvailableUsername } from '../core/auth.js';
export async function getUserFields(_context, args) {
    const username = await generateAvailableUsername(args.profile.displayName.split(' '), { separator: '.' });
    const email = args.profile.emails[0].value;
    return { username, email };
}
export function config() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    return {
        clientID,
        clientSecret,
        scope: ['profile', 'email'], // must include at least 'profile' for Google
    };
}
//# sourceMappingURL=auth.js.map