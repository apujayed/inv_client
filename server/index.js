const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "inventory_2021",
});



app.post("/create", (req, res) => {
  const adata = req.body.adata;
console.log(adata);

  db.query(
    "INSERT INTO `accounts`(`cus_id`,`name`,`subhead`,`proprietor`,`subaddress`,`address`,`contact`,`posted`) VALUES (?,?,?,?,?,?,?,?)",
    [adata.cus_id,adata.name,adata.subhead,adata.proprietor,adata.subaddress,adata.address,adata.contact],
    (err, result) => {
      if (err) {
       console.log(err)
      } else {
        res.send("done");
      }
    }
  );
});


app.post("/createtransaction", (req, res) => {
  const adata = req.body.adata;
console.log(adata);

  db.query(
    "INSERT INTO `transaction`(`cus_id`,`c_id`, `date`, `payment`, `receive`,`comments`, `posted`,`t_type`) VALUES (?,?,?,?,?,?,?,?)",
    [adata.cus_id,adata.name,adata.date,adata.payment,adata.receive,adata.comments,adata.posted,1],
    (err, result) => {
      if (err) {
       console.log(err)
      } else {
        res.send("done");
      }
    }
  );
});


app.post("/cartstore", (req, res) => {
  const adata = req.body.adata;
console.log(adata);
adata.forEach(element => {
  s_ty = element.sell_type;
  const pay = s_ty=="SELL"?element.total:0; 
  const rec = s_ty=="PUR"?element.total:0; 
  db.query(
    "INSERT INTO `transaction`(`cus_id`, `date`, `c_id`, `p_id`, `qty_1`,`qty_2`, `rate`, `payment`, `receive`, `g_total`, `s_type`, `comments`, `t_belong`, `posted`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    ['INV-2021','2022-01-01', element.account, element.p_id, element.qty1,element.qty2,element.rate,pay,rec,element.total,element.sell_type,element.particular,element.sell_type,'Apu'],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
});
res.send("Values Inserted");
});


app.get("/productstock", (req, res) => {
  
  db.query("SELECT id from product where status = 0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // var ret = [];
      // ret = (JSON.stringify(result));
      console.log(typeof result);
     console.log(result[0]);
     result.forEach(e =>{
       console.log(e.id);
       db.query(
        "UPDATE `transaction` SET  `p_id`= ?,`qty_1`= ?,`qty_2`= ?,`rate`= ?,`payment`= ?,`receive`= ?,`g_total`= ?,`comments`= ?,`memo`= ? WHERE id= ?",
        [element.p_id, element.qty1,element.qty2,element.rate,pay,rec,element.total,'particular','memo',element.id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
           
            db.query(
              "UPDATE `transaction` SET  `p_id`= ?,`qty_1`= ?,`qty_2`= ?,`rate`= ?,`payment`= ?,`receive`= ?,`g_total`= ?,`comments`= ?,`memo`= ? WHERE id= ?",
              [element.p_id, element.qty1,element.qty2,element.rate,pay,rec,element.total,'particular','memo',element.id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
               
      
                }
              }
            );


          }
        }
      );
     })
      res.send(result);
    }
  });
});

app.put("/updatesell", (req, res) => {
  const adata = req.body.adata;
console.log(adata);
adata.forEach(element => {
 s_ty = element.id;
  // console.log(`id`+s_ty);
  const pay = s_ty=="SELL"?element.total:0; 
  const rec = s_ty=="PUR"?element.total:0; 
  db.query(
    "UPDATE `transaction` SET  `p_id`= ?,`qty_1`= ?,`qty_2`= ?,`rate`= ?,`payment`= ?,`receive`= ?,`g_total`= ?,`comments`= ?,`memo`= ? WHERE id= ?",
    [element.p_id, element.qty1,element.qty2,element.rate,pay,rec,element.total,'particular','memo',element.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
});
res.send("Values Inserted");
});


app.get("/shead", (req, res) => {
  console.log("kdnfn");
  db.query("SELECT * FROM subhead where status = 0", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    
    }
  });
});






app.get("/selldata", (req, res) => {
  
  db.query("SELECT (transaction.cus_id),date,count(transaction.p_id) as product,sum(transaction.g_total) as total,accounts.name, transaction.posted,transaction.s_type,transaction.b_type FROM transaction INNER JOIN accounts ON transaction.c_id = accounts.id where transaction.status=0 and transaction.date='2022-01-01' GROUP BY transaction.cus_id ORDER BY transaction.id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});




app.get("/accounts", (req, res) => {
  
  db.query("SELECT * FROM accounts order by id desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/product", (req, res) => {
  
  db.query("SELECT * FROM product order by id desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
});

app.put("/sproduct", (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query("select * from product WHERE id = ?",
  [id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/transaction", (req, res) => {
  
  db.query("SELECT (transaction.id),transaction.cus_id,transaction.c_id,accounts.name,transaction.payment,transaction.receive,transaction.comments,transaction.posted FROM transaction INNER JOIN accounts on transaction.c_id=accounts.cus_id where transaction.t_type!=0 order by transaction.id desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/employees", (req, res) => {
  
  db.query("SELECT * FROM accounts order by id desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/selectsell", (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query("SELECT (transaction.id),transaction.s_type,transaction.b_type,accounts.name,accounts.cus_id,transaction.comments,transaction.p_id,product.p_name as product,transaction.qty_1 as qty1,transaction.qty_2 as qty2,transaction.rate,transaction.g_total as total,transaction.memo,product.qty_1,product.qty_2,product.qty_3 FROM `transaction` INNER JOIN accounts on transaction.c_id=accounts.id INNER JOIN product on transaction.p_id=product.id WHERE transaction.cus_id = ?",
  [id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/selectacccount", (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query("select * from accounts WHERE id = ?",
  [id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/selecttransaction", (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query("SELECT (transaction.id),transaction.c_id,accounts.name,transaction.payment,transaction.receive,transaction.comments,transaction.posted FROM transaction INNER JOIN accounts on transaction.c_id=accounts.cus_id where transaction.t_type!=0 and transaction.id = ? ",
  [id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/updatetransaction", (req, res) => {
  // const id = req.body.id;
  const accounts = req.body.adata;
  console.log(accounts);
  db.query(
    "UPDATE transaction SET c_id = ? ,payment= ? ,receive= ? ,comments= ?   WHERE id= ?",
    [accounts.c_id,accounts.payment,accounts.receive,accounts.comments,accounts.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.put("/update", (req, res) => {
  // const id = req.body.id;
  const accounts = req.body.adata;
  console.log(accounts);
  db.query(
    "UPDATE accounts SET cus_id= ? ,name= ? ,proprietor= ? ,subaddress= ? ,address= ? ,contact= ?  WHERE id= ?",
    [accounts.cus_id,accounts.name,accounts.proprietor,accounts.subaddress,accounts.address,accounts.contact,accounts.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});




app.put("/deleteaccount", (req, res) => {
  // const id = req.body.id;
  const id = req.body.id;
  console.log(id);
  db.query(
    "UPDATE accounts SET status = 1 WHERE id= ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3009, () => {
  console.log("Yey, your server is running on port 3009");
});
