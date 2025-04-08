// controllers/BudgetController.ts
import { Request, Response } from 'express'
import { Budget } from '../entities/Budget'
import { AppDataSource } from '../ormconfig'
// controllers/BudgetController.ts
export const getBudgets = async (_req: Request, res: Response): Promise<void> => {
  try {
    const repo = AppDataSource.getRepository(Budget)
    const all = await repo.find()
    res.json(all) // não precisa de return aqui
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar orçamentos', details: err })
  }
}

export const createBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientName, description, value } = req.body

    if (!clientName || !description || value == null) {
      res.status(400).json({ error: 'Campos obrigatórios: clientName, description, value' })
      return
    }

    const repo = AppDataSource.getRepository(Budget)
    const budget = repo.create({ clientName, description, value })

    const saved = await repo.save(budget)
    res.status(201).json({ id: saved.id })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar orçamento', details: err })
  }
}
