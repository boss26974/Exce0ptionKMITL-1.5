import { createServer } from 'http'

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'

import './mongoose-connect' //connect ก่อน import schema
import schema from './graphql'
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:3000', //น่าจะต้องแก้ถ้าจะ deploy
  credentials: true
}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: 'Server running at Port 3001' })
})

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
      if (headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        //ไว้ทดสอบผ่าน playground
        token = headers?.authorization?.split(' ')?.[1]
        // console.log(headers.authorization)
      }
      if (token) {
        const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        return { userId: payload.userId }
      }
      return { userId: null }
    }
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql', cors: {origin: ['*']} })
  httpServer.listen({ port: 3001 })
}
startApolloServer()
