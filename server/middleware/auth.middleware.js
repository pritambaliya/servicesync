import jwt from "jsonwebtoken";
import Customer from "../model/customer.model.js";
import Provider from "../model/provider.model.js";

const getToken = (req) => {
    return req.headers.authorization?.split(" ")[1];
};

const isLoggedIn = async (req, res, next) => {
    try {
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Login required"
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        let user = await Customer.findById(decoded.id);

        if(!user){
            user = await Provider.findById(decoded.id);
        }
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }
        req.user = user;
        next();
    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }
};

const isCustomer = async (req,res,next)=>{
    await isLoggedIn(req,res,()=>{
        if(req.user.role === "customer"){
            return next();
        }
        return res.status(403).json({
            success:false,
            message:"Customer access only"
        });
    });
};


const isProvider = async (req,res,next)=>{
    await isLoggedIn(req,res,()=>{
        if(req.user.role === "provider"){
            return next();
        }
        return res.status(403).json({
            success:false,
            message:"Provider access only"
        });
    });
};


export {isLoggedIn, isCustomer, isProvider};
