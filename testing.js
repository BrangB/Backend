// const adodb = require('node-adodb');
// const bcrypt = require("bcrypt");
// const mysql = require("mysql")


// module.exports.signup = async(req, res, next) => {

//     const fetchData = async() => {
//         const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//         const {name, email, password} = req.body;

//         const checkUsername = await connection.query(`SELECT * FROM UserData WHERE Name = "${name}"`)
//         const checkEmail = await connection.query(`SELECT * FROM UserData WHERE Email = "${email}"`)
//         if (checkUsername.length > 0)
//             return res.json({msg: "Username already used", status: false})

//         if(checkEmail.length > 0)
//             return res.json({msg: "Email already used", status: false})

//         if(!(checkUsername.length > 0) || !(checkEmail.length > 0)){
//             return res.json({msg: "First Step is done", status: true})
//         }else{
//             return res.json({msg: "There is something wrong in our server", status: false})
//         }
        
//         // try {
//         //     const hashedPassword = await bcrypt.hash(password, 10)
//         //     const query = `INSERT INTO UserData VALUES (${randomNumber}, "${name}", "${email}", "${hashedPassword}")`;
//         //     await connection.execute(query);
//         //     res.json({msg: "Account is created successfully", status: true});
//         // }catch(error) {
//         //     res.json({msg: "In Sever, creating account problem", status: false});
//         //     next(error)
//         // }

//         //Update
//         // try{
//         //     const query = `UPDATE Test SET Name = "Mya Mya" WHERE Name = "Brang"`;
//         //     await connection.execute(query);
//         // }catch(error){
//         //     console.log(error)
//         //     next(error)
//         // }

//         //Delete
//         // try{
//         //     const query = `DELETE FROM Test WHERE Name = "${name}"`;
//         //     await connection.execute(query);
//         // }catch(error){
//         //     console.log(error)
//         // }
//     }
//     fetchData()

// };

// module.exports.login = async(req, res, next) => {
//     const {name, password} = req.body;
//     const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');

//     try{
//         const result = await connection.query(`SELECT * FROM UserData WHERE Name = "${name}"`);
//         if(result.length === 0){
//             res.json({msg: "Invalid Username", status: false});
//         }else{
//             const isPasswordValid = await bcrypt.compare(password, result[0].Password)
//             const expenseData = await connection.query(`SELECT * FROM ExpenseData WHERE UserID = ${result[0].Id}`)
//             if(!isPasswordValid){
//                 return res.json({msg: "Wrong Password", status: false})
//             }
//             if(isPasswordValid){
//                 const PersonalData = await connection.query(`Select * FROM UserPersonalData WHERE UserId = ${result[0].Id}`)
//                 const IncomeData = await connection.query(`Select * FROM Income WHERE UserID = ${result[0].Id}`)
//                 if(PersonalData[0].Active){
//                     return res.json({msg: "Log In successfully", status: true, userData: result[0], personalData: PersonalData, expenses: expenseData, incomeData: IncomeData})
//                 }else{
//                     return res.json({msg: "Your account is temporarily banned", status: false})
//                 }

//             }
//         }
//       }catch (error) {
//         next(error)
//       }
// }

// module.exports.Adminlogin = async(req, res, next) => {
//     const {name, password} = req.body;
//     const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');

//     try{
//         const result = await connection.query(`SELECT * FROM Administrator WHERE AdminName = "${name}"`);
//         if(result.length === 0){
//             res.json({msg: "Invalid Admin", status: false});
//         }else{
//             const isPasswordValid = await bcrypt.compare(password, result[0].AdminPassword)
//             if(!isPasswordValid){
//                 return res.json({msg: "Wrong Password", status: false})
//             }
//             if(isPasswordValid){
//                 const AdminData = await connection.query(`SELECT * FROM Administrator WHERE AdminName = "${name}"`)
//                 const User = await connection.query(`SELECT * FROM UserData`)
//                 const PersonalData = await connection.query(`Select * FROM UserPersonalData`)
//                 return res.json({msg: "Log In successfully", status: true, AdminData: AdminData, UserData: User, PersonalData: PersonalData})
//             }
//         }
//       }catch (error) {
//         next(error)
//       }
    
// }

// module.exports.insertData = async(req, res, next) => {

//     const fetchData = async() => {

//         const {name, email, password, Address, City, SelectedCountry, Occupation, DateOfBirth, Gender, Active, AvatarPath} = req.body;
//         const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//         const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
//         const randomNumber2 = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        
//         try {
//             const hashedPassword = await bcrypt.hash(password, 10)
//             const query = `INSERT INTO UserData VALUES (${randomNumber}, "${name}", "${email}", "${hashedPassword}")`;
//             await connection.execute(query);
//             const query2 = `INSERT INTO UserPersonalData VALUES (${randomNumber2}, "${randomNumber}", "${Address}", "${Occupation}", "${Gender}", "${City}", "${SelectedCountry}", #${DateOfBirth}#, ${Active}, "${AvatarPath}")`;
//             await connection.execute(query2);
//             return res.json({msg: "Account is created successfully", status: true});
//         }catch(error) {
//             next(error)
//             return res.json({msg: "In Sever, creating account problem", status: false});
//         }
//     }
//     fetchData()

// };
// module.exports.insertExpense = async(req, res, next) => {
//     const { day, month, year, category, amount, description, price, productName, date, UserName} = req.body
//     const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//     const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
//     try {
//         const result = await connection.query(`SELECT Id FROM UserData WHERE Name = "${UserName}"`);
//         const userId = result[0].Id;    
//         const query = `INSERT INTO ExpenseData VALUES (${randomNumber}, "${productName}", "${description}", #${date}#, "${amount}", "${category}", ${price}, ${day}, "${month}", ${year}, ${userId} )`;
//         await connection.execute(query);
//         const newExpense = await connection.query(`SELECT * FROM ExpenseData WHERE ExpenseID = ${randomNumber}`)
//         res.json({msg: "Expense inserted successfully", status: true, newExpense: newExpense[0]});
//     }catch(error) {
//         res.json({msg: "Server error - insert problem", status: false});
//         next(error)
//     }
// }


// module.exports.insertIncome = async(req, res, next) => {
//     const {UserName, description, year, date, amount, day, month} = req.body;
//     const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//     const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
//     try{
//         const result = await connection.query(`SELECT Id FROM UserData WHERE Name = "${UserName}"`);
//         const userId = result[0].Id; 
//         const query = `INSERT INTO Income VALUES (${randomNumber}, ${userId}, #${date}#, "${description}", ${amount}, ${day}, "${month}", ${year})`;
//         await connection.execute(query);
//         const newIncome = await connection.query(`SELECT * FROM Income WHERE IncomeID = ${randomNumber}`)
//         res.json({msg: "Income inserted successfully", status: true, newIncome: newIncome[0]});
//     }catch(err){
//         res.json({msg: "Server error - insert problem", status: false});
//         next(err)
//     }

// }

// module.exports.banAccount = async(req, res, next) => {
//     try{
//         const {userId} = req.body
//         const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//         const PersonalData = await connection.query(`Select Active FROM UserPersonalData WHERE UserId = ${userId}`)
//         const Active = PersonalData[0].Active
//         const query = `UPDATE UserPersonalData SET Active = ${!Active} WHERE UserId = ${userId}`;
//         await connection.execute(query);
//         res.json({msg: "Done successfully", status: true});
//     }catch(error){
//         console.log(error)
//         next(error)
//     }

// }

// module.exports.MessageInsert = async(req, res, next) => {
//     try{
//         const {ReceiverID, Message, Date, Month, Day, Year, AdminID} = req.body;
//         const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
//         const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//         const query = `INSERT INTO Notification VALUES (${randomNumber}, ${AdminID}, "${Message}", #${Date}#, ${Day}, "${Month}", ${Year}, ${ReceiverID})`;
//         await connection.execute(query);
//         return res.json({msg: "Sent successfully", status: true})
//     }catch(err){
//         next(err)
//     }

// }

// module.exports.GetMessage = async(req, res, next) => {
//     const {Id} = req.body
//     try{
//         const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:/Users/DELL/Desktop/Finance_Tracking_System/User.accdb');
//         const result = await connection.query(`SELECT * FROM Notification WHERE UserID = ${Id}`);
//         const Admin = await connection.query(`SELECT * FROM Administrator`)
//         return res.json({msg: "Success", status: true, message: result, Admin: Admin})
//     }catch(err){
//         next(err)
//     }
// }