import { buildHandlers, renderBadRequest, renderOk } from "./helper";
import { fizzbuzz } from "@/src/lib/fizzbuzz";
import { NextApiHandler } from "next";
import { z } from "zod";

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

const FizzbuzzBatchRequestSchema = z.object({
  numbers: z.array(z.number()),
});

// POST /api/v1/fizzbuzz/batch
const batch: NextApiHandler = async (req, res) => {
  const parsed = FizzbuzzBatchRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    renderBadRequest(res);
    return;
  }

  renderOk(res, {
    results: parsed.data.numbers.reduce<Record<number, string>>(
      (prev, current) => {
        if (prev[current]) return prev;

        prev[current] = fizzbuzz(current);
        return prev;
      },
      {}
    ),
  });
};

export const fizzbuzzHandler = buildHandlers({ get });
export const fizzbuzzBatchHandler = buildHandlers({ post: batch });
