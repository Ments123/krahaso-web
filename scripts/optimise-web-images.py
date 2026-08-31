#!/usr/bin/env python3
"""Generate and verify the modern image assets used by the landing page."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
TARGETS = (
    ("public/app/krahaso-home.jpg", "public/app/krahaso-home.webp", 86),
    ("public/app/krahaso-home-feed.jpg", "public/app/krahaso-home-feed.webp", 86),
    ("public/app/krahaso-offers.jpg", "public/app/krahaso-offers.webp", 86),
    ("public/app/krahaso-scanner.jpg", "public/app/krahaso-scanner.webp", 86),
    ("public/app/krahaso-basket.jpg", "public/app/krahaso-basket.webp", 86),
    ("public/app/krahaso-rewards.jpg", "public/app/krahaso-rewards.webp", 86),
    ("public/products/coffee.png", "public/products/coffee.webp", 88),
    ("public/products/oil.png", "public/products/oil.webp", 88),
    ("public/products/eggs.png", "public/products/eggs.webp", 88),
    ("public/products/detergent.png", "public/products/detergent.webp", 88),
)


def generate() -> None:
    for source_name, target_name, quality in TARGETS:
        source = ROOT / source_name
        target = ROOT / target_name
        with Image.open(source) as image:
            image.save(target, "WEBP", quality=quality, method=6, exact=True)


def verify() -> tuple[int, int]:
    source_total = 0
    output_total = 0

    for source_name, target_name, _ in TARGETS:
        source = ROOT / source_name
        target = ROOT / target_name
        if not target.is_file():
            raise SystemExit(f"missing generated image: {target_name}")

        with Image.open(source) as original, Image.open(target) as converted:
            if converted.size != original.size:
                raise SystemExit(
                    f"dimension mismatch for {target_name}: "
                    f"{converted.size} != {original.size}"
                )

        source_size = source.stat().st_size
        output_size = target.stat().st_size
        if output_size >= source_size:
            raise SystemExit(
                f"generated image is not smaller: {target_name} "
                f"({output_size} >= {source_size})"
            )
        source_total += source_size
        output_total += output_size

    if output_total > source_total * 0.65:
        raise SystemExit(
            f"image reduction below 35%: {output_total} of {source_total} bytes"
        )

    return source_total, output_total


if __name__ == "__main__":
    if "--check" not in sys.argv:
        generate()
    before, after = verify()
    saved = 100 * (1 - after / before)
    print(f"verified {len(TARGETS)} images: {before} -> {after} bytes ({saved:.1f}% smaller)")
