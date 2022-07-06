const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")
const userController = require("../controllers/UserController")

router.get('/', userController.getUser)

router.post('/', userController.addUser)

router.put('/', userController.updateUser )

router.patch('/', userController.patchUser)

router.delete('/', userController.deleteUser)

module.exports = router