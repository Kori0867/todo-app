

import {  HydrateClient } from "~/trpc/server";

import AnimatedBackground from "~/components/animacion";

export default async function Home() {
  return (
    <HydrateClient>
      <>
      <AnimatedBackground />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center my-8">App de notas</h1>
          
        </div>
      </>
    </HydrateClient>
  );
}