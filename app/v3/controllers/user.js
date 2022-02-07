const sql = require("../config/db")();
exports.create = async (req, res) => {
  if (!req.body) {
    await res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
//   sql.getConnection((err,connect)=>{
//     connect.beginTransaction((err)=>{
//       if(err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the User."
//         });
//       let query = " insert into user (name, email, password) values ('test1', 'test1@mail.com', 'password'); "+
//                   " insert into customer (id, first_name, last_name, dob, address) values (last_insert_id(), 'test1', 'test01', '','test'); "
//       connect.query(query, (err, data) => {
//         if (err){
//           connect.rollback((error)=>{
//             res.status(500).send({
//               message:
//                 err.message || "Some error occurred while creating the User."
//             });
//           });          
//         }
//         else {
//           connect.commit((err,success)=>{
//             res.send({message:"Data saved successfully"});
//           });          
//         }
//       });
//     });    
//   });  
};