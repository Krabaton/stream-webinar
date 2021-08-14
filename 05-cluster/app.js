import express from 'express'
import cluster from 'cluster'

const app = express()

const delay = (time) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

app.use((req, res, next) => {
  if (cluster.isWorker) {
    console.log('ID: ', cluster.worker.id)
  }
  next()
})

app.get('/', async function (req, res, next) {
  await delay(1000)
  res.send('Hello guys!')
})

export default app
