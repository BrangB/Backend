const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        unique: false
    }
}, {timestamps: true})

const userPersonalDataSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    UserId: {
        type: Number,
        required: true,
        unique: true
    },
    Address: {
        type: String,
        required: true,
        unique: false
    },
    Occupation: {
        type: String,
        required: true,
        unique: false
    },
    Gender: {
        type: String,
        required: true,
        unique: false
    },
    City: {
        type: String,
        required: true,
        unique: false
    },
    Country: {
        type: String,
        required: true,
        unique: false
    },
    DateOfBirth: {
        type: Date,
        required: true,
        unique: false
    },
    Active: {
        type: Boolean,
        required: true,
        unique: false
    },
    Avatar: {
        type: String,
        required: false,
        unique: false
    }
}, {timestamps: true})

const administratorSchema = new mongoose.Schema({
    AdminID: {
        type: Number,
        required: true,
        unique: true
    },
    AdminName: {
        type: String,
        required: true
    },
    AdminPassword: {
        type: String,
        required: true
    }
}, {timestamps: true});

const expenseDataSchema = new mongoose.Schema({
    ExpenseID: {
        type: Number,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    UserID: {
        type: Number,
        required: true
    }
});

const incomeSchema = new mongoose.Schema({
    IncomeID: {
        type: Number,
        required: true,
        unique: true
    },
    UserID: {
        type: Number,
        required: true
    },
    IncomeDate: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
    IncomeAmount: {
        type: Number,
        required: true
    },
    Day: {
        type: Number,
        required: true
    },
    Month: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    }
});

const notificationSchema = new mongoose.Schema({
    NotificationID: {
        type: Number,
        required: true,
        unique: true
    },
    AdminID: {
        type: Number,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    NotificationDate: {
        type: Date,
        required: true
    },
    Day: {
        type: Number,
        required: true
    },
    Month: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    UserID: {
        type: Number,
        required: true
    }
});

const Notification = mongoose.model('Notification', notificationSchema);
const Income = mongoose.model('Income', incomeSchema);
const ExpenseData = mongoose.model('ExpenseData', expenseDataSchema);
const Administrator = mongoose.model('Administrator', administratorSchema);
const UserData = mongoose.model("UserData", userSchema);
const UserPersonalData = mongoose.model("UserPersonalData", userPersonalDataSchema);

module.exports = {
    Income,
    ExpenseData,
    Administrator,
    UserData,
    UserPersonalData,
    Notification
  };