const kue = require('kue')

const redisConfig = {
    host: process.env.REDIS_CONFIG_HOST,
    port: process.env.REDIS_CONFIG_PORT,
    auth: process.env.REDIS_CONFIG_AUTH
}

const queue = kue.createQueue({ redis: redisConfig })

module.exports = queue