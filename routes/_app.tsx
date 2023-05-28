import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";

export default function AppLayout({ Component }: AppProps) {
  return (
    <>
      <body class="bg-gray-900">
        <Component />
      </body>
    </>
  );
}
