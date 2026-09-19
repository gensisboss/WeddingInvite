const root = document.querySelector('#article-root');

function mountLocalArticle() {
  const frame = document.createElement('iframe');
  frame.className = 'article-frame';
  frame.title = 'SVG 图片';
  frame.src = './article-local.html';
  root.replaceChildren(frame);
}

async function mountArticle() {
  const response = await fetch('./article-local.html');
  if (!response.ok) throw new Error(`无法加载 SVG 内容（${response.status}）`);
  const source = await response.text();
  const parsed = new DOMParser().parseFromString(source, 'text/html');
  const content = parsed.querySelector('#js_content');
  if (!content) throw new Error('文章 SVG 容器不存在');
  root.replaceChildren(content);

  content.querySelectorAll('svg').forEach((svg) => {
    if (!svg.getAttribute('viewBox') && svg.getAttribute('viewbox')) {
      svg.setAttribute('viewBox', svg.getAttribute('viewbox'));
    }
  });

}

if (window.location.protocol === 'file:') {
  mountLocalArticle();
} else {
  mountArticle().catch((error) => {
    root.innerHTML = `<p class="load-error">${error.message}</p>`;
  });
}
