import express from 'express'

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'

import { schema } from './Schema'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { createServer } from 'http'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const startApolloServer = async () => {
    const httpServer = createServer(app)
    const apolloServer = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      context: ({ req }) => {
        const { cookies, headers } = req
        // console.log(req?.cookies)
        let token = null
        if (cookies?.token) {
          token = cookies?.token
          // console.log(token)
        }
        // if (headers?.authorization?.split(' ')?.[0] === 'Bearer' && !headers.authorization.split(' ')[1] == true) {
        //   token = headers?.authorization?.split(' ')?.[1]

        //   console.log(headers.authorization)
        // }
        // if (token) {
        //   const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        //   // console.log(payload)
        //   return { userId: payload.userId }
        // }
        // return { userId: null }
      }
    })
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        database: "testschema", //fswd-exceptionitkmitl
        username: "root", //admin
        password: "",
        logging: true,
        synchronize: false,
        entities: ["entities/*.ts"]
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app, path: '/graphql', cors: {origin: ['*']} })
    httpServer.listen({ port: 3001 })
  }
startApolloServer()


app.get('/', (req, res) => {
    res.json({ message: 'Server running at Port 3001' })
})