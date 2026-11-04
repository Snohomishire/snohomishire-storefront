import {useLoaderData, useLocation, useNavigate} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Products`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request}) {
  const {storefront} = context;
 const url = new URL(request.url);
const requestedPageSize = Number(url.searchParams.get('pageSize'));

const pageSize = [12, 24, 48, 100].includes(requestedPageSize)
  ? requestedPageSize
  : 12;

const paginationVariables = getPaginationVariables(request, {
  pageBy: pageSize,
});

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {
  ...paginationVariables,
  sortKey: 'TITLE',
},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {products, pageSize};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  return {};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const {products, pageSize} = useLoaderData();
const location = useLocation();
const navigate = useNavigate();

function changePageSize(event) {
  const params = new URLSearchParams(location.search);

  params.set('pageSize', event.target.value);

  // Reset pagination when changing page size.
  params.delete('cursor');
  params.delete('direction');

  navigate(`${location.pathname}?${params.toString()}`);
}

  return (
    <div className="collection">
      <div
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    margin: '20px 0',
  }}
>
  <label htmlFor="products-per-page">Products per page:</label>

  <select
    id="products-per-page"
    value={pageSize}
    onChange={changePageSize}
    style={{
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      backgroundColor: 'white',
      color: '#333',
      cursor: 'pointer',
    }}
  >
    <option value="12">12</option>
    <option value="24">24</option>
    <option value="48">48</option>
    <option value="100">100</option>
  </select>
</div>
      <PaginatedResourceSection
        connection={products}
        resourcesClassName="products-grid"
      >
        {({node: product, index}) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
$sortKey: ProductSortKeys
  ) @inContext(country: $country, language: $language) {
    products(
  first: $first
  last: $last
  before: $startCursor
  after: $endCursor
  sortKey: $sortKey
) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
`;

/** @typedef {import('./+types/collections.all').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
