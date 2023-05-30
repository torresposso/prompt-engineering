import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import IconSend from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/send.tsx";
import Form from "../islands/Form.tsx";
import FormStream from "../islands/Form.tsx";

export default function Home() {
  return (
    <>
      <div class=" lg:w-6/12 mx-auto rounded-lg text-white  border my-auto [height:95vh]">
        <div class="flex justify-center p-4">
          <h1 class="tracking-wide [background-image:var(--gradient-4);] inline-block text-transparent bg-clip-text text-3xl lg:text-5xl lg:max-w-md">
            <strong>ChatGPT</strong> Prompt Engineering for{" "}
            <strong>Developers</strong>
          </h1>
        </div>
        <Form />
      </div>
    </>
  );
}
