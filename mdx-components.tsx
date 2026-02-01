import type { MDXComponents } from 'mdx/types';
import AffiliateHotel, { AffiliateHotelInline } from '@/components/AffiliateHotel';
import AffiliateFlight from '@/components/AffiliateFlight';
import CallToAction, { NewsletterCTA, RelatedCTA, PackingListCTA } from '@/components/CallToAction';

// Eksporter komponenter direkte til brug med MDXRemote
export const mdxComponents: MDXComponents = {
    // Affiliate & CTA komponenter
    AffiliateHotel,
    AffiliateHotelInline,
    AffiliateFlight,
    CallToAction,
    NewsletterCTA,
    RelatedCTA,
    PackingListCTA,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-800">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-indigo-600 hover:text-indigo-800 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-gray-700">{children}</td>
    ),
    li: ({ children }) => (
      <li className="text-gray-700">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    hr: () => (
      <hr className="my-8 border-t border-gray-200" />
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
