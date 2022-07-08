const handleRegister = (props) => {
  const req = props.req;
  const res = props.res;
  const db = props.db;
  const bcrypt = props.bcrypt;

  app.post("/register", (req, res) => {
    const { email, name, password } = req.body;

    const hash = bcrypt.hashSync(password);
    db.tran;

    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  });
};

export {handleRegister};
