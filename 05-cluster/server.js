import app from './app.js'
import { cpus } from 'os'
import cluster from 'cluster'

const port = process.env.PORT || 3000

const startWorker = () => {
  const worker = cluster.fork()
  console.log(`Cluster: ${worker.id}`)
}

if (cluster.isWorker) {
  console.log(`${cluster.worker.id}: ${process.pid}`)
}

if (cluster.isMaster) {
  cpus().forEach(() => startWorker())
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.id} disconnected with code ${code} (${signal}). Restart`,
    )
    startWorker()
  })
} else {
  app.listen(port, () => {
    console.log(`Server is starting on ${port}`)
  })
}
