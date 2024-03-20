import {Router} from 'express'
import {getAllRemainders, getOneById, createRemainder, updateOne, deleteRemainder} from '../controllers/remainder.controller.js'

const router = Router()

router.route("/reminders")
    .get ( getAllRemainders )
    .post ( createRemainder )

router.route("/reminders/:id")
    .get(getOneById)
    .put(updateOne)
    .delete(deleteRemainder)

export default router