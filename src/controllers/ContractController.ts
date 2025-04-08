import { Request, Response } from 'express'
import { AppDataSource } from '../ormconfig'
import { Contract } from '../entities/Contract'
import { Budget } from '../entities/Budget'

export const getContracts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const repo = AppDataSource.getRepository(Contract)
    const all = await repo.find()
    res.json(all)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contratos', details: err })
  }
}

export const createContract = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientName, documentUrl, signedAt, budgetId } = req.body

    if (!clientName || !documentUrl || !signedAt || !budgetId) {
      res.status(400).json({ error: 'Campos obrigatórios: clientName, documentUrl, signedAt, budgetId' })
      return
    }

    const contractRepo = AppDataSource.getRepository(Contract)
    const budgetRepo = AppDataSource.getRepository(Budget)

    const budget = await budgetRepo.findOneBy({ id: budgetId })
    if (!budget) {
      res.status(404).json({ error: 'Orçamento não encontrado' })
      return
    }

    const contract = contractRepo.create({
      clientName,
      documentUrl,
      signedAt: new Date(signedAt),
      budget,
    })

    const saved = await contractRepo.save(contract)
    res.status(201).json({ id: saved.id })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar contrato', details: err })
  }
}
