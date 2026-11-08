import {useLoaderData} from 'react-router';
import {useEffect, useState} from 'react';


export const meta = () => [{title: 'Snohomishire | The Orchard Field Guide'}, {name: 'description', content: 'Heritage grafted apple trees, apple grafting scions, grape cuttings and fig cuttings.'}];

// Faithful visual recreation of the supplied original HTML design.
// Static content only: no demo cart, invented prices, or fake newsletter signup.
const originalHomepageMarkup = "<div class=\"announcement\">FIELD NOTES FOR FRUIT PEOPLE · EST. IN THE PACIFIC NORTHWEST</div><header class=\"nav\">\n<a aria-label=\"Snohomishire home\" class=\"brand brand-image\" href=\"/\"><img alt=\"Snohomishire logo featuring Mount Rainier\" width=\"140\" height=\"140\" style=\"width:140px;height:140px;object-fit:contain;\" src=\"/images/snohomishire-logo.png\"/></a>\n<nav class=\"navlinks\"><a href=\"#shop\">Shop trees &amp; scions</a><a href=\"#our-way\">Our approach</a><a href=\"#contact\">Contact information coming soon</a></nav>\n\n</header><main>\n<section class=\"hero\">\n<div class=\"hero-copy\"><div class=\"eyebrow\">THE GOOD LIFE, GROWN AT HOME</div><h1>A little wild.<br/>A little heirloom.<br/><em>Entirely yours.</em></h1><p>The best fruit doesn't come from a grocery store. It comes from your own backyard, picked at just the right moment, with a story worth sharing.</p><div><a class=\"button\" href=\"#shop\">Explore the field guide <span aria-hidden=\"true\">↗</span></a></div></div>\n<div aria-label=\"Espalier apple tree with multiple apple varieties\" class=\"hero-art\" style=\"background-image:url(/images/espalier-apple-tree.png);background-size:cover;background-position:center;\"><div class=\"sun\" style=\"display:none\"></div><div class=\"tree\" style=\"display:none\"><div class=\"branch\"></div><div class=\"branch b2\"></div><div class=\"canopy c1\"></div><div class=\"canopy c2\"></div><div class=\"canopy c3\"></div><i class=\"fruit f1\"></i><i class=\"fruit f2\"></i><i class=\"fruit f3\"></i><i class=\"fruit f4\"></i><div class=\"trunk\"></div></div></div>\n</section>\n<section class=\"intro\"><div class=\"eyebrow\">THE SNOHOMISHIRE POINT OF VIEW</div><h2>Not just trees.<br/>Future memories.</h2><p>We’re here for the first-time planter, the backyard experimenter, and the person who can name every apple in the farm stand. Our kind of gardening is practical, a little nostalgic, and always delicious.</p></section>\n<section class=\"shop\" id=\"shop\">\n<div class=\"section-head\"><div><div class=\"eyebrow\">THE VARIETY INDEX · VOL. 01</div><h2>Choose your kind of fruit</h2></div><p>Explore the kinds of fruit plants we plan to offer. Individual varieties and availability will be announced here.</p></div>\n\n<div class=\"grid\" id=\"products\">\n\n\n\n<article class=\"product\"><div class=\"product-art\"></div><div class=\"product-body\"><h3>Grafted Apple Trees</h3><p>Grafted apple trees for home gardens and small orchards.</p></div></article><article class=\"product\"><div class=\"product-art\"></div><div class=\"product-body\"><h3><a href=\"/collections/apple-scions\" style=\"color:inherit;text-decoration:none;\">Apple Scions</a></h3><p>Scionwood to add new varieties to your home orchard.</p></div></article><article class=\"product\"><div class=\"product-art\"></div><div class=\"product-body\"><h3>Grape Cuttings</h3><p>Cuttings for growing grapevines at home.</p></div></article><article class=\"product\"><div class=\"product-art\"></div><div class=\"product-body\"><h3>Fig Cuttings</h3><p>Cuttings for growing figs in your garden.</p></div></article></div>\n</section>\n<section class=\"story\" id=\"our-way\"><div class=\"story-visual\"><div class=\"rings\"></div></div><div class=\"story-copy\"><div class=\"eyebrow\">FROM THE ORCHARD NOTEBOOK · NO. 01</div><h2>Good fruit takes a little know-how.</h2><p>The right tree for your space depends on more than the fruit you love. Chill hours, pollination partners, rootstock, and harvest timing all matter. We want to help you choose with confidence—not guess at the garden center.</p><a class=\"button outline\" href=\"#grow-notes\">Read the grower notes ↗</a></div></section>\n<section class=\"grow-notes\" id=\"grow-notes\">\n<div class=\"grow-heading\"><div class=\"eyebrow\">THE THREE THINGS WE CHECK FIRST</div><h2>Before you plant,<br/>get to know your tree.</h2><p>Good choices now make happier orchards later. Start with these three details.</p></div>\n<div class=\"grow-list\">\n<article><span class=\"grow-no\">01</span><div><h3>Chill hours</h3><p>Does your variety get enough winter cold where you live?</p></div><span class=\"grow-arrow\">↗</span></article>\n<article><span class=\"grow-no\">02</span><div><h3>Pollination</h3><p>Will it need a compatible flowering partner nearby?</p></div><span class=\"grow-arrow\">↗</span></article>\n<article><span class=\"grow-no\">03</span><div><h3>Harvest window</h3><p>Plan for the fruit you want—and when you want to pick it.</p></div><span class=\"grow-arrow\">↗</span></article>\n</div>\n<p class=\"grow-footnote\">We’ll add variety-specific growing information as the catalog takes shape.</p>\n</section>\n<section class=\"newsletter\" id=\"contact\"><div class=\"eyebrow\">POSTCARDS FROM THE ORCHARD</div><h2>A good thing is growing.</h2><p>Seasonal nursery news and growing notes will be available here soon.</p></section>\n</main><footer class=\"footer\">Snohomishire · Heritage fruit trees, scions, grape cuttings, and fig cuttings.</footer>";


const COLLECTIONS = [
  {handle: 'grafted-apple-trees', title: 'Grafted Apple Trees'},
  {handle: 'apple-scions', title: 'Apple Scions'},
  {handle: 'grape-cuttings', title: 'Grape Cuttings'},
  {handle: 'fig-cuttings', title: 'Fig Cuttings'},
  {
    handle: 'historic-black-rock-commercial-orchard',
    title: 'Historic Black Rock Commercial Orchard',
  },
];

const HOMEPAGE_COLLECTION_QUERY = `#graphql
  query HomepageCollectionImages {
    collections(first: 250) {
      nodes {
        handle
        image {
          url(transform: {maxWidth: 1000})
        }
      }
    }
  }
`;

export async function loader({context}) {
  const result = await context.storefront.query(HOMEPAGE_COLLECTION_QUERY);
  const images = {};

  for (const collection of result?.collections?.nodes || []) {
    if (collection.image?.url) {
      images[collection.handle] = collection.image.url;
    }
  }

  return {images};
}


const COLLECTION_SLIDER_CSS = `

  /* SNOHOMISHIRE_IMAGE_CONTAINMENT_V1 */
  .snohomishire-original #products .product-art {
    overflow: hidden;
  }

  .snohomishire-original #products .product-art > img {
    width: 100% !important;
    height: 100% !important;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover !important;
    display: block;
  }


  /* SNOHOMISHIRE_CLEAN_CAROUSEL_V1 */

  /* Collection cards */
  .snohomishire-original #products {
    display: flex !important;
    gap: 22px;
    overflow-x: auto !important;
    overflow-y: hidden;
    scroll-snap-type: none !important;
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;
    padding-bottom: 14px;
    scrollbar-width: none;
  }

  .snohomishire-original #products::-webkit-scrollbar {
    display: none;
  }

  .snohomishire-original #products > .product {
    display: block !important;
    flex: 0 0 calc((100% - 44px) / 3) !important;
    min-width: 0;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    transition:
      box-shadow 250ms ease,
      background-color 250ms ease;
  }

  /* Moving selection highlight */
  .snohomishire-original #products > .product.collection-selected {
    box-shadow: inset 0 0 0 3px #60784c;
    background-color: rgba(112, 141, 83, 0.06);
  }

  .snohomishire-original #products > .product:focus-visible {
    outline: 3px solid #55734c;
    outline-offset: -3px;
  }

  /* Navigation */
  .snohomishire-original .collection-slider-bottom {
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin-top: 24px;
  }

  .snohomishire-original .collection-slider-bottom > .collection-slider-arrow {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    margin: 0;
  }

  .snohomishire-original .collection-slider-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid currentColor;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    font-size: 24px;
    cursor: pointer;
  }

  .snohomishire-original .collection-slider-arrow:hover {
    background: rgba(100, 110, 70, 0.12);
  }

  /* Navigation dots */
  .snohomishire-original .collection-slider-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .snohomishire-original .collection-slider-dot {
    width: 9px;
    height: 9px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #c8c7b9;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }

  .snohomishire-original .collection-slider-dot[aria-current="true"] {
    background: #60784c;
    transform: scale(1.35);
  }

  /* Tablet: two cards */
  @media (max-width: 900px) {
    .snohomishire-original #products > .product {
      flex: 0 0 calc((100% - 22px) / 2) !important;
    }
  }

  /* Mobile: one card with a preview of the next */
  @media (max-width: 600px) {
    .snohomishire-original #products > .product {
      flex: 0 0 85% !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .snohomishire-original #products {
      scroll-behavior: auto;
    }

    .snohomishire-original #products > .product {
      transition: none;
    }
  }
`;

export default function Homepage() {
  const {images} = useLoaderData();

  let markup = originalHomepageMarkup;

  const cards = markup.split('<article class="product">');

  for (let index = 0; index < 4; index++) {
    const collection = COLLECTIONS[index];
    const imageUrl = images[collection.handle];

    if (imageUrl && cards[index + 1]) {
      cards[index + 1] = cards[index + 1].replace(
        '<div class="product-art">',
        '<div class="product-art">' +
          '<img src="' + imageUrl + '" alt="' + collection.title + '" ' +
          'style="width:100%;height:100%;object-fit:cover;display:block;" />'
      );
    }
  }

  markup = cards.join('<article class="product">');

  const fifth = COLLECTIONS[4];
  const fifthImage = images[fifth.handle];

  const fifthCard =
    '<article class="product">' +
      '<div class="product-art">' +
        (fifthImage
          ? '<img src="' + fifthImage + '" alt="' + fifth.title + '" ' +
            'style="width:100%;height:100%;object-fit:cover;display:block;" />'
          : '') +
        '' +
      '</div>' +
      '<div class="product-body">' +
        '<h3>' + fifth.title + '</h3>' +
        '<p>Explore the history and fruit varieties of this historic orchard.</p>' +
      '</div>' +
    '</article>';

  const gridEnd = '</div>\n</section>\n<section class="story"';

  if (markup.includes(gridEnd)) {
    markup = markup.replace(
      gridEnd,
      fifthCard + gridEnd
    );
  }

  for (const collection of COLLECTIONS) {
    const url = '/collections/' + collection.handle;
    const escapedTitle = collection.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    markup = markup.replace(
      new RegExp('<h3>(?:<a[^>]*>)?' + escapedTitle + '(?:</a>)?</h3>'),
      '<h3><a href="' + url +
        '" style="color:inherit;text-decoration:none;">' +
        collection.title + '</a></h3>'
    );
  }


  // Give every collection card a full-card link while preserving its design.

  // SNOHOMISHIRE_SLIDER_DOTS_V1
  const dotButtons = COLLECTIONS.map((collection, index) =>
    '<button type="button" class="collection-slider-dot" ' +
    'data-slider-dot="' + index + '" ' +
    'aria-label="Show ' + collection.title + '" ' +
    'aria-current="' + (index === 0 ? 'true' : 'false') + '">' +
    '</button>'
  ).join('');

  const navigationMarkup =
    '<div class="collection-slider-bottom">' +
      '<button type="button" class="collection-slider-arrow" ' +
        'data-slider-direction="previous" aria-label="Previous collections">' +
        '&#8592;</button>' +
      '<div class="collection-slider-dots" aria-label="Collection navigation">' +
        dotButtons +
      '</div>' +
      '<button type="button" class="collection-slider-arrow" ' +
        'data-slider-direction="next" aria-label="Next collections">' +
        '&#8594;</button>' +
    '</div>';

  const sliderEnd = '</div>\n</section>\n<section class="story"';

  if (markup.includes(sliderEnd)) {
    markup = markup.replace(
      sliderEnd,
      '</div>' + navigationMarkup + '\n</section>\n<section class="story"'
    );
  }

  for (const collection of COLLECTIONS) {
    const title = collection.title;
    const url = '/collections/' + collection.handle;
    const titlePosition = markup.indexOf('<h3>', markup.indexOf('id="products"'));

    // Locate this card by its collection heading.
    const headingStart = markup.indexOf(title, markup.indexOf('id="products"'));
    if (headingStart < 0) continue;

    const articleStart = markup.lastIndexOf('<article class="product">', headingStart);
    const articleEnd = markup.indexOf('</article>', headingStart);

    if (articleStart < 0 || articleEnd < 0) continue;

    const article = markup.slice(articleStart, articleEnd + 10);

    const updatedArticle = article.replace(
      '<article class="product">',
      '<article class="product" data-collection-url="' + url +
        '" tabindex="0" role="link" aria-label="Shop ' + title + '">'
    );

    markup = markup.slice(0, articleStart) +
      updatedArticle +
      markup.slice(articleEnd + 10);
  }



  // SNOHOMISHIRE_FIVE_POSITION_NAV_V1
  const [activeCollection, setActiveCollection] = useState(0);


  // SNOHOMISHIRE_CENTERED_CAROUSEL_V2

  // SNOHOMISHIRE_MOVING_HIGHLIGHT_V1
  useEffect(() => {
    const root = document.querySelector('.snohomishire-original');
    const grid = root?.querySelector('#products');
    if (!grid) return;

    const cards = [...grid.querySelectorAll('.product')];

    cards.forEach((card, index) => {
      card.classList.toggle(
        'collection-selected',
        index === activeCollection
      );
    });

    root.querySelectorAll('.collection-slider-dot').forEach((dot, index) => {
      dot.setAttribute(
        'aria-current',
        index === activeCollection ? 'true' : 'false'
      );
    });

    const selectedCard = cards[activeCollection];
    if (selectedCard) {
      const cardLeft = selectedCard.offsetLeft - cards[0].offsetLeft;
      const cardRight = cardLeft + selectedCard.offsetWidth;
      const viewLeft = grid.scrollLeft;
      const viewRight = viewLeft + grid.clientWidth;

      if (cardLeft < viewLeft) {
        grid.scrollTo({left: cardLeft, behavior: 'smooth'});
      } else if (cardRight > viewRight) {
        grid.scrollTo({
          left: cardRight - grid.clientWidth,
          behavior: 'smooth',
        });
      }
    }
  }, [activeCollection]);

  const navigateToCollection = (grid, index) => {
    if (!grid) return;
    const total = COLLECTIONS.length;
    setActiveCollection(((index % total) + total) % total);
  };

  const handleSliderClick = (event) => {


    const grid = event.currentTarget.querySelector('#products');

    const dot = event.target.closest('[data-slider-dot]');
    if (dot && grid) {
      navigateToCollection(grid, Number(dot.dataset.sliderDot));
      return;
    }

    const button = event.target.closest('[data-slider-direction]');
    if (button && grid) {
      const direction = button.dataset.sliderDirection === 'next' ? 1 : -1;
      navigateToCollection(grid, activeCollection + direction);
      return;
    }

    const card = event.target.closest('[data-collection-url]');
    if (card && !event.target.closest('a, button')) {
      window.location.assign(card.dataset.collectionUrl);
    }
  };

  const handleSliderKeyDown = (event) => {
    const card = event.target.closest('[data-collection-url]');
    if (card && event.target === card &&
        (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      window.location.assign(card.dataset.collectionUrl);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: COLLECTION_SLIDER_CSS}} />
    <div
      className="snohomishire-original"
      onClick={handleSliderClick}
      onKeyDown={handleSliderKeyDown}
      dangerouslySetInnerHTML={{__html: markup}}
    />
    </>
  );
}
