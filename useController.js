const bcrypt = require("bcrypt");
const {UserData, Income, ExpenseData, Administrator, UserPersonalData, Notification} = require("./Model/UserModel")

module.exports.signup = async(req, res, next) => {

    const fetchData = async() => {
        const {name, email, password} = req.body;

        try{
            const checkUsername = await UserData.find({Name: name})
            const checkEmail = await UserData.find({Email: email})

            if (checkUsername.length > 0)
            return res.json({msg: "Username already used", status: false})

            if(checkEmail.length > 0)
                return res.json({msg: "Email already used", status: false})

            if(!(checkUsername.length > 0) || !(checkEmail.length > 0)){
                return res.json({msg: "First Step is done", status: true})
            }else{
                return res.json({msg: "There is something wrong in our server", status: false})
            }
        }catch(err){
            next(err)
        }
    }
    fetchData()

};


module.exports.login = async(req, res, next) => {
    const {name, password} = req.body;

    try{
        const result = await UserData.find({Name: name})
        if(result.length === 0){
            res.json({msg: "Invalid Username", status: false});
        }else{
            const isPasswordValid = await bcrypt.compare(password, result[0].Password)
            const expenseData = await ExpenseData.find({UserID: result[0].Id})

            if(!isPasswordValid){
                return res.json({msg: "Wrong Password", status: false})
            }

            if(isPasswordValid){
                const PersonalData = await UserPersonalData.find({UserId: result[0].Id})
                const IncomeData = await Income.find({UserID: result[0].Id})
                if(PersonalData[0].Active){
                    return res.json({msg: "Log In successfully", status: true, userData: result[0], personalData: PersonalData, expenses: expenseData, incomeData: IncomeData})
                }else{
                    return res.json({msg: "Your account is temporarily banned", status: false})
                }
            }
        }
    }catch(err){
        next(err)
    }
}

module.exports.Adminlogin = async(req, res, next) => {
    const {name, password} = req.body;

    try{
        const result = await Administrator.find({AdminName: name})
        if(result.length === 0){
            res.json({msg: "Invalid Admin", status: false});
        }else{
            const isPasswordValid = await bcrypt.compare(password, result[0].AdminPassword)
            if(!isPasswordValid){
                return res.json({msg: "Wrong Password", status: false})
            }
            if(isPasswordValid){
                const AdminData = await Administrator.find({AdminName: name})
                const User = await UserData.find({})
                const PersonalData = await UserPersonalData.find({})
                console.log(User)
                return res.json({msg: "Log In successfully", status: true, AdminData: AdminData, UserData: User, PersonalData: PersonalData})
            }
        }
    }catch(err){
        next(err)
    }
    
}

module.exports.insertData = async(req, res, next) => {

    const fetchData = async() => {

        const {name, email, password, Address, City, SelectedCountry, Occupation, DateOfBirth, Gender, Active, AvatarPath} = req.body;
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const randomNumber2 = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            let newUser = new UserData ({
                Id: randomNumber,
                Name: name,
                Email: email,
                Password: hashedPassword
            })
            newUser.save()
                let NewUserData = new UserPersonalData({
                    ID: randomNumber2,
                    UserId: randomNumber,
                    Address: Address,
                    Occupation: Occupation,
                    Gender: Gender,
                    City: City,
                    Country: SelectedCountry,
                    DateOfBirth: DateOfBirth,
                    Active: Active,
                    Avatar: AvatarPath
                })
                NewUserData.save()
                return res.json({msg: "Account is created successfully", status: true});
        }catch(err){
            next(err)
            return res.json({msg: "In Sever, creating account problem", status: false});
        }
        
    }
    fetchData()

};

module.exports.insertExpense = async(req, res, next) => {
    const { day, month, year, category, amount, description, price, productName, date, UserName} = req.body
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    try{
        const result = await UserData.find({Name: UserName})
        const userId = result[0].Id
        const newExpense = new ExpenseData({
            ExpenseID: randomNumber,
            productName: productName,
            description: description,
            date: date,
            amount: amount,
            category: category,
            price: price,
            day: day,
            month: month,
            year: year,
            UserID: userId
        })
        newExpense.save()
        return res.json({msg: "Expense inserted successfully", status: true, newExpense: newExpense});
    }catch(err){
        next(err)
        return res.json({msg: "Server error - insert problem", status: false})
    }

}


module.exports.insertIncome = async(req, res, next) => {
    const {UserName, description, year, date, amount, day, month} = req.body;
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    try{
        const result = await UserData.find({Name: UserName});
        const userId = result[0].Id;
        const income = new Income ({
            IncomeID: randomNumber,
            UserID: userId,
            IncomeDate: date,
            Description: description,
            IncomeAmount: amount,
            Day: day,
            Month: month,
            Year: year
        })
        income.save()
        return res.json({msg: "Income inserted successfully", status: true, newIncome: income});
    }catch(err){
        next(err)
        return res.json({msg: "Server error - insert problem", status: false});
    }

}

module.exports.banAccount = async(req, res, next) => {

    try{
        const {userId} = req.body;
        const PersonalData = await UserPersonalData.find({UserId: userId})
        const Active = PersonalData[0].Active
        await UserPersonalData.updateOne({ UserId: userId }, { $set: { Active: !Active } });
        return res.json({msg: "Done successfully", status: true});
    }catch(err){
        next(err)
    }

}

module.exports.MessageInsert = async(req, res, next) => {
    try{
        const {ReceiverID, Message, Date, Month, Day, Year, AdminID} = req.body;
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const newNoti = new Notification({
            NotificationID: randomNumber,
            AdminID: AdminID,
            Message: Message,
            NotificationDate: Date,
            Day: Day,
            Month: Month,
            Year: Year,
            UserID: ReceiverID

        })
        newNoti.save()
        .then(result => {
            console.log("insert new Message")
            return res.json({msg: "Sent successfully", status: true})
        })
        .catch(err => {
            console.log('error', err);
            return res.json({msg: "Server error - insert problem", status: false});
        })

    }catch(err){
        next(err)
        return res.json({msg: "Server error - insert problem", status: false});
    }

}

module.exports.GetMessage = async(req, res, next) => {
    const {Id} = req.body
    try{
        const result = await Notification.find({UserID: Id})
        const Admin = await Administrator.find({})
        return res.json({msg: "Success", status: true, message: result, Admin: Admin})
    }catch(err){
        next(err)
        return res.json({msg: "Server error - insert problem", status: false});
    }
}