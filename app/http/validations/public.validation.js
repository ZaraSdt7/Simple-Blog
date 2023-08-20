const joi = require("@hapi/joi");
const { mongoIDpattern } = require("../../utils/constants");
const createHttpError = require("http-errors");
const ObjectValidationID =joi.object({
    id:joi.string().pattern(mongoIDpattern).error(createHttpError.BadRequest(new createHttpError.BadRequest("Enter ID incorrect")))

}) 
module.exports={
    ObjectValidationID
}