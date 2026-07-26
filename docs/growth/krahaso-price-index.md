# Krahaso Price Index Architecture

This document defines the future public price-index structure and trust threshold. It does not authorise data integration or public product pages in the current website.

## Future URL structure

- `/cmimet/`
- `/produkt/[slug]/`
- `/marketet/`
- `/marketet/[slug]/`
- `/kategori/[slug]/`
- `/ofertat/`
- `/uljet/`
- `/shporta/`

None of these routes should be generated until the relevant records pass the indexability contract below.

## Indexability contract

A product page may be generated and indexed only when all of the following are true:

1. Canonical product identity is resolved.
2. The exact GTIN/barcode identity is trusted.
3. At least two useful supermarket price observations exist.
4. The source for every displayed price is known.
5. Every observation has an update timestamp.
6. Every price remains inside the configured freshness window for its source type.
7. No uncertain AI match is presented as an exact product identity.
8. No inferred or estimated value is presented as a current shelf price.

If any condition fails, the page must not be generated or indexed. An uncertain match may support internal review, but it must not become public exact-comparison evidence.

## Future display fields

- Product name
- Brand
- Pack size
- Barcode/GTIN where appropriate
- Supermarket
- Price
- Source type
- Updated timestamp
- Promotion validity where applicable
- Report incorrect price action

## Source labels

The interface may eventually support:

- Nga marketi
- Nga oferta
- Verifikuar nga Krahaso
- Raportuar nga përdoruesi

A label may appear only when the backend stores evidence that genuinely supports it. The website must not infer a stronger trust label from incomplete provenance.

## Trust and freshness

Freshness windows belong to the data source type, not to the website template. Promotion prices require an explicit validity period where the source supplies one. Expired or stale observations must not be presented as live prices.

The public price index must retain a clear route for reporting an incorrect price and must distinguish exact identity from equivalent-pack or similar-product discovery.
