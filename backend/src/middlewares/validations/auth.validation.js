import {body, validationResult} from "express-validator";
import { userModel } from "../../models/user.model.js";
import { InstitutionModel } from "../../models/institution.model.js";

export const registerValidation = [
    body("email")
        .isEmail().withMessage("El emild eebe ser valido")
        .normalizeEmail()
        .custom(async(email)=>{
            const existingUser = await userModel.findOne({email});
            if (existingUser){
                throw new Error("Email ya registrado");
            }
            return true;
        }),
    body("password")
        .isLength({min: 8}).withMessage("La contraseña debe tener minimo 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener mayúsculas, minúsculas y números'),
    body("userName")
        .isLength({min: 3, max: 20}).withMessage("El nombre puede ser entre 3 a 20 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Solo letras, números y guiones bajos')
        .custom(async(userName)=>{
            const existingUser = await userModel.findOne({userName});
            if(existingUser){
                throw new Error("Nombre ya registrado")
            }
            return true;
        }),
    body("role")
        .isIn(['donador', 'institucion', 'community_member', 'moderador'])
        .withMessage('Rol inválido'),
    body("institutionData.cuit")
        .if((value, {req})=> req.body.role === "institution")
        .notEmpty().withMessage("El CUIT es obligatorio para las instituciones")
        .matches(/^\d{11}$/).withMessage("El CUIT debe tener 11 digitos")
        .custom(async(cuit)=>{
            const existingInstitution  = await InstitutionModel.findOne({cuit})
            if(existingInstitution ){
                throw new Error("CUIT ya registrado");
                return true;
            }
        }),
        (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: "Errores de validacion en registro",
                errors: errors.array()
            });
        }
        next(); 
        }   
];
export const loginValidation = [
    body("email")
        .optional()
        .isEmail().withMessage("Ingrese email valido"),
    body("userName")
        .optional()
        .isLength({min: 3}).withMessage("Usuario invalido"),
    body("password")
        .notEmpty().withMessage("Contraseña obligatoria"),

    (req, res, next) =>{ //pongo aca para no importar mchas cosas en las rutas 
        if(!req.body.email && !req.body.userName){
            return res.status(400).json({
                ok: false,
                msg: "Email o nombra de usuario es requerido"
            });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                msg: "Errores de validación en login",
                errors: errors.array()
            });
        }
        next();
    }
];