import { Container } from "@/components/Container";
import { Generator } from "@/components/Generator";
import { Preview } from "@/components/Preview";
import { GenerateContextProvider } from "@/core/generate/context";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Redesign - Generate beautiful article summaries</title>
        <meta
          name="description"
          content="Generate beautiful article summaries, with just a few clicks."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GenerateContextProvider>
        <Container>
          <div className="flex flex-col gap-10 items-center lg:flex-row sm:items-start sm:pt-0 sm:w-10/12 sm:mx-auto ">
            <Generator />
            <Preview />
          </div>
        </Container>
      </GenerateContextProvider>
    </>
  );
}
