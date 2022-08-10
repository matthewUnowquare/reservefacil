const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
},{
    timestamp: true
});

HotelSchema.query.getActives = async function() {
    return this.where({status: 'ACTIVE'}); 
}

module.exports = mongoose.model('Hotel', HotelSchema);