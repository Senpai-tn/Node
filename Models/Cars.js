const mongoose=require('mongoose');

const CarSchema = mongoose.Schema(
    {
        mark: {
            type : String,
            required : true
        },
        model: {
            type : String,
            required : true
        },
        energy: {
            type : String,
            required : true
        },
        nb_place: {
            type : String,
            required : true
        },
        boite: {
            type : String,
            required : true
        },
        clim: {
            type : Boolean,
        },
        price: {
            type :Number ,
            default : Date.now()
        },
        color: {
            type : String,
            required : true
        },
        starts: {
            type : Number,
            required : true
        },
        other: {
            type : String,
            required : true
        },
        reservation: [ String ],
        comments: [ String ],
        images: [ String ],

    }
);

module.exports=mongoose.model('Car',CarSchema);
