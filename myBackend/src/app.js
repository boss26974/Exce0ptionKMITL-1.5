import { createServer } from 'http'

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import session from 'express-session'

import './mongoose-connect'
import schema from './graphql'
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()

//for deploy on heroku
app.set("trust proxy", 1)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ExceptionKMITL@12345',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.FRONTEND_APP_URL,
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
      if (cookies?.tokenUser) {
        token = cookies?.tokenUser
        // console.log(token)
      }
      if (cookies?.tokenAdmin) {
        token = cookies?.tokenAdmin
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
  httpServer.listen({ port: process.env.PORT })

  console.log("Server running at Port 3001")
}
startApolloServer()
