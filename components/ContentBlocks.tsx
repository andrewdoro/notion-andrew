import Image from 'next/image';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { useContext } from 'react';
import { PropertyValueFiles, Block, RichTextText, ImageBlock, BlockImage } from 'types';
import { CustomCursorContext } from './context/cursor';
import dark from 'prism-react-renderer/themes/nightOwl';
import light from 'prism-react-renderer/themes/nightOwlLight';
import { useTheme } from 'next-themes';
import BookmarkBlock from './BookmarkBlock';

const SpanText = ({ text, id }: { text: RichTextText[]; id: string }) => {
  if (!text) return null;
  return (
    <>
      {text.map((value, i) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;
        return (
          <span
            key={id + i}
            className={[
              bold ? 'font-bold' : 'font-normal',
              code ? 'font-mono rounded-xs bg-zinc-100 p-1 text-sm dark:bg-zinc-800' : '',
              italic ? 'italic' : '',
              strikethrough ? 'line-through' : '',
              underline ? 'underline' : '',
              'leading-7 text-black dark:text-white',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}>
            {text.link ? (
              <a href={text.link.url} className="underline">
                {text.content}
              </a>
            ) : (
              text.content
            )}
          </span>
        );
      })}
    </>
  );
};

export const Text = ({ text, id }: { text: RichTextText[]; id: string }) => {
  return (
    <p className="mb-4">
      <SpanText key={id} text={text} id={id} />
    </p>
  );
};
export const ListItem = ({ text, id }: { text: RichTextText[]; id: string }) => {
  return (
    <li className="text-gray-700 dark:text-gray-200">
      <SpanText text={text} id={id} />
    </li>
  );
};

export const Heading = ({ text, level }: { text: RichTextText[]; level: string }) => {
  switch (level) {
    case 'heading_1':
      return (
        <h1 className="my-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {text[0].text.content}
        </h1>
      );
    case 'heading_2':
      return (
        <h2 className="my-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
          {text[0].text.content}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className="my-4 text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          {text[0].text.content}
        </h3>
      );
    default:
      return null;
  }
};

export const ToDo = ({
  id,
  checked,
  text,
}: {
  id: string;
  checked: boolean;
  text: RichTextText[];
}) => {
  return (
    <div>
      <label htmlFor={id}>
        <input type="checkbox" id={id} defaultChecked={checked} /> {text[0].text.content}
      </label>
    </div>
  );
};

export const Toggle = ({
  text,
  blockChildren,
}: {
  text: RichTextText[];
  blockChildren: Block[];
}) => {
  return (
    <details>
      <summary className="cursor-pointer">{text[0].text.content}</summary>
      {(blockChildren as Block[])?.map((block) => {
        if (block.type === 'paragraph') {
          return (
            <Text key={block.id} text={block.paragraph.text as RichTextText[]} id={block.id} />
          );
        }
      })}
    </details>
  );
};

export const BlockContent = ({ block }: { block: Block }) => {
  const { type, id } = block;
  const { setType } = useContext(CustomCursorContext);
  const { resolvedTheme } = useTheme();
  switch (type) {
    case 'paragraph':
      return <Text text={block.paragraph.text as RichTextText[]} id={id} key={id} />;

    case 'heading_1':
      return <Heading text={block.heading_1.text as RichTextText[]} level={type} key={id} />;

    case 'heading_2':
      return <Heading text={block.heading_2.text as RichTextText[]} level={type} key={id} />;

    case 'heading_3':
      return <Heading text={block.heading_3.text as RichTextText[]} level={type} key={id} />;

    case 'bulleted_list_item':
      return <ListItem key={id} text={block.bulleted_list_item.text as RichTextText[]} id={id} />;
    case 'numbered_list_item':
      return <ListItem key={id} text={block.numbered_list_item.text as RichTextText[]} id={id} />;

    case 'to_do':
      return (
        <ToDo
          id={id}
          key={id}
          checked={block.to_do.checked}
          text={block.to_do.text as RichTextText[]}
        />
      );

    case 'toggle':
      const toggle = block.toggle as { text: RichTextText[]; children: Block[] };
      return (
        <Toggle key={id} text={toggle.text as RichTextText[]} blockChildren={toggle.children} />
      );

    case 'image':
      const image = block as BlockImage;
      const imageSrc = BlockImage(block);
      const caption = block.image.caption.length ? block.image.caption[0].plain_text : '';
      return (
        <figure key={id}>
          <div className="flex w-full justify-center">
            <Image
              alt={caption}
              src={imageSrc}
              objectFit="contain"
              width={image.size.width}
              height={image.size.height}
              placeholder="blur"
              blurDataURL={imageSrc + '?tr=n-blur_thumbnail'}
            />
          </div>
          {caption && <figcaption className="mt-2">{caption}</figcaption>}
        </figure>
      );
    case 'code':
      return (
        <Highlight
          {...defaultProps}
          code={block.code.text[0].plain_text}
          theme={resolvedTheme === 'light' ? light : dark}
          language="jsx">
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre
              className="mt-8 mb-8 overflow-auto rounded-lg bg-white bg-opacity-50 p-4  dark:bg-black dark:bg-opacity-20"
              onMouseEnter={() => setType('none')}
              onMouseLeave={() => setType('default')}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      );
    case 'bookmark':
      return <BookmarkBlock url={block.bookmark.url} />;
    default:
      return (
        <div>
          `Unsupported block ($
          {type === 'unsupported' ? 'unsupported by Notion API' : type})`
        </div>
      );
  }
};

export function PropertyImage(image: PropertyValueFiles) {
  const files = image.files;
  let imageSrc = '';
  if (files[0].type === 'external') imageSrc = files[0].external.url;
  else if (files[0].type === 'file') imageSrc = files[0].file.url;
  return imageSrc;
}
export function BlockImage(image: ImageBlock) {
  if (image.image.type === 'external') return image.image.external.url;
  else return image.image.file.url;
}
export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}
