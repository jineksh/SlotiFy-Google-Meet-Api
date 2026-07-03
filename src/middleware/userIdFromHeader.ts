import { NextFunction, Request, Response } from 'express';

import { badRequest } from '../utils/errorHandler.js';

export function userIdFromHeader(req: Request, _res: Response, next: NextFunction) {
  const raw = (req.header('x-user-id') ?? req.header('userId') ?? req.header('UserId')) as
    | string
    | undefined;

  if (!raw) {
    return next(badRequest('Missing x-user-id header'));
  }

  const userId = Number(raw);

  if (!Number.isFinite(userId) || userId <= 0) {
    return next(badRequest('Invalid x-user-id header'));
  }

  req.userId = userId;
  return next();
}

