const handleRegister = (req, res, db, bcrypt) => {

    const { email, name, password } = req.body
    if(!(email && name && password)){
        return res.status(400).json("incorrect form submission")
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')//returns the last entered row
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    
    .catch(err => res.status(400).json('Unable to register'))

    // //----------bcrypt for hassing the password---------------
// //---------------***********------------------------------
    //using returning we dont have to use select statment
    //read about transaction control it works on atomicity
    //if one process fails all the process will get failed
    // commit if sucess else rollback

//************** ******************* */

    
}

module.exports = {
    handleRegister: handleRegister
};