import express from 'express'
import { requireAuth } from '../middlewares/auth.js'
import { list , create , get , update , remove , generate, loadOwnProjects } from '../controllers/projectController.js'
import { githubRoute, vercelRoute } from './projectDeploy.js'

const projectRouter = express.Router()

projectRouter.get('/' , requireAuth,list)
projectRouter.post('/' , requireAuth,create)


projectRouter.get('/:id' , requireAuth,get)
projectRouter.patch('/:id' , requireAuth,update)

projectRouter.delete('/:id' , requireAuth,remove)
projectRouter.post('/:id/generate' , requireAuth,generate)

//to deploy the project on vercel and create a repo on github

projectRouter.use("/:id/github",requireAuth,githubRoute(loadOwnProjects))
projectRouter.post('/:id/deploy',requireAuth,vercelRoute(loadOwnProjects))

export default projectRouter;