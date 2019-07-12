const BeeQueue = require('bee-queue')

const redisConfig = require('../config/redis')
const CancellationMail = require('../app/Domains/Appointments/Jobs/CancellationMail')
const jobs = [CancellationMail]

class Queue {
  constructor() {
    this.queues = {}

    this.init()
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new BeeQueue(key, {
          redis: redisConfig,
        }),
        handle,
      }
    })
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save()
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key]

      bee.on('failed', this.handleFailure).process(handle)
    })
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err)
  }
}

module.exports = new Queue()
