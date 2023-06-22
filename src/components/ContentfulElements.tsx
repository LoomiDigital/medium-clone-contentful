import { ReactElement, ReactNode } from "react";
import { BLOCKS, Inline, INLINES } from "@contentful/rich-text-types";

type Children = {
  children: ReactNode;
};

const Text = ({ children }: Children): ReactElement => (
  <p className="my-5 text-black-700">{children}</p>
);

export const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <Text>{children}</Text>
    ),
    [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
      <h1 className="text-2xl font-bold my-5">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h2 className="text-xl font-bold my-5">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
      <h3>{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => (
      <h4>{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: unknown, children: ReactNode) => (
      <h5>{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: unknown, children: ReactNode) => (
      <h6>{children}</h6>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (_node: unknown, children: ReactNode) => (
      <div>{children}</div>
    ),
    [BLOCKS.EMBEDDED_RESOURCE]: (_node: unknown, children: ReactNode) => (
      <div>{children}</div>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
      <li className="ml-4 list-disc">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
      <blockquote>{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr />,
    [BLOCKS.TABLE]: (_node: unknown, children: ReactNode) => (
      <table>
        <tbody>{children}</tbody>
      </table>
    ),
    [BLOCKS.TABLE_ROW]: (_node: unknown, children: ReactNode) => (
      <tr>{children}</tr>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node: unknown, children: ReactNode) => (
      <th>{children}</th>
    ),
    [BLOCKS.TABLE_CELL]: (_node: unknown, children: ReactNode) => (
      <td>{children}</td>
    ),
    [INLINES.ASSET_HYPERLINK]: (node: unknown) =>
      defaultInline(INLINES.ASSET_HYPERLINK, node as Inline),
    [INLINES.ENTRY_HYPERLINK]: (node: unknown) =>
      defaultInline(INLINES.ENTRY_HYPERLINK, node as Inline),
    [INLINES.EMBEDDED_ENTRY]: (node: unknown) =>
      defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline),
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
      <a className="text-blue-500 hover:underline" href={node.data.uri}>
        {children}
      </a>
    ),
  },
};

const defaultInline = (_type: string, node: Inline): ReactNode => (
  <span key={node.data.target.sys.id}>
    type: {node.nodeType} id: {node.data.target.sys.id}
  </span>
);
