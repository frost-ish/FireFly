const sendSuccessMessage = (res, message, data=undefined) => {
    res.status(200).json({success: true, message, data});
}

const sendErrorMessage = (res, code, msg, data=undefined) => {
    res.status(code).json({success: false, reason: msg, data});
}

module.exports = {sendSuccessMessage, sendErrorMessage};