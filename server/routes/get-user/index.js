const express = require('express')
const router = express.Router()
require('dotenv').config()

router.get('/api/users', (req, res) => {
  res.send({
    users: [
      {
        id: 1,
        name: 'yuki',
        age: 30,
        address: 'japan',
      },
      {
        id: 2,
        name: 'saki',
        age: 28,
        address: 'america',
      },
    ],
  })
})

module.exports = router
