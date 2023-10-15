const { signup, login, insertData, insertExpense, insertIncome, Adminlogin, banAccount, MessageInsert, GetMessage } = require("./useController");

const router = require("express").Router();

router.post("/postData", signup)
router.post("/getData", login)
router.post("/insertData", insertData)
router.post("/insertExpense", insertExpense)
router.post("/insertIncome", insertIncome)
router.post("/Adminlogin", Adminlogin)
router.post("/BanAccount", banAccount)
router.post("/MessageInsert", MessageInsert)
router.post("/GetMessage", GetMessage)

module.exports = router;