import { Router } from 'express'
import { createBudget, getBudgets } from '../controllers/BudgetController'

const router = Router()

router.get('/', getBudgets)
router.post('/', createBudget)

export default router
