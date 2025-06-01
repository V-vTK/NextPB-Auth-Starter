import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { POCKET_BASE_URL } from './pocketbaseUrl';


// https://blog.mahad.dev/setting-up-nextjs-and-pocketbase-for-authentication
export class PocketBaseClient {
    client: PocketBase;

    constructor () {
        this.client = new PocketBase(POCKET_BASE_URL);
    }

    async authenticate (email: string, password: string) {
        try {
            const result = await this.client.collection("users").authWithPassword(email, password);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }

    async register (email: string, password: string, username: string) {
        try {
            const result = await this.client.collection("users").create({
                "email": email,
                "password": password,
                "passwordConfirm": password,
                "username": username
            });
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }

    async getPBUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model;
    }

    async getPBclient(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }
        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client
    }
}

export const pocketbase = new PocketBaseClient();

export default pocketbase;