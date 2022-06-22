const authController = {};

authController.register = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "user registered"
    })
};

module.exports = authController;