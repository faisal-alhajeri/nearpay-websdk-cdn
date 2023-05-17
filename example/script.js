let { NearPay, NEARPAY_CONNECTOR } = NearPaySDK;

const nearpay = new NearPay();
nearpay.addAutoReconnect();
nearpay.connectToLastUser();

async function onConnectFormSubmit(e) {
  e.preventDefault();
  const ip = e.target["ip"].value;
  const port = e.target["port"].value;

  await nearpay
    .connect({
      type: NEARPAY_CONNECTOR.WS,
      ip,
      port,
    })
    .catch((err) => alert(err));
}

async function onPayFormSubmit(e) {
  e.preventDefault();
  const amount = e.target["amount"].value;
  nearpay
    .getTerminal()
    .purchase({
      amount,
    })
    .then((res) => {
      console.log("=-=-=-=-= purchase result =-=-=-=-=");
      console.log(res);
    });
}

function onDisconnectButton() {
  nearpay.disconnectDevice();
}

nearpay.addConnectivityListener((state) => {
  document.querySelector("#connection-state").textContent = state;
});

const submitForm = document.querySelector("#connect-form");
submitForm.addEventListener("submit", onConnectFormSubmit);

const payForm = document.querySelector("#pay-form");
payForm.addEventListener("submit", onPayFormSubmit);

document
  .querySelector("#disconnect-button")
  .addEventListener("click", onDisconnectButton);
