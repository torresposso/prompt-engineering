import { OpenAI } from "https://deno.land/x/openai@1.3.1/mod.ts";

const OPENAI_API_SECRET_KEY = Deno.env.get("OPENAI_API_SECRET_KEY") as string;

const openAI = new OpenAI(OPENAI_API_SECRET_KEY);

export async function chatCompletion(text: string) {
  const completion = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    maxTokens: 100,
  });

  return completion;
}
