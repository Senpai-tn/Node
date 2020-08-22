const mongoose=require('mongoose');

const UserSchema = mongoose.Schema(
    {
        FirstName: {
            type : String,
            required : true
        },
        LastName: {
            type : String,
            required : true
        },
        email: {
            type : String,
            required : true
        },
        password: {
            type : String,
            required : true
        },
        enabled: {
            type : Number,
            required : true
        },
        Created_date: {
            type : Date,
            default : Date.now()
        },
        Deleated_date: {
            type : Date,
            default : Date.now()
        },
        Telephoen: {
            type : Number,
            required : false
        },
        Cin: {
            type : Number,
            required : false
        },
        image: [ String ],
        Roles: {
            SuperUser : {type : Boolean  },
            Admin : {type : Boolean  },
            User : {type : Boolean  },
        },

    }
);


module.exports=mongoose.model('User',UserSchema);
