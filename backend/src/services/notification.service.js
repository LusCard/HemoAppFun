const sendNotification = (userId, message, isEmergency) => {
    const user = user.findById(userId);
    if (isEmergency) {
        // Ignora preferencias, envía siempre.
        return pushNotification(user, message); 
    }
    if (user.notificationPreferences.isActive === true && 
        user.notificationPreferences.frequency !== 'never') {
        // Aplica lógica de frecuencia y envía si corresponde.
        return pushNotification(user, message);
    }
}