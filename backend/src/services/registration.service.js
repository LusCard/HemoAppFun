import { userModel } from "../models/user.model.js";
import { InstitutionModel } from "../models/institution.model.js";
import { hashedPassword } from "../helpers/bcrypt.helper.js";
import { generateSecureToken } from "../helpers/crypto.helper.js";
import { emailService } from "./email.service.js";

export class RegistrationService {
    static async registerUser(userData){
        const{userName, email, password, role, profileData, institutionData } = userData;
        const existUser = await userModel.findOne({
            $or:[{email}, {userName}]
        });
        if(existUser){
            throw new Error("Usuario o email ya existente");
        }
        if(role === "institution"){
            await this.validateInstitutionData(institutionData);
        }
        const passwordHash = await hashedPassword(password);
        const emailVerificationToken = generateSecureToken();

        //creacoin del usuario
        const newUser = new userModel({
            userName, 
            email,
            password: passwordHash,
            role: role || 'community_member',
            accountStatus: role === 'institucion' ? 'pending_validation' : 'unverified',
            donationStatus: 'inactive',
            emailVerificationToken,
            emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
            profile: profileData ? {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                birthDate: profileData.birthDate,
                gender: profileData.gender,
                bloodType: profileData.bloodType || null,
                factor: profileData.factor || null,
                dni: profileData.dni
            } : undefined
        });
        await newUser.save();

        if(role === 'institution' && institutionData){
                await this.createInstitution(newUser._id, institutionData);
        }
        try {
            await emailService.sendVerificationEmail(email, emailVerificationToken);
        } catch (error) {
            console.log("Usuario creado pero email invalido", emailError);
        }
        return{
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
                accountStatus: newUser.accountStatus,
                profile: newUser.profile
            }, 
            isInstitution: role === "institution"
        }; 
    }
    static async validateInstitutionData(institutionData){
        if(!institutionData?.cuit || !institutionData?.legalName){
            throw new Error("Para instituciones: CUIT y nombre legal es obligatorio");
        }
        const existingInstitution = await InstitutionModel.findOne({
            cuit: institutionData.cuit
        });
        if(existingInstitution){
                throw new Error("El CUIT ya esta registrado")
        }
    };
    static async createInstitution(userId, institutionData){
        const newInstitution = new InstitutionModel({
            user: userId,
                legalName: institutionData.legalName,
                tradeName: institutionData.tradeName,
                cuit: institutionData.cuit,
                contact: institutionData.contact,
                address: institutionData.address,
                location: institutionData.location,
                institutionType: institutionData.institutionType,
                services: institutionData.services,
                schedule: institutionData.schedule,
                description: institutionData.description,
                validationStatus: "pending"
        });
        return await newInstitution.save()
    }
}