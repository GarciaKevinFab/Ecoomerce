import User from '../models/User.js';

//create new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res
            .status(200)
            .json({
                success: true,
                message: 'Successfully created',
                data: savedUser,
            });
    } catch (err) {
        if (err.code === 11000) {
            // This is a duplicate key error
            res
                .status(400)
                .json({ success: false, message: 'Username or email already exists.' });
        } else {
            res
                .status(500)
                .json({ success: false, message: 'Failed to create. Try again.' });
        }
    }
};


//update User
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, {
            $set: req.body,
        },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to updated',
        });
    }
};

//delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to deleted',
        });
    }
};

//getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'not found',
        });
    }
};

//getAll User
export const getAllUser = async (req, res) => {

    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: users,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'not found',
        });
    }
};

// getNewUsers
export const getNewUsers = async (req, res) => {
    try {
        // Establecer el criterio de "nuevo". Por ejemplo, usuarios creados en los últimos 7 días.
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - 7);

        const newUsers = await User.find({ createdAt: { $gte: dateLimit } });

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: newUsers,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch new users',
        });
    }
};

// getUserStats
export const getUserStats = async (req, res) => {
    const currentDate = new Date();
    const lastYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        console.log("Datos obtenidos:", data);
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (err) {
        console.error("Error en getUserStats:", err);

        // Envía una respuesta de error detallada
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas de usuarios',
            error: err.message // Agregar el mensaje de error
        });
    }
};
