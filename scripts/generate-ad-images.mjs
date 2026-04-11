// One-off script to generate Google Ads image assets as PNG files
// on disk — NOT as public routes. The /ads/landscape, /ads/square,
// /ads/logo routes that existed briefly have been removed so the
// images aren't discoverable via URL.
//
// Usage:
//   node scripts/generate-ad-images.mjs
//
// Output:
//   ad-assets/weightlossrankings-landscape-1200x628.png
//   ad-assets/weightlossrankings-square-1200x1200.png
//   ad-assets/weightlossrankings-logo-1200x1200.png
//
// The ad-assets/ directory is in .gitignore so the generated files
// never leak into the repo or onto the web.

import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "ad-assets");

// ── Landscape 1200 × 628 ────────────────────────────────────────────
function LandscapeImage() {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #6d28d9 100%)",
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: 12,
              height: "100%",
              background: "linear-gradient(180deg, #8b5cf6, #3b82f6)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 72,
              paddingRight: 48,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 22px",
                    borderRadius: 999,
                    background: "rgba(139, 92, 246, 0.25)",
                    border: "1.5px solid rgba(139, 92, 246, 0.5)",
                    color: "#e9d5ff",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    marginBottom: 22,
                    alignSelf: "flex-start",
                  },
                  children: "WEIGHTLOSSRANKINGS.ORG",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: 78,
                    fontWeight: 900,
                    lineHeight: 0.95,
                    letterSpacing: -2.5,
                    marginBottom: 20,
                  },
                  children: "Compare 154+",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 78,
                    fontWeight: 900,
                    lineHeight: 0.95,
                    letterSpacing: -2.5,
                    marginBottom: 28,
                    background: "linear-gradient(90deg, #c4b5fd, #60a5fa)",
                    backgroundClip: "text",
                    color: "transparent",
                  },
                  children: "GLP-1 Providers",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "rgba(255,255,255,0.88)",
                    fontSize: 32,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    maxWidth: 700,
                  },
                  children:
                    "Independent editorial reviews with live pricing, state coverage, and primary-source clinical data.",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              width: 340,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingRight: 60,
              gap: 24,
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "#c4b5fd",
                          fontSize: 18,
                          fontWeight: 600,
                          letterSpacing: 1,
                        },
                        children: "STARTING AT",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "white",
                          fontSize: 64,
                          fontWeight: 900,
                          lineHeight: 1,
                          marginTop: 4,
                        },
                        children: "$99/mo",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 18,
                          marginTop: 4,
                        },
                        children: "compounded GLP-1",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    height: 1,
                    width: 220,
                    background: "rgba(255,255,255,0.2)",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "#c4b5fd",
                          fontSize: 18,
                          fontWeight: 600,
                          letterSpacing: 1,
                        },
                        children: "COVERAGE",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "white",
                          fontSize: 38,
                          fontWeight: 800,
                          lineHeight: 1,
                          marginTop: 4,
                        },
                        children: "All 50 states",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── Square 1200 × 1200 ──────────────────────────────────────────────
function SquareImage() {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(155deg, #1e1b4b 0%, #4c1d95 40%, #6d28d9 100%)",
        position: "relative",
        paddingLeft: 88,
        paddingRight: 88,
        paddingTop: 88,
        paddingBottom: 88,
        justifyContent: "space-between",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 16 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 28px",
                    borderRadius: 999,
                    background: "rgba(139, 92, 246, 0.25)",
                    border: "1.5px solid rgba(139, 92, 246, 0.5)",
                    color: "#e9d5ff",
                    fontSize: 26,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    alignSelf: "flex-start",
                  },
                  children: "WEIGHT LOSS RANKINGS",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: 120,
                    fontWeight: 900,
                    lineHeight: 0.92,
                    letterSpacing: -4,
                  },
                  children: "Compare",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: 120,
                    fontWeight: 900,
                    lineHeight: 0.92,
                    letterSpacing: -4,
                  },
                  children: "154+ GLP-1",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 120,
                    fontWeight: 900,
                    lineHeight: 0.92,
                    letterSpacing: -4,
                    marginBottom: 32,
                    background: "linear-gradient(90deg, #c4b5fd, #60a5fa)",
                    backgroundClip: "text",
                    color: "transparent",
                  },
                  children: "Providers",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "rgba(255,255,255,0.88)",
                    fontSize: 40,
                    fontWeight: 500,
                    lineHeight: 1.25,
                    maxWidth: 900,
                  },
                  children:
                    "Independent editorial reviews with live pricing and primary-source clinical data.",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "row",
              gap: 64,
              alignItems: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "#c4b5fd",
                          fontSize: 22,
                          fontWeight: 600,
                          letterSpacing: 1,
                        },
                        children: "FROM",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "white",
                          fontSize: 72,
                          fontWeight: 900,
                          lineHeight: 1,
                          marginTop: 4,
                        },
                        children: "$99/mo",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    width: 2,
                    height: 96,
                    background: "rgba(255,255,255,0.2)",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "#c4b5fd",
                          fontSize: 22,
                          fontWeight: 600,
                          letterSpacing: 1,
                        },
                        children: "COVERAGE",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "white",
                          fontSize: 52,
                          fontWeight: 900,
                          lineHeight: 1,
                          marginTop: 4,
                        },
                        children: "All 50 states",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── Logo 1200 × 1200 ────────────────────────────────────────────────
function LogoImage() {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 160,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              width: 440,
              height: 440,
              borderRadius: 88,
              background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 56,
              boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: 260,
                    fontWeight: 900,
                    letterSpacing: -8,
                    lineHeight: 1,
                    fontFamily: "serif",
                  },
                  children: "W",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "#1e1b4b",
                    fontSize: 84,
                    fontWeight: 900,
                    letterSpacing: -2,
                    lineHeight: 1,
                  },
                  children: "Weight Loss",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 84,
                    fontWeight: 900,
                    letterSpacing: -2,
                    lineHeight: 1,
                    background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                    backgroundClip: "text",
                    color: "transparent",
                  },
                  children: "Rankings",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderToFile(imageDescriptor, size, outFile) {
  const response = new ImageResponse(imageDescriptor, size);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outFile, buffer);
  console.log(`  ✓ ${outFile} (${size.width}×${size.height}, ${buffer.length} bytes)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`Generating ad assets into ${OUT_DIR}/`);

  await renderToFile(
    LandscapeImage(),
    { width: 1200, height: 628 },
    path.join(OUT_DIR, "weightlossrankings-landscape-1200x628.png"),
  );
  await renderToFile(
    SquareImage(),
    { width: 1200, height: 1200 },
    path.join(OUT_DIR, "weightlossrankings-square-1200x1200.png"),
  );
  await renderToFile(
    LogoImage(),
    { width: 1200, height: 1200 },
    path.join(OUT_DIR, "weightlossrankings-logo-1200x1200.png"),
  );

  console.log("\nDone. Upload these 3 files to Google Ads:");
  console.log(`  Landscape: ${path.join(OUT_DIR, "weightlossrankings-landscape-1200x628.png")}`);
  console.log(`  Square:    ${path.join(OUT_DIR, "weightlossrankings-square-1200x1200.png")}`);
  console.log(`  Logo:      ${path.join(OUT_DIR, "weightlossrankings-logo-1200x1200.png")}`);
}

main().catch((err) => {
  console.error("Failed to generate ad assets:", err);
  process.exit(1);
});
