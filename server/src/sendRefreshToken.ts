import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    sameSite: 'lax',
  });
};

export const clearRefreshToken = (res: Response) => {
  res.clearCookie('jid', {
    httpOnly: true,
    sameSite: 'lax',
  });
};
