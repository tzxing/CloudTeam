import { GraphQLClient } from "graphql-request";
import store from "./store";

interface Variables { [key: string]: any; }

class MyGraphQLClient extends GraphQLClient {
    public async request<T extends any>(
        query: string,
        variables?: Variables
    ): Promise<T> {
        this.setHeader("Authorization", "Bearer " + (store.state as any).user.access_token);
        return super.request(query, variables);
    }
}

export function gql(strings: TemplateStringsArray, ...keys: string[]): string {
    const result = [strings[0]];
    keys.forEach((v, i) => {
        result.push(v, strings[i + 1]);
    });
    return result.join("");
}

declare module "vue/types/vue" {
    interface Vue {
        $graphql: MyGraphQLClient;
    }
}

export const GQLClient = new MyGraphQLClient("/api/graphqlp");

export default {
    install(vue: any) {
        Object.defineProperty(vue.prototype, "$graphql", { value: GQLClient });
    }
};
