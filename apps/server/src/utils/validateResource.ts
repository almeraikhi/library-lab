import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateResource = (
  schema: ZodSchema<any>,
  property: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[property];
    const result = schema.safeParse(data);

    if (!result.success) {
      res.status(400).json({
        message: 'Validation error',
        errors: result.error.flatten(),
      });
      return;
    }

    // (Optional) Override the request data with the parsed data
    req[property] = result.data;
    next();
  };
};
