import { buildHandlers, renderOk } from "./helper";
import { NextApiHandler } from "next";

// GET /api/h
export const health: NextApiHandler = async (req, res) => {
  renderOk(res, { status: "ok" });
};

const handler = buildHandlers({ get: health });

export default handler;
