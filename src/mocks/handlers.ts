import { rest } from "msw";
import news from "./sample-data r5.json";

export const handlers = [
  rest.get("/news", (req, res, ctx) => {
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        data: news,
      })
    );
  }),
  rest.get<
    any,
    {
      newsId: string;
      newsCategory: "latest" | "mostread" | "discussed" | "selected";
    }
  >("/news/:newsId/:newsCategory", (req, res, ctx) => {
    const { newsId, newsCategory } = req.params;

    const newsDetails = news[newsCategory].items.find(
      (item) => item.id === +newsId
    );

    return res(
      ctx.status(200),
      ctx.json({
        data: newsDetails,
      })
    );
  }),
];
