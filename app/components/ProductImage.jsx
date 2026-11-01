
import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 * }}
 */
export function ProductImage({image}) {
  if (!image) {
    return <div className="product-image" />;
  }

  return (
    <div
      className="product-image"
      style={{
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
      }}
    >
      <Image
        alt={image.altText || 'Product Image'}
        data={image}
        key={image.id}
        sizes="(min-width: 768px) 450px, 100vw"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '450px',
          objectFit: 'contain',
          display: 'block',
          borderRadius: '8px',
        }}
      />
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
