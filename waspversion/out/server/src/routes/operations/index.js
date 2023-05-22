import express from 'express'

import auth from '../../core/auth.js'

import generateCoverLetter from './generateCoverLetter.js'
import createJob from './createJob.js'
import updateJob from './updateJob.js'
import updateCoverLetter from './updateCoverLetter.js'
import generateEdit from './generateEdit.js'
import editCoverLetter from './editCoverLetter.js'
import updateUser from './updateUser.js'
import updateUserHasPaid from './updateUserHasPaid.js'
import deleteJob from './deleteJob.js'
import stripePayment from './stripePayment.js'
import stripeCreditsPayment from './stripeCreditsPayment.js'
import getJobs from './getJobs.js'
import getJob from './getJob.js'
import getCoverLetter from './getCoverLetter.js'
import getCoverLetters from './getCoverLetters.js'
import getUserInfo from './getUserInfo.js'
import getCoverLetterCount from './getCoverLetterCount.js'

const router = express.Router()

router.post('/generate-cover-letter', auth, generateCoverLetter)
router.post('/create-job', auth, createJob)
router.post('/update-job', auth, updateJob)
router.post('/update-cover-letter', auth, updateCoverLetter)
router.post('/generate-edit', auth, generateEdit)
router.post('/edit-cover-letter', auth, editCoverLetter)
router.post('/update-user', auth, updateUser)
router.post('/update-user-has-paid', auth, updateUserHasPaid)
router.post('/delete-job', auth, deleteJob)
router.post('/stripe-payment', auth, stripePayment)
router.post('/stripe-credits-payment', auth, stripeCreditsPayment)
router.post('/get-jobs', auth, getJobs)
router.post('/get-job', auth, getJob)
router.post('/get-cover-letter', auth, getCoverLetter)
router.post('/get-cover-letters', auth, getCoverLetters)
router.post('/get-user-info', auth, getUserInfo)
router.post('/get-cover-letter-count', auth, getCoverLetterCount)

export default router
