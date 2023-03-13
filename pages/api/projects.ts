// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Types
import type { Projects } from '../../utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'
// API urls
import { PROJECTS_LIST_URL, SEARCH_BASE_URL } from '../../config'
// Basic fetch function
import { basicFetch } from '../../utils/fetchFunctions'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Projects>) {
    const { search } = req.query;
    const endpoint: string = search ? `${SEARCH_BASE_URL}${search}` : `${PROJECTS_LIST_URL}`;

    const data = await basicFetch<Projects>(endpoint);

    res.status(200).json(data);

}