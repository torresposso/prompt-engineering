import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import IconSend from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/send.tsx";
import Form from "../islands/Form.tsx";

export default function Home() {
  return (
    <>
      <div class="h-screen text-white mx-auto">
        <h1 class="text-center py-2 font-semibold text-4xl font-mono italic">
          ChatGPT Prompt Engineering for Developers
        </h1>
        <Form />
      </div>
    </>
  );
}
