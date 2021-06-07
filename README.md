# env-variables

Simple environment variable parser, best used along with [dotenv](https://www.npmjs.com/package/dotenv)


## Install

```bash
# With npm
npm install env-variables

# with yarn
yarn add env-variables
```

## Usage

Example usage via a config file

### config.ts

```ts
import {config} from 'dotenv'
import {string, integer} from 'env-variables'

config() // Load the .env file w/ custom variables

interface ExampleConfig {
    host: string,
    port: number,
    nodeEnvironment: number,
    redisUrl: string
}

const exampleConfig: ExampleConfig {
    nodeEnv: string('NODE_ENV', 'development'),
    host: string('HOST', '0.0.0.0'),
    port: integer('PORT', 8080),
    // Because Redis Cloud add-on on Heroku likes to be different :)
    // (totally not the sole reason I made this library)
    redisUrl: string(['REDIS_URL', 'REDISCLOUD_URL'], 'redis://localhost:6379')
}

export default exampleConfig
```

### index.ts

```ts
import config from './config' 
// ^ If you're loading the dotenv config in your source instead of through
// the command line, you want to import this first
import Fasitfy from 'fastify'
import Redis from 'ioredis'

const redis = new Redis(config.redisUrl)
const isDev = config.nodeEnv === 'development'
const app = Fastify({
    logger: isDev,
    trustProxy: !isDev
})

app.get('/', (_, reply) => reply.code(200).send())

app.listen(config.port, config.host)
```

## API
- `string(keyOrKeys[, defaultValue])` Return's a string key

- `number/integer(key[, defaultValue])` Returns a number/integer

- `boolean(key[, defaultValue])` Returns a boolean, defaults to false

- `stringGlob(keyPattern)` Returns all values as strings mapped by their keys that match `keyPattern`