
import {useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 *   images?: Array<{
 *     id: string;
 *     url: string;
 *     altText?: string | null;
 *     width?: number;
 *     height?: number;
 *   }>;
 * }}
 */
export function ProductImage({image, images = []}) {
  const allImages = [
    ...(image ? [image] : []),
    ...images.filter((item) => item.id !== image?.id),
  ];

  const [selectedImage, setSelectedImage] = useState(
    allImages[0] || null,
  );

  useEffect(() => {
    setSelectedImage(allImages[0] || null);
  }, [image?.id, images]);

  if (!selectedImage) {
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
        key={selectedImage.id}
        data={selectedImage}
        alt={selectedImage.altText || 'Product Image'}
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

      {allImages.length > 1 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '15px',
          }}
        >
          {allImages.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              aria-label={`View image: ${item.altText || 'Product photo'}`}
              aria-pressed={selectedImage.id === item.id}
              style={{
                width: '75px',
                height: '75px',
                padding: '4px',
                background: 'white',
                border:
                  selectedImage.id === item.id
                    ? '2px solid #476b43'
                    : '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              <Image
                data={item}
                alt={item.altText || 'Product thumbnail'}
                sizes="75px"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
