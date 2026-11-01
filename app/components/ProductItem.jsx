
import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: '280px',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {image && (
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            backgroundColor: '#f8f8f5',
            borderRadius: '8px',
          }}
        >
          <Image
            alt={image.altText || product.title}
            data={image}
            loading={loading}
            sizes="(min-width: 768px) 280px, 45vw"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      )}

      <h4
        style={{
          fontSize: '16px',
          fontWeight: '600',
          marginTop: '12px',
          marginBottom: '5px',
        }}
      >
        {product.title}
      </h4>

      <small style={{fontSize: '15px'}}>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
