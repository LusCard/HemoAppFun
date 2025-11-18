import {body, validationResult} from 'express-validator';
export const createInstitutionValidation=[
    body('legalName')
        .notEmpty().withMessage("El nombre legal es obligatorio")
        .isLength({max: 200}).withMessage("Maximo 200 caracteres"),
    body('cuit')
        .matches(/^\d{11}$/).withMessage("El CUIT debe tener 11 digitos"),
    body('email')
        .optional()
        .isEmail().withMessage("Email invalido"),
    body('address.street')
        .notEmpty().withMessage("La calle es obligatoria"),
    body('address.city')
        .notEmpty().withMessage("La ciudad de procedencia es obligatorio"),
    body('location.coordinates')
        .isArray({min: 2, max: 2}).withMessage("Debe ingresar 2 coordenadas")
        .custom((coords)=>{
            const [lng, lat]=coords;
            return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
        }).withMessage("Coordenadas invalidas"),
    body('institutionType')
        .isIn([
            "hospital_publico",
            "hospital_privado", 
            "clinica",
            "centro_salud",
            "banco_sangre",
            "laboratorio",
            "campaña_movil",
            "otro"
        ]).withMessage("Tipo de institucion invalida"),
        (req, res, next)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    ok: false,
                    msg: "Errores de validacion",
                    errors: errors.array()
                    
                });
            }
            next();
        }
];
export const updateInstitutionValidation = [
    body('legalName')
        .optional()
        .isLength({ max: 200 }).withMessage("Máximo 200 caracteres"),
    body('email')
        .optional()
        .isEmail().withMessage("Email inválido"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: "Errores de validacion al actualizar institución",
                errors: errors.array()
            });
        }
        next();
    }
];