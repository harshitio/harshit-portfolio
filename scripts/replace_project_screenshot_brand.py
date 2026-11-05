#!/usr/bin/env python3
"""Replace visible 'Velcora' text in portfolio project screenshots with 'Harshit'.

Uses OCR to locate the word, OpenCV inpainting to remove the old glyphs, and
Pillow to draw the replacement at the same size. Original screenshots remain
in place; only detected brand text is altered.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

import cv2
import numpy as np
import pytesseract
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMAGE_ROOTS = [ROOT / "public" / "projects"]
REPORT_PATH = ROOT / "brand-replacement-report.json"
PSMS = (11, 6, 3, 12, 4)
SCALE = 2
EXPANDED_OCR_FILES = {
    "public/projects/chatbot-hub/col1-image1.webp",
    "public/projects/doc-pipeline/col1-image2.webp",
    "public/projects/doc-pipeline/col2-image.webp",
    "public/projects/lead-pipeline/col2-image.webp",
    "public/projects/sdr-pipeline/col1-image1.webp",
    "public/projects/sdr-pipeline/col1-image2.webp",
    "public/projects/sdr-pipeline/col2-image.webp",
}
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf"


def normalize(value: str) -> str:
    return re.sub(r"[^a-z]", "", value.lower())


def is_brand_token(value: str) -> bool:
    return "velcora" in normalize(value)


def replacement_for(value: str) -> str:
    def preserve_case(match: re.Match[str]) -> str:
        token = match.group(0)
        if token.isupper():
            return "HARSHIT"
        if token.islower():
            return "harshit"
        return "Harshit"

    # Replace only the brand substring. Keep email prefixes, domains, punctuation,
    # and adjoining labels intact (for example hello@velcora.ai -> hello@harshit.ai).
    return re.sub(r"velcora", preserve_case, value, flags=re.IGNORECASE)


def overlap(a: tuple[int, int, int, int], b: tuple[int, int, int, int]) -> float:
    x1, y1, x2, y2 = max(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3])
    if x2 <= x1 or y2 <= y1:
        return 0.0
    inter = (x2 - x1) * (y2 - y1)
    area_a = max(1, (a[2] - a[0]) * (a[3] - a[1]))
    area_b = max(1, (b[2] - b[0]) * (b[3] - b[1]))
    return inter / min(area_a, area_b)


def find_tokens(image: Image.Image, expanded: bool = False) -> list[tuple[tuple[int, int, int, int], str, float]]:
    scale = SCALE if expanded else 1
    enlarged = image.resize((image.width * scale, image.height * scale), Image.Resampling.LANCZOS)
    rgb = np.array(enlarged)
    found: list[tuple[tuple[int, int, int, int], str, float]] = []
    for psm in (PSMS if expanded else (11, 6)):
        data = pytesseract.image_to_data(
            rgb,
            config=f"--oem 3 --psm {psm}",
            output_type=pytesseract.Output.DICT,
        )
        for i, raw in enumerate(data["text"]):
            if not raw or not is_brand_token(raw):
                continue
            try:
                confidence = float(data["conf"][i])
            except (ValueError, TypeError):
                confidence = 0
            if confidence < 8:
                continue
            x = int(data["left"][i] / scale)
            y = int(data["top"][i] / scale)
            w = int(data["width"][i] / scale)
            h = int(data["height"][i] / scale)
            if w < 2 or h < 2:
                continue
            box = (max(0, x), max(0, y), min(image.width, x + w), min(image.height, y + h))
            if any(overlap(box, previous[0]) > 0.45 for previous in found):
                continue
            found.append((box, raw, confidence))
    return found


def foreground_colour(original: np.ndarray, box: tuple[int, int, int, int]) -> tuple[int, int, int]:
    x1, y1, x2, y2 = box
    pad = max(3, int((y2 - y1) * 0.7))
    xa, ya, xb, yb = max(0, x1 - pad), max(0, y1 - pad), min(original.shape[1], x2 + pad), min(original.shape[0], y2 + pad)
    patch = original[ya:yb, xa:xb].astype(np.float32)
    mask = np.ones(patch.shape[:2], dtype=bool)
    mask[y1 - ya:y2 - ya, x1 - xa:x2 - xa] = False
    border = patch[mask]
    if border.size == 0:
        return (255, 255, 255)
    background = np.median(border, axis=0)
    word = original[y1:y2, x1:x2].astype(np.float32)
    distance = np.linalg.norm(word - background, axis=2)
    pixels = word[distance > 35]
    if pixels.shape[0] < 3:
        bg_luma = float(np.mean(background))
        return (245, 245, 245) if bg_luma < 120 else (25, 25, 25)
    colour = np.median(pixels, axis=0)
    return tuple(int(max(0, min(255, v))) for v in colour)


def pick_font(raw: str, height: int, image: Image.Image):
    upper = raw.isupper()
    # A small number of original wordmarks use a serif face; use a serif
    # substitute for title-case tokens on light quote-builder screenshots.
    path = FONT_BOLD if upper else FONT_REGULAR
    size = max(8, int(height * 1.12))
    return ImageFont.truetype(path, size=size)


def replace_one(canvas: Image.Image, original: np.ndarray, box: tuple[int, int, int, int], raw: str) -> None:
    x1, y1, x2, y2 = box
    height = max(7, y2 - y1)
    pad_x = max(2, int(height * 0.14))
    pad_y = max(2, int(height * 0.12))
    mask = np.zeros(original.shape[:2], dtype=np.uint8)
    xa, ya = max(0, x1 - pad_x), max(0, y1 - pad_y)
    xb, yb = min(original.shape[1], x2 + pad_x), min(original.shape[0], y2 + pad_y)
    cv2.rectangle(mask, (xa, ya), (xb, yb), 255, thickness=-1)
    repaired = cv2.inpaint(original, mask, max(3, int(height * 0.22)), cv2.INPAINT_TELEA)
    canvas.paste(Image.fromarray(cv2.cvtColor(repaired, cv2.COLOR_BGR2RGB)))

    draw = ImageDraw.Draw(canvas)
    replacement = replacement_for(raw)
    colour = foreground_colour(original, box)[::-1]
    font = pick_font(raw, height, canvas)
    max_width = max(8, (x2 - x1) + pad_x)
    max_height = max(8, (y2 - y1) + pad_y * 2)
    for size in range(font.size, 6, -1):
        candidate = ImageFont.truetype(font.path, size=size)
        bounds = draw.textbbox((0, 0), replacement, font=candidate)
        if bounds[2] - bounds[0] <= max_width * 1.04 and bounds[3] - bounds[1] <= max_height * 1.35:
            font = candidate
            break
    bounds = draw.textbbox((0, 0), replacement, font=font)
    text_w, text_h = bounds[2] - bounds[0], bounds[3] - bounds[1]
    tx = max(0, min(canvas.width - text_w, x1 + (x2 - x1 - text_w) / 2 - bounds[0]))
    ty = max(0, min(canvas.height - text_h, y1 + (y2 - y1 - text_h) / 2 - bounds[1]))
    draw.text((int(tx), int(ty)), replacement, font=font, fill=colour)


def main() -> None:
    report = {"files_scanned": 0, "files_changed": 0, "occurrences_replaced": 0, "changes": []}
    files = sorted(p for root in IMAGE_ROOTS for p in root.rglob("*.webp"))
    for path in files:
        report["files_scanned"] += 1
        try:
            image = Image.open(path).convert("RGB")
        except Exception as exc:
            raise RuntimeError(f"Could not open {path}: {exc}") from exc
        relative_path = path.relative(ROOT).as_posix()
        tokens = find_tokens(image, expanded=relative_path in EXPANDED_OCR_FILES)
        if not tokens:
            continue
        original_rgb = np.array(image)
        canvas = image.copy()
        for box, raw, confidence in sorted(tokens, key=lambda t: (t[0][1], t[0][0])):
            current_bgr = cv2.cvtColor(np.array(canvas), cv2.COLOR_RGB2BGR)
            replace_one(canvas, current_bgr, box, raw)
        canvas.save(path, "WEBP", quality=96, method=6)
        report["files_changed"] += 1
        report["occurrences_replaced"] += len(tokens)
        report["changes"].append({
            "file": str(path.relative_to(ROOT)),
            "occurrences": len(tokens),
            "tokens": [raw for _, raw, _ in tokens],
        })

    REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    if report["occurrences_replaced"] == 0:
        raise SystemExit("No Velcora text was detected; refusing to create an empty rename change.")

    # Verify the modified files with a second OCR pass.
    leftovers = []
    changed_paths = [ROOT / entry["file"] for entry in report["changes"]]
    for path in changed_paths:
        image = Image.open(path).convert("RGB")
        remaining = find_tokens(image)
        if remaining:
            leftovers.append({"file": str(path.relative_to(ROOT)), "tokens": [raw for _, raw, _ in remaining]})
    if leftovers:
        print(json.dumps({"verification_leftovers": leftovers}, indent=2))
        raise SystemExit("Some old-brand text remains; review the screenshots before merging.")


if __name__ == "__main__":
    main()
