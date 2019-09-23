import Express from 'express'
import HttpStatus from 'http-status-codes'
import { IRtmp } from '../interfaces/IRtmp'
import { Streaming } from '../entity/Streaming'

const router = Express.Router()

type findUser = Streaming | undefined

router.post('/auth', (req: Express.Request, res: Express.Response) => {
  return verifiedStream(req, res, true)
})

router.post('/done', (req: Express.Request, res: Express.Response) => {
  return verifiedStream(req, res, false)
})

async function verifiedStream(
  req: Express.Request,
  res: Express.Response,
  streamStatus: boolean
) {
  const request = <IRtmp>req.body

  const streaming: findUser = await Streaming.findOne({
    streamingToken: request.name
  }).then(streaming => {
    return streaming
  })

  if (!streaming) {
    return res.status(HttpStatus.NOT_FOUND).send({ verified: false })
  }

  streaming.streamStatus = streamStatus
  streaming.save()

  return res.status(HttpStatus.OK).json({ verified: true })
}

export default router
