import { PropertyImage } from 'components/ContentBlocks';
import { getNotionData, getPage } from 'lib/getNotionData';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Post, PropertyValueRichText } from 'types';
import Image from 'next/image';
export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID as string);

  return {
    paths: database.map((page) => ({
      params: {
        slug: (page.properties.Slug as PropertyValueRichText).rich_text[0].plain_text,
      },
    })),
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const database = await getNotionData(process.env.NOTION_DATABASE_ID as string);
  const filter = database.filter(
    (blog) => (blog.properties.Slug as PropertyValueRichText).rich_text[0].plain_text === slug
  );
  const page = await getPage(filter[0].id);

  return {
    props: {
      page,
    },
  };
};

const OpenGraphImage = ({ page }: { page: Post }) => {
  const {
    properties: { Post, Slug, Cover, Type },
  } = page;
  return (
    <div className="fixed left-0 z-[300] h-screen w-screen">
      <div className="relative flex h-[630px] w-[1200px]  overflow-hidden bg-zinc-900">
        <div className="absolute right-0 bottom-0 h-full w-1/2  ">
          <div
            className="absolute top-0 left-0 z-10 h-0 w-0 border-b-[630px]  border-l-[200px] 
          border-b-transparent border-l-zinc-900   "></div>
          <Image
            src={PropertyImage(Cover)}
            layout="fill"
            alt={Slug.rich_text[0].plain_text}
            objectFit="cover"
          />
        </div>
        <div className="absolute -bottom-24 -left-24 z-20 aspect-square w-1/3 rounded-full bg-blue-500 blur-[200px]" />
        <div className="absolute top-0 right-0 z-20 aspect-square w-full rounded-full bg-red-400 bg-opacity-10 blur-[50px]" />
        <div className="z-20 flex w-1/2 flex-col justify-center p-12 ">
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24">
              <Image
                src="/images/avatar.jpg"
                layout="fill"
                alt="Avatar Andrew"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-semibold text-white">Andrew Dorobantu</p>
              <p className="text-2xl font-thin tracking-widest text-white text-opacity-80">
                Web Developer
              </p>
            </div>
          </div>

          <h1 className="mt-8 text-9xl font-bold text-white">{Type.select?.name}</h1>
          <h1 className="mt-8 text-5xl font-semibold text-white text-opacity-80">
            {Post.title[0].plain_text}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default OpenGraphImage;
