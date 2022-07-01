/* eslint-disable import/no-anonymous-default-export */
import Twitter from 'twitter';
import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next';

dotenv.config();

// 初期化
var client = new Twitter({
  consumer_key: process.env.API_KEY ? process.env.API_KEY : '',
  consumer_secret: process.env.API_SECRET_KEY ? process.env.API_SECRET_KEY : '',
  access_token_key: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : '',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : '',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;

  if (!q) {
    return res.status(200).json([]);
  }

  const data = await (() => {
    return new Promise((resolve, reject) => {
      client.get('search/tweets', { q, count: 100 }, function (error, tweets, response) {
        resolve(tweets);
      });
    });
  })();
  const statuses = (
    data as {
      statuses: {
        text: string;
      }[];
    }
  ).statuses;

  const param: {
    text: string;
  }[] = [];

  if (statuses) {
    statuses.forEach((tweet) => {
      param.push({
        text: tweet.text,
      });
    });
  }

  return res.status(200).json(param);
};
