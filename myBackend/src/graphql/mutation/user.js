import { schemaComposer } from "graphql-compose";
import { generateToken } from "../../lib/generateToken";
import { UserModel, UserTC } from "../../models/user";

export const createUser = UserTC.mongooseResolvers.createOne() //register
export const updateUser = UserTC.mongooseResolvers.updateById()
// export const removeUser = UserTC.mongooseResolvers.removeById()

const LoginPayloadOTC = schemaComposer.createObjectTC({
    name: 'LoginPayload',
    fields: {
      status: 'String!',
      message: 'String',
      token: 'String',
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
      if (!user) {
        return {status: 'failed', message: 'email not found', token: null}
      }
      const validPassword = await user.verifyPassword(password) //verify by JWT
      if (!validPassword) {
        return {status: 'failed', message: 'Password incorrect',token: null
        }
      }
      const token = generateToken(user)
      return {status: 'success', message: 'Login success', token}
    },
  })