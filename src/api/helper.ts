import { NextApiHandler, NextApiResponse } from "next";

export type Handlers = {
  get?: NextApiHandler;
  post?: NextApiHandler;
};

export const buildHandlers = (handlers: Handlers): NextApiHandler => {
  return (req, res) => {
    switch (req.method) {
      case "GET":
        if (handlers.get) return handlers.get(req, res);
        break;
      case "POST":
        if (handlers.post) return handlers.post(req, res);
        break;
    }

    renderMethodNotAllowed(res);
  };
};

export const renderOk = (res: NextApiResponse, data: unknown) => {
  res.status(200).json(data);
};

export const renderBadRequest = (res: NextApiResponse) => {
  res.status(400).json({ message: "Bad Request" });
};

export const renderMethodNotAllowed = (res: NextApiResponse) => {
  res.status(405).json({ message: "Method Not Allowed" });
};
