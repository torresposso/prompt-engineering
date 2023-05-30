import { ApplicationError, UserError } from "@/utils/errors.ts";
import { ensureGetEnv } from "../../utils/env.ts";

const OPENAI_SECRET_KEY = ensureGetEnv("OPENAI_SECRET_KEY");

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function handler(req: Request): Promise<Response> {
  try {
    // Handle CORS
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const userInput = new URL(req.url).searchParams.get("userInput");

    if (!userInput) {
      throw new UserError("Missing query in request data");
    }

    const sanitizedUserInput = userInput.trim();
    console.log("sanitized userInput:", sanitizedUserInput);

    const prompt = `
    The text delimited by triple single quotes is the input text written by an user.
    Tell me a concise answer in one paragraph of max 500 characters about what is the user writing about?
    '''
    ${sanitizedUserInput}
    '''
    
    `;

    const completionOptions = {
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0,
    };

    // The Fetch API allows for easier response streaming over the OpenAI client.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(completionOptions),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApplicationError("Failed to generate completion", error);
    }

    console.log("response", response);

    // Proxy the streamed SSE response from OpenAI
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err: unknown) {
    if (err instanceof UserError) {
      return Response.json({
        error: err.message,
        data: err.data,
      }, {
        status: 400,
        headers: corsHeaders,
      });
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`);
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err);
    }

    // TODO: include more response info in debug environments
    return Response.json({
      error: "There was an error processing your request",
    }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}
