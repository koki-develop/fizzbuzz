import { buildHandlers, renderBadRequest, renderOk } from "./helper";
import { fizzbuzz } from "@/src/lib/fizzbuzz";
import { NextApiHandler } from "next";

// GET /api/v1/fizzbuzz/:n
const get: NextApiHandler = async (req, res) => {
  const { n } = req.query;
  const nAsNumber = Number(n);
  if (Number.isNaN(nAsNumber)) {
    renderBadRequest(res);
    return;
  }

  renderOk(res, { result: fizzbuzz(nAsNumber) });
};

const handler = buildHandlers({ get });

export default handler;
