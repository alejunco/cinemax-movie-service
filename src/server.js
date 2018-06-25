require('dotenv').config()

const Hapi = require('hapi')

// Plugins
const pack = require('../package.json')
const hapiSwagger = require('hapi-swagger')

// Routes
const moviesRoute = require('./routes/movies.route')
const healthCheckRoute = require('./routes/health-check.route')

const host = process.env.NODE_HOST || '0.0.0.0'
const port = process.env.NODE_PORT || 3000

async function start() {
  const server = await new Hapi.Server({
    host,
    port,
  })

  // Auth
  await server.register(authToken)
  server.auth.strategy('token', 'token')

  // Plugins
  await server.register([
    inert,
    vision,
    {
      plugin:  hapiSwagger,
      options: {
        info: {
          title:   'Organization Service API Documentation',
          version: pack.version,
        },
      },
    },
    corsHeaders
  ])

  server.route([
    ...moviesRoute,
    healthCheckRoute,
  ])

  try {
    await server.start()
    console.info(`Server started in port: ${process.env.NODE_PORT}`) // eslint-disable-line
  } catch (err) {
    captureException(err)
    console.error(err) // eslint-disable-line
  }
}

start()
