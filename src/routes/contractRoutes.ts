import { Router } from 'express'
import { getContracts, createContract } from '../controllers/ContractController'

const router = Router()

router.get('/', getContracts)
router.post('/', createContract)

export default router
