import express from 'express'
import AppDataSource from './data-source'
import budgetRoutes from './routes/budgetRoutes'
import contractRoutes from './routes/contractRoutes'

const app = express()
app.use(express.json())

app.use('/budgets', budgetRoutes)
app.use('/contracts', contractRoutes)

AppDataSource.then(() => {
  console.log('📦 Conectado ao banco de dados')
  app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000')
  })
}).catch((err) => console.error('Erro ao conectar no banco', err))
