const fs = require('fs');
const path = require('path');
const moment = require('moment'); // Include moment.js to work with dates

// Create a formatted pubDate
const postDate = "March 28, 2025 at 9:30 AM";
const parsed = moment(postDate, "MMMM D, YYYY [at] h:mm A");
if (!parsed.isValid())
{
    console.error("❌ Invalid date:", postDate);
}
else
{
    const pubDate = parsed.utc().format('ddd, DD MMM YYYY HH:mm:ss +0000');
    console.log("✅ Parsed RSS pubDate:", pubDate);
}

const blogDir = './blog';
const baseUrl = 'https://annewalkerfarrell.com/blog';

const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

const posts = files.map(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  const matchTitle = content.match(/<title>(.*?)<\/title>/i);
  const title = matchTitle ? matchTitle[1] : 'Untitled Post';

  const matchDesc = content.match(/<meta name="description" content="(.*?)"/i);
  const description = matchDesc ? matchDesc[1] : '';

  const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/); // matches '2025-04-10' at the beginning
  const dateStr = dateMatch ? dateMatch[1] : null;
  const pubDate = dateStr ? new Date(dateStr).toUTCString() : new Date().toUTCString();

  const link = `${baseUrl}/${file}`;

  return { title, link, pubDate, description };
});

const lastBuildDate = new Date().toUTCString();

let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Get In Losers, We're Writing Code</title>
    <link>${baseUrl}</link>
    <description>Formerly: cartoons | Currently: computer science</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
`;

for (const post of posts) {
  rss += `
    <item>
      <title>${post.title}</title>
      <link>${post.link}</link>
      <pubDate>${post.pubDate}</pubDate>
      <description>${post.description}</description>
    </item>`;
}

rss += `
  </channel>
</rss>`;

fs.writeFileSync('rss.xml', rss);
console.log('RSS feed generated from real live blog posts!');