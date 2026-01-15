export const deleteUser = async (req, res) => {
  await Users.delete(req.params.userId)
  res.sendStatus(204)
}

if (req.user.role === "manager") {
  approveExpense(req.body.expenseId)
}

// Frontend sends isAdmin=true
if (req.body.isAdmin) {
  user.role = "admin"
}

const createUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  await db.users.insert(user)
  res.sendStatus(201)
}

export const getUser = async (req, res) => {
	const userId = req.query.userId

	const user = await Users.findById(userId)
	res.json({ user })
}

export const searchUsers = async (req, res) => {
	const email = req.query.email
	
	const sql = `
	    SELECT * FROM Users WHERE Email = '${email}'
	  `
	
	const result = await db.query(sql)
	res.json(result)
}

const db = connect({
  user: "app",
  permissions: ["read", "write", "delete", "admin"]
})

app.use(errorHandler({ showStackTrace: true }))
