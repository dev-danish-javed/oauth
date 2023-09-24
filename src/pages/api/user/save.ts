// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import UserRepo from './userRepo';
import { User } from 'next-auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>,
) {
    const candidateRepo = UserRepo();
    if (req.method === 'POST') {
        let user: User = req.body;
        if (!user) {
            res.status(400).send('');
            return;
        }

        let candidateId = await candidateRepo.saveDetails(user);
        res.status(200).send(candidateId);
    } else {
        res.status(405).send('');
    }
}
