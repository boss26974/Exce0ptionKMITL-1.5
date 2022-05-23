import { GraphQLString } from "graphql";
import { User } from "../../Entities/User";
import { UserType } from "../TypeDefs/User";


export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString},
        username: { type: GraphQLString},
        password: { type: GraphQLString},
    },
    async resolve(parent: any, args: any) {
        const {name, username, password} = args
        await User.insert({ name, username, password })
        return args
    }
}