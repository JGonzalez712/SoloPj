import { model, Schema } from 'mongoose';

const RemainderSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title's name is required!"],
            minlength: [3, "Title's name must be at least 3 characters long!"],
            maxlength: [200, "Title's name must be less than 20 characters"]
        },

        category: {
            type:String
        },

        priority: {
            type:String
        },

        description: {
            type: String,
            required: [true, "Please add a description"],
            minlength: [3, "Remainder's description must be at least 3 characters long!"],
        },

        location: {
            type: String
        },
        
        image: {
            type: String
        },

        remindOn: {
            type: Date,
            // required: [true, "Please add a date to remind you"]
        },
        deadline: {
            type: Date,
            // required: [true, "Please add a dateline"]
        }

    },
    { timestamps: true }
)

const Remainder = model("Remainder", RemainderSchema)
export default Remainder;