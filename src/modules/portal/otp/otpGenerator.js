const generateVerificationCode = () => {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = generateVerificationCode
