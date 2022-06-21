import { createHmac } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { Roles } from 'models/user.model';

export abstract class AuthMiddleware {
    public static verifyAccessToken(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.headers['x-access-token'] as string;

        if (!accessToken) {
            return res.status(403).send({ message: 'Auth token not provided' });
        }

        const validHashedToken = createHmac('sha256', process.env.TOKEN_SECRET as string).update(process.env.ACCESS_TOKEN as string).digest('hex');
        const hashedToken = createHmac('sha256', process.env.TOKEN_SECRET as string).update(accessToken).digest('hex');

        if (hashedToken !== validHashedToken) {
            return res.status(403).send({ message: 'Auth token invalid' });
        }

        return next();
    }
    
    public static async verifyUserDucplication(req: Request, res: Response, next: NextFunction) {
        const mail: string = req.body.mail;

        if (!mail) {
            return res.status(400).send({ message: 'User mail not provided' });
        }

        const isUserDuplicated: boolean = await (req as any).isUserDuplicated(mail);

        if (isUserDuplicated) {
            return res.status(400).send({ message: 'User already exists' });
        }

        return next();
    }

    
    public static async isCustomer(req: Request, res: Response, next: NextFunction) {
        const role: Roles = req.body.role;

        if (!role) {
            return res.status(400).send({ message: 'User role not provided' });
        }

        const isCustomer: boolean = await (req as any).asRole(role);

        if (!isCustomer) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }
    
    public static async isRestaurantOwner(req: Request, res: Response, next: NextFunction) {
        const role: Roles = req.body.role;

        if (!role) {
            return res.status(400).send({ message: 'User role not provided' });
        }

        const isRestaurantOwner: boolean = await (req as any).asRole(role);

        if (!isRestaurantOwner) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }

    public static async isDeliveryMan(req: Request, res: Response, next: NextFunction) {
        const role: Roles = req.body.role;

        if (!role) {
            return res.status(400).send({ message: 'User role not provided' });
        }

        const isDeliveryMan: boolean = await (req as any).asRole(role);

        if (!isDeliveryMan) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }
    
    public static async isTechnicalDepartment(req: Request, res: Response, next: NextFunction) {
        const role: Roles = req.body.role;

        if (!role) {
            return res.status(400).send({ message: 'User role not provided' });
        }

        const isTechnicalDepartment: boolean = await (req as any).asRole(role);

        if (!isTechnicalDepartment) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }
    
    public static async isCommercialDepartment(req: Request, res: Response, next: NextFunction) {
        const role: Roles = req.body.role;

        if (!role) {
            return res.status(400).send({ message: 'User role not provided' });
        }

        const isCommercialDepartment: boolean = await (req as any).asRole(role);

        if (!isCommercialDepartment) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }
}