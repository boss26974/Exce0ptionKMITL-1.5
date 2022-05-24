import { schemaComposer } from "graphql-compose"
import { AdminModel, AdminTC } from "../../models/admin"

export const Admins = AdminTC.mongooseResolvers.findMany()
export const AdminId = AdminTC.mongooseResolvers.findById()


export const currentAdmin = schemaComposer.createResolver({
    name: 'currentAdmin',
    kind: 'query',
    type: AdminTC.getType(),
    resolve: async ({ context }) => {
        const { userId: _id } = context
        if (!_id) {
            throw new UserInputError('User ID not found in token')
        }
        const admin = await AdminModel.findById(_id)
        return admin
    }
})