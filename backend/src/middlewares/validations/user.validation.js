import { body, validationResult } from "express-validator";
export const updateProfileValidation =[
    body("userName")
        .optional()
        .isLength({ min: 3, max: 20 }).withMessage("Usuario entre 3-20 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Solo letras, números y _"),
    body("userName")
        .optional()
        .isLength({ min: 3, max: 20 }).withMessage("Usuario entre 3-20 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Solo letras, números y _"),
    body("profile.lastName")
        .optional()
        .isLength({ min: 2, max: 60 }).withMessage("Apellido entre 2-60 caracteres"),
    body("profile.dni")
        .optional()
        .matches(/^\d{7,8}$/).withMessage("DNI debe tener 7 u 8 dígitos"),
    body("profile.bloodType")
        .optional()
        .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null])
        .withMessage("Tipo de sangre inválido"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: "Errores de validación de perfil",
                errors: errors.array()
            });
        }
        next();
    }
];