import rateLimit from "express-rate-limit";
//este archivo es para limitar la cantidad de inicios de sesion de una direccion ip
//bloquea peticiones sospechosas
export const authRateLimite = rateLimit({
    windowMs: 15 * 60 * 1000, //cada 15min
    max: 5, //intentos
    message: {
        ok: false,
        msg: "Demasiados intentos fallidos. Vuelva a intentarlo en 15 minutos."
    },
    standardHeaders: true,//incluye informacion en las cabeceras HTTP sobre el limite, cuantos intentoss quedan por ej
    legacyHeaders: false, //evita usar abeceras viejas q ya no se recomiendan(buscar + despues)
});
export const loginRateLimite = rateLimit({
    windowMs: 15 * 60 * 1000, //cada 15min
    max: 10, //intentos
    message: {
        ok: false,
        msg: "Demasiados intentos fallidos. Vuelva a intentarlo en 15 minutos."
    },
    standardHeaders: true,
    legacyHeaders: false,
});