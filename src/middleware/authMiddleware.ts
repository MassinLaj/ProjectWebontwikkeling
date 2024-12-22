import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const session = req.session as any; 

  if (!session.gebruikerId) {
    res.redirect('/auth/login');
    return;
  }

  next();
};
