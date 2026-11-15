import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { JsonLdScript } from "./json-ld-script";
import { buildBlogPostingSchema } from "./schemas/blog-posting";
import { buildFaqPageSchema } from "./schemas/faq-page";

const hostileTitle = 'Mon article</script><script>alert("x")</script>';

describe("JSON-LD script", () => {
  test("an article title containing </script> does not close the block", () => {
    const html = renderToStaticMarkup(
      <JsonLdScript
        data={buildBlogPostingSchema({
          headline: hostileTitle,
          description: hostileTitle,
          url: "https://axelhamilcaro.com/blog/test",
          datePublished: "2026-01-01",
          dateModified: "2026-01-01",
          image: "https://axelhamilcaro.com/blog/test/og",
          author: "Axel Hamilcaro",
        })}
      />,
    );

    assert.equal(html.match(/<\/script>/gi)?.length, 1);
    assert.equal(html.match(/<script/gi)?.length, 1);

    const body = html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");

    assert.equal(JSON.parse(body).headline, hostileTitle);
  });

  test("a FAQ answer containing markup stays inside the block", () => {
    const html = renderToStaticMarkup(
      <JsonLdScript
        data={buildFaqPageSchema([
          { question: "<b>Pourquoi ?</b>", answer: "</script><img src=x>" },
        ])}
      />,
    );

    assert.equal(html.match(/<\/script>/gi)?.length, 1);
    assert.ok(!html.includes("<img"));
  });
});
