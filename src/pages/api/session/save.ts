// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import SessionRepo, { ISession } from './sessionRepo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>,
) {
    const sessionRepo = SessionRepo();
    if (req.method === 'POST') {
        let session: ISession = req.body;
        if (!session) {
            res.status(400).send('');
            return;
        }

        let sessionId = await sessionRepo.saveDetails(session);
        res.status(200).send(sessionId);
    } else {
        res.status(405).send('');
    }
}
