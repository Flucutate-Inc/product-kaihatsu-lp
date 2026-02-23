import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_ROOT = path.join(process.cwd(), "app", "content", "cases");

export function getAllCaseIds() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_ROOT)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getAllCaseSummaries() {
  return getAllCaseIds().map((id) => {
    const filePath = path.join(CONTENT_ROOT, `${id}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const frontMatter = data || {};

    return {
      id,
      title: frontMatter.title || id,
      lead: frontMatter.lead || "",
      summary: frontMatter.summary || frontMatter.lead || "",
      meta: frontMatter.meta || "",
      tags: frontMatter.tags || [],
      imageSrc: frontMatter.imageSrc || `/cases/${id}/hero.png`,
      order: typeof frontMatter.order === "number" ? frontMatter.order : null,
    };
  });
}

export async function getCaseMarkdownHtml(id) {
  const filePath = path.join(CONTENT_ROOT, `${id}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    frontMatter: data || {},
    contentHtml,
  };
}
