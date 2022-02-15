import probe from 'probe-image-size';
import { Client } from '@notionhq/client';
import { BlockImage } from 'components/ContentBlocks';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getNotionData = async (databaseId: string) => {
  const queryResponse = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });
  const results = queryResponse.results.map((post) => {
    return post as Extract<typeof post, { parent: {} }>;
  });
  return results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const queryResponse = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  const results = await Promise.all(
    queryResponse.results.map(async (block) => {
      const bl = block as Extract<typeof block, { type: string }>;
      if (bl.type === 'image') {
        const imageUrl = BlockImage(bl);
        const size = await probe(imageUrl);
        (bl as any).size = size;
      }
      return bl;
    })
  );
  return results;
};
