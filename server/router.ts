import * as express from 'express'

const router = express.Router()

router.get('/', (req, res)=>{
   res.send('server is up an running') 
})

export default router