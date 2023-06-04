import { buildHandlers, renderBadRequest, renderOk } from "./helper";
import { fizzbuzz } from "@/src/lib/fizzbuzz";
import { NextApiHandler } from "next";
import { z } from "zod";

const FizzbuzzRequestSchema = z.object({
  n: z.preprocess((val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return val;
    return n;
  }, z.number()),
});

// GET /api/v1/fizzbuzz/:n
const get: NextApiHandler = async (req, res) => {
  const parsed = FizzbuzzRequestSchema.safeParse(req.query);
  if (!parsed.success) {
    renderBadRequest(res);
    return;
  }

  const result = fizzbuzz(parsed.data.n);
  renderOk(res, { result });
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
  const results = parsed.data.numbers.reduce<Record<number, string>>(
    (prev, current) => {
      if (prev[current]) return prev;

      prev[current] = fizzbuzz(current);
      return prev;
    },
    {}
  );

  renderOk(res, { results });
};

export const fizzbuzzHandler = buildHandlers({ get });
export const fizzbuzzBatchHandler = buildHandlers({ post: batch });
