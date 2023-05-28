import { OpenAI } from "https://deno.land/x/openai@1.3.1/mod.ts";

const OPENAI_API_SECRET_KEY = Deno.env.get("OPENAI_API_SECRET_KEY") as string;

const openAI = new OpenAI(OPENAI_API_SECRET_KEY);

export async function chatCompletion(userInput: string) {
  const prompt = `
  The text delimited by triple single quotes is the input text written by an user.
  Tell me a concise answer in one paragraph of max 500 characters about what is the user writing about?
  '''
  ${userInput}
  '''
  
  `;
  const completion = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    maxTokens: 300,
    temperature: 0,
  });

  return completion;
}
