const router = require('express').Router();
const Account = require('./accounts-model');
const md = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Account.getAll()
  .then(data => {
    res.json(data)
  })
  .catch(next)
})

router.get('/:id', md.checkAccountId, (req, res) => {
  res.json(res.user)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', md.checkAccountId, md.checkAccountPayload, async (req, res, next) => {
  const updated = await Account.updateById(req.params.id, req.body)
  res.json(updated)
  try {
    res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json(err.message);
})


module.exports = router;
