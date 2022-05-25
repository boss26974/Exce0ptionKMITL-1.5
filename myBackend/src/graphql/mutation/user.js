import { schemaComposer } from "graphql-compose";
import { generateToken } from "../../lib/generateToken";
import { AdminModel } from "../../models/admin";
import { UserModel, UserTC } from "../../models/user";

export const createUser = UserTC.mongooseResolvers.createOne() //register
export const updateUser = UserTC.mongooseResolvers.updateById()
export const removeUser = UserTC.mongooseResolvers.removeById()


//user+admin Login
const LoginPayloadOTC = schemaComposer.createObjectTC({
    name: 'LoginPayload',
    fields: {
        status: 'String!',
        message: 'String',
        token: 'String',
        role: 'String'
    },
})
export const login = schemaComposer.createResolver({
    name: 'login',
    kind: 'mutation',
    type: LoginPayloadOTC,
    args: {
        email: 'String!',
        password: 'String!',
    },
    resolve: async ({ args }) => {
        const { email, password } = args
        const user = await UserModel.findOne({ email: email.toLowerCase() })
        const admin = await AdminModel.findOne({ email: email.toLowerCase() })
        if (!user && !admin) {
            return { status: 'failed', message: 'email not found', token: null }
        }

        if (user) {
            const validPassword = await user.verifyPassword(password)
            if (!validPassword) {
                return {
                    status: 'failed', message: 'Password incorrect', token: null
                }
            }
            const token = generateToken(user)
            return { status: 'success', message: 'Login success', token, role: "user" }
        }
        else if (admin) {
            const validPassword = await admin.verifyPassword(password)
            if (!validPassword) {
                return {
                    status: 'failed', message: 'Password incorrect', token: null
                }
            }
            const token = generateToken(admin)
            return { status: 'success', message: 'Login success', token, role: "admin" }
        }



    },
})

//user+admin ChangePassword
const ChangePasswordPayloadOTC = schemaComposer.createObjectTC({
    name: 'ChangePasswordPayload',
    fields: {
        status: 'String!',
        message: 'String',
    },
})

export const changePassword = schemaComposer.createResolver({
    name: 'changePassword',
    kind: 'mutation',
    type: ChangePasswordPayloadOTC,
    args: {
        _id: 'MongoID!',
        old_password: 'String!',
        new_password: 'String!'
    },
    resolve: async ({ args }) => {
        const { _id, old_password, new_password } = args
        const user = await UserModel.findById(_id)
        const admin = await AdminModel.findById(_id)
        let validPassword = null
        if (user) {
            validPassword = await user.verifyPassword(old_password)
        }
        else if (admin) {
            validPassword = await admin.verifyPassword(old_password)
        }

        if (validPassword) {
            if (user) {
                await UserModel.updateOne({ _id: _id }, { password: new_password })
            }
            else if (admin) {
                await AdminModel.updateOne({ _id: _id }, { password: new_password })
            }
            return { status: "Success", "message": "Password Updated!" }
        }
        else {
            return { status: "Failed", "message": "Old Password Incorrect." }
        }
    }
})