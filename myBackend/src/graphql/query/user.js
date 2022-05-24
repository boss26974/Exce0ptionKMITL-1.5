import { schemaComposer } from "graphql-compose"
import { UserModel, UserTC } from "../../models/user"

export const Users = UserTC.mongooseResolvers.findMany()
export const UserId = UserTC.mongooseResolvers.findById()

export const currentUser = schemaComposer.createResolver({
    name: 'currentUser',
    kind: 'query',
    type: UserTC.getType(),
    resolve: async ({ context }) => {
        const { userId: _id } = context
        if (!_id) {
            throw new UserInputError('User ID not found in token')
        }
        const user = await UserModel.findById(_id)
        return user
    }
})