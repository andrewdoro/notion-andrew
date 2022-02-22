import type {
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { ProbeResult } from 'probe-image-size';
import { FC } from 'react';

/**Custom Types **/

export declare type HomePage = FC<{ posts: Post[] }>;
export declare type BlogPost = FC<{ page: Post; blocks: Block[] }>;
export declare type ProjectsPage = FC<{ posts: Post[] }>;
export declare type Page = FC<{}>;

export declare type BlockImage = ImageBlock & {
  size: ProbeResult;
};

export declare type Post = PostResult & {
  color: number[];
  properties: {
    Date: PropertyValueDate;
    Description: PropertyValueRichText;
    Slug: PropertyValueRichText;
    Post: PropertyValueTitle;
    Cover: PropertyValueFiles;
    Type: PropertyValueSelect;
  };
};

export declare type Reaction = {
  name: string;
  emoji: string;
  value: number;
};
export declare type User = {
  id: string;
  reaction: string;
};
/** Property **/
export declare type PostResult = Extract<
  QueryDatabaseResponse['results'][number],
  {
    properties: Record<string, unknown>;
  }
>;

export declare type PropertyValueMap = PostResult['properties'];
export declare type PropertyValue = PropertyValueMap[string];
export declare type PropertyValueType = PropertyValue['type'];
export declare type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  PropertyValue,
  {
    type: TType;
  }
>;
export declare type PropertyValueTitle = ExtractedPropertyValue<'title'>;
export declare type PropertyValueRichText = ExtractedPropertyValue<'rich_text'>;
export declare type PropertyValueNumber = ExtractedPropertyValue<'number'>;
export declare type PropertyValueUrl = ExtractedPropertyValue<'url'>;
export declare type PropertyValueSelect = ExtractedPropertyValue<'select'>;
export declare type PropertyValueMultiSelect = ExtractedPropertyValue<'multi_select'>;
export declare type PropertyValuePeople = ExtractedPropertyValue<'people'>;
export declare type PropertyValueEmail = ExtractedPropertyValue<'email'>;
export declare type PropertyValuePhoneNumber = ExtractedPropertyValue<'phone_number'>;
export declare type PropertyValueDate = ExtractedPropertyValue<'date'>;
export declare type PropertyValueFiles = ExtractedPropertyValue<'files'>;
export declare type PropertyValueFormula = ExtractedPropertyValue<'formula'>;
export declare type PropertyValueRelation = ExtractedPropertyValue<'relation'>;
export declare type PropertyValueRollup = ExtractedPropertyValue<'rollup'>;
export declare type PropertyValueCreatedTime = ExtractedPropertyValue<'created_time'>;
export declare type PropertyValueCreatedBy = ExtractedPropertyValue<'created_by'>;
export declare type PropertyValueEditedTime = ExtractedPropertyValue<'last_edited_time'>;
export declare type PropertyValueEditedBy = ExtractedPropertyValue<'last_edited_by'>;
/** People **/
export declare type PropertyValueUser = Extract<
  PropertyValuePeople['people'][number],
  {
    type: string;
  }
>;
export declare type PropertyValueUserType = PropertyValueUser['type'];
export declare type PropertyValueUserPerson = Extract<
  PropertyValueUser,
  {
    type: 'person';
  }
>;
export declare type PropertyValueUserBot = Extract<
  PropertyValueUser,
  {
    type: 'bot';
  }
>;
/** Block **/
export declare type Block = Extract<
  ListBlockChildrenResponse['results'][number],
  {
    type: string;
  }
>;
export declare type BlockType = Block['type'];
export declare type ExtractedBlockType<TType extends BlockType> = Extract<
  Block,
  {
    type: TType;
  }
>;

export declare type Blocks = Block[];
export declare type ParagraphBlock = ExtractedBlockType<'paragraph'>;
export declare type HeadingOneBlock = ExtractedBlockType<'heading_1'>;
export declare type HeadingTwoBlock = ExtractedBlockType<'heading_2'>;
export declare type HeadingThreeBlock = ExtractedBlockType<'heading_3'>;
export declare type HeadingBlock = HeadingOneBlock | HeadingTwoBlock | HeadingThreeBlock;
export declare type BulletedListItemBlock = ExtractedBlockType<'bulleted_list_item'>;
export declare type NumberedListItemBlock = ExtractedBlockType<'numbered_list_item'>;
export declare type QuoteBlock = ExtractedBlockType<'quote'>;
export declare type EquationBlock = ExtractedBlockType<'equation'>;
export declare type CodeBlock = ExtractedBlockType<'code'>;
export declare type CalloutBlock = ExtractedBlockType<'callout'>;
export declare type ToDoBlock = ExtractedBlockType<'to_do'>;
export declare type BookmarkBlock = ExtractedBlockType<'bookmark'>;
export declare type ToggleBlock = ExtractedBlockType<'toggle'>;
export declare type TemplateBlock = ExtractedBlockType<'template'>;
export declare type SyncedBlock = ExtractedBlockType<'synced_block'>;
export declare type BreadcrumbBlock = ExtractedBlockType<'breadcrumb'>;
export declare type ChildPageBlock = ExtractedBlockType<'child_page'>;
export declare type ChildDatabaseBlock = ExtractedBlockType<'child_database'>;
export declare type EmbedBlock = ExtractedBlockType<'embed'>;
export declare type ImageBlock = ExtractedBlockType<'image'>;
export declare type VideoBlock = ExtractedBlockType<'video'>;
export declare type PDFBlock = ExtractedBlockType<'pdf'>;
export declare type FileBlock = ExtractedBlockType<'file'>;
export declare type AudioBlock = ExtractedBlockType<'audio'>;
export declare type TocBlock = ExtractedBlockType<'table_of_contents'>;
export declare type DividerBlock = ExtractedBlockType<'divider'>;
export declare type ColumnBlock = ExtractedBlockType<'column'>;
export declare type ColumnListBlock = ExtractedBlockType<'column_list'>;
export declare type LinkPreviewBlock = ExtractedBlockType<'link_preview'>;
export declare type LinkToPageBlock = ExtractedBlockType<'link_to_page'>;
export declare type UnsupportedBlock = ExtractedBlockType<'unsupported'>;
/** RichText **/
export declare type RichText = ParagraphBlock['paragraph']['text'][number];
export declare type Annotations = RichText['annotations'];
export declare type RichTextType = RichText['type'];
export declare type ExtractedRichText<TType extends RichTextType> = Extract<
  RichText,
  {
    type: TType;
  }
>;
export declare type RichTextText = ExtractedRichText<'text'>;
export declare type RichTextMention = ExtractedRichText<'mention'>;
export declare type RichTextEquation = ExtractedRichText<'equation'>;
/** File **/
export declare type File = ImageBlock['image'];
export declare type FileType = File['type'];
export declare type ExtractedFile<TType extends FileType> = Extract<
  File,
  {
    type: TType;
  }
>;
export declare type ExternalFileWithCaption = Omit<ExtractedFile<'external'>, 'caption'> & {
  caption?: ExtractedFile<'external'>['caption'];
};
export declare type FileWithCaption = Omit<ExtractedFile<'file'>, 'caption'> & {
  caption?: ExtractedFile<'file'>['caption'];
};
/** Callout */
export declare type CalloutIcon = CalloutBlock['callout']['icon'];
export declare type CalloutValueMap = Extract<CalloutIcon, { type: {} }>;
export declare type CalloutIconType = CalloutValueMap['type'];
export declare type ExtractedCalloutIcon<TType extends CalloutIconType> = Extract<
  CalloutIcon,
  {
    type: TType;
  }
>;
export declare type CalloutIconEmoji = ExtractedCalloutIcon<'emoji'>;
export declare type CalloutIconExternal = ExtractedCalloutIcon<'external'>;
export declare type CalloutIconFile = ExtractedCalloutIcon<'file'>;
