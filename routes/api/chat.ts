import { Handlers } from "$fresh/server.ts";
import { chatCompletion } from "../../utils/openai.ts";

export const handler: Handlers = {
  async POST(req) {
    const text = new URL(req.url).searchParams.get("text");

    if (!text) {
      return new Response(null, { status: 400 });
    }
    const completion = await chatCompletion(text);
    console.log("response", JSON.stringify(completion, null, 2));
    return new Response(JSON.stringify(completion), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
