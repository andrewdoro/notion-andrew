import { GetStaticPaths, GetStaticProps } from 'next';
import { getNotionData, getPage, getBlocks } from '../../lib/getNotionData';

import { BlockContent, hasKey } from '../../components/ContentBlocks';

import { PropertyValueRichText, BlogPost, Block } from 'types';

import { ParsedUrlQuery } from 'querystring';
import BlogLayout from 'layouts/BlogLayout';
import useOpenGraphImage from 'lib/useOpenGraphImage';
import { useRef } from 'react';

const Post: BlogPost = ({ page, blocks }) => {
  const { imageURL } = useOpenGraphImage();
  const lastBlocks = useRef<{ list: Block[] }>({
    list: [],
  });
  if (!page || !blocks) {
    return <div />;
  }

  return (
    <BlogLayout page={page} openGraphImage={imageURL}>
      <div className="flex flex-col px-8 lg:px-0">
        {blocks.map((block) => {
          let list: Block[] = [];
          if (block.type === 'numbered_list_item') {
            lastBlocks.current.list = [...lastBlocks.current.list, block];
            list = lastBlocks.current.list;
          } else {
            list = lastBlocks.current.list;
            lastBlocks.current.list = [];
          }
          return (
            <div key={block.id}>
              {list.length > 0 && block.type !== 'numbered_list_item' && (
                <ol type="1" className="list-inside list-decimal">
                  {list.map((item) => (
                    <BlockContent key={item.id} block={item} />
                  ))}
                </ol>
              )}
              {block.type !== 'numbered_list_item' && <BlockContent block={block} />}
            </div>
          );
        })}
      </div>
    </BlogLayout>
  );
};

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
  const blocks = await getBlocks(filter[0].id);
  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    const type: string = block.type;
    if (block.has_children && hasKey(block, type)) {
      const children = childrenBlocks.find((x) => x.id === block.id)?.children;
      (block[type] as any).children = children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
  };
};

export default Post;
