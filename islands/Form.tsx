import { useState } from "preact/hooks";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/chat?text=${inputValue}`,
        { method: "POST" },
      );
      const data = await response.json();
      console.log("data", data);
      setResult(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data");
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div class="flex flex-col p-4 items-center border w-full">
      <form onSubmit={handleSubmit} class="flex flex-col py-4 gap-y-5 w-2/6">
        <textarea
          type="text"
          value={inputValue}
          onChange={handleChange}
          class="border border-gray-800 rounded bg-gray-600 bloc w-full focus:outline-none px-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          class="mx-auto px-4 py-1 text-sm border  border-gray-500 bg-gray-700 rounded text-white "
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <h2 class="py-2 font-semibold text-xl">Result:</h2>
      {result
        ? (
          <p class="rounded bg-gray-700 p-4 font-mono">
            {result?.choices[0]?.message.content}
          </p>
        )
        : <></>}
    </div>
  );
};

export default Form;
