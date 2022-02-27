import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Page } from 'types';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiMaterialui,
  SiLinkedin,
  SiGithub,
  SiTwitter,
} from 'react-icons/si';

const About: Page = () => {
  return (
    <>
      <NextSeo
        title="About"
        canonical={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/about`}
        description="Hello, I'm Andrew, a self-taught front-end developer, currently living in Cluj-Napoca."
      />
      <div className="mx-auto mt-24 h-full max-w-6xl px-4 pb-12">
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl"> About me</h1>
            <p className="mt-6 max-w-sm tracking-wide">
              Hello, I&#39;m Andrew, a self-taught front-end developer, currently living in
              Cluj-Napoca.
            </p>
            <p className="mt-8 text-xl font-bold tracking-tight  md:text-3xl">Stacks</p>
            <div className="mt-6 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="flex items-center gap-4 rounded-xl bg-blue-500 bg-opacity-20 p-2 md:p-4">
                <SiReact className="rounded-full text-4xl" />
                <p className="text-xs tracking-widest md:text-base">React</p>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-orange-500 bg-opacity-20 p-2 md:p-4">
                <SiNextdotjs className="rounded-full text-4xl" />
                <p className="text-xs tracking-widest md:text-base">Next.js</p>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-red-500 bg-opacity-20 p-2 md:p-4">
                <SiTailwindcss className="rounded-full text-4xl" />
                <p className="text-xs tracking-widest md:text-base">TailwindCSS</p>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-red-500 bg-opacity-20 p-2 md:p-4">
                <SiMaterialui className="rounded-full text-4xl" />
                <p className="text-xs tracking-widest md:text-base">Material UI</p>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-indigo-500 bg-opacity-20 p-2 md:p-4">
                <SiTypescript className="rounded-full text-4xl" />
                <p className="text-xs tracking-widest md:text-base">Typescript</p>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-purple-500 bg-opacity-20 p-2 md:p-4">
                <SiExpress className="rounded-full text-4xl" />
                <p className="text-xs tracking-widest md:text-base">Express.js</p>
              </div>
            </div>
            <h2 className="mt-8 text-xl font-bold tracking-tight  md:text-3xl">Follow me</h2>
            <div className="mt-6 flex gap-6">
              <a
                className="flex rounded-full border-2 border-blue-500 p-4 text-blue-500 transition-all duration-300 hover:bg-blue-500"
                href="https://twitter.com/andrewdorobantu"
                target="_blank"
                rel="noopener noreferrer">
                <SiTwitter className="text-3xl" />
              </a>
              <a
                className="flex rounded-full border-2 border-red-500 p-4 text-red-500 transition-all duration-300  hover:bg-red-500"
                href="https://github.com/andrewdoro"
                target="_blank"
                rel="noopener noreferrer">
                <SiGithub className="text-3xl" />
              </a>
              <a
                className="flex rounded-full border-2 border-amber-500 p-4 text-amber-500 transition-all duration-300 hover:bg-amber-500"
                href="https://www.linkedin.com/in/andrei-ovidiu-dorobantu/"
                target="_blank"
                rel="noopener noreferrer">
                <SiLinkedin className="text-3xl" />
              </a>
            </div>
            <a
              href="mailto:andreiovidiu9@yahoo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 rounded-full bg-red-500 bg-opacity-30 px-4 py-3 transition-all hover:bg-opacity-50">
              <p className="text-center font-semibold tracking-widest">Contact me</p>
            </a>
          </div>
          <div className="relative mx-auto aspect-square w-1/2 lg:w-1/3  ">
            <Image
              src="/images/about.jpg"
              objectFit="cover"
              layout="fill"
              alt="Avatar Andrew"
              className="rounded-full md:rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
